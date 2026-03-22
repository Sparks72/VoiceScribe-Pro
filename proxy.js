// ─────────────────────────────────────────────────────────────────
// VoiceScribe Pro — Local Proxy Server
// Serves voice-to-text-pro.html and proxies DeepL + Anthropic API
// calls so CORS is not an issue from the browser.
//
// Usage:
//   node proxy.js [port]          default port: 3000
//   node proxy.js 8080
//
// Then open: http://localhost:3000
// ─────────────────────────────────────────────────────────────────

'use strict';

var http  = require('http');
var https = require('https');
var fs    = require('fs');
var path  = require('path');
var url   = require('url');

var PORT = parseInt(process.argv[2]) || 3000;
var HTML_FILE = path.join(__dirname, 'voice-to-text-pro.html');

// ── CORS headers added to every response ─────────────────────────
function cors(res) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,x-api-key,anthropic-version');
}

// ── Forward a POST request to an external HTTPS API ──────────────
function proxyPost(targetUrl, headers, body, res) {
  var parsed  = url.parse(targetUrl);
  var options = {
    hostname: parsed.hostname,
    port:     443,
    path:     parsed.path,
    method:   'POST',
    headers:  Object.assign({ 'Content-Length': Buffer.byteLength(body) }, headers)
  };

  var req = https.request(options, function(apiRes) {
    cors(res);
    res.writeHead(apiRes.statusCode, { 'Content-Type': 'application/json' });
    apiRes.pipe(res);
  });

  req.on('error', function(err) {
    cors(res);
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: { message: 'Proxy error: ' + err.message } }));
  });

  req.write(body);
  req.end();
}

// ── Collect request body ──────────────────────────────────────────
function readBody(req, cb) {
  var chunks = [];
  req.on('data', function(c) { chunks.push(c); });
  req.on('end',  function()  { cb(Buffer.concat(chunks).toString()); });
}

// ── Main server ───────────────────────────────────────────────────
var server = http.createServer(function(req, res) {
  var pathname = url.parse(req.url).pathname;

  // Preflight
  if (req.method === 'OPTIONS') {
    cors(res);
    res.writeHead(204);
    res.end();
    return;
  }

  // ── Proxy: DeepL translate ──────────────────────────────────────
  if (req.method === 'POST' && pathname === '/proxy/deepl') {
    readBody(req, function(body) {
      var data;
      try { data = JSON.parse(body); } catch(e) {
        res.writeHead(400); res.end('Bad JSON'); return;
      }
      var key      = data.key;
      var isFree   = key && key.trim().endsWith(':fx');
      var endpoint = isFree
        ? 'https://api-free.deepl.com/v2/translate'
        : 'https://api.deepl.com/v2/translate';

      var payload = JSON.stringify({ text: data.text, target_lang: data.target_lang });
      proxyPost(endpoint, {
        'Authorization': 'DeepL-Auth-Key ' + key,
        'Content-Type':  'application/json'
      }, payload, res);
    });
    return;
  }

  // ── Proxy: Anthropic Claude ─────────────────────────────────────
  if (req.method === 'POST' && pathname === '/proxy/anthropic') {
    readBody(req, function(body) {
      var data;
      try { data = JSON.parse(body); } catch(e) {
        res.writeHead(400); res.end('Bad JSON'); return;
      }
      var key     = data.key;
      var payload = JSON.stringify(data.payload);
      proxyPost('https://api.anthropic.com/v1/messages', {
        'x-api-key':         key,
        'anthropic-version': '2023-06-01',
        'Content-Type':      'application/json'
      }, payload, res);
    });
    return;
  }

  // ── Serve the HTML file ─────────────────────────────────────────
  if (req.method === 'GET' && (pathname === '/' || pathname === '/voice-to-text-pro.html')) {
    fs.readFile(HTML_FILE, function(err, data) {
      if (err) {
        res.writeHead(404);
        res.end('voice-to-text-pro.html not found — make sure proxy.js and the HTML file are in the same folder.');
        return;
      }
      cors(res);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // 404 for anything else
  cors(res);
  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, function() {
  console.log('');
  console.log('  VoiceScribe Pro Proxy running');
  console.log('  ─────────────────────────────');
  console.log('  Open:  http://localhost:' + PORT);
  console.log('  Stop:  Ctrl+C');
  console.log('');
  console.log('  DeepL proxy:     http://localhost:' + PORT + '/proxy/deepl');
  console.log('  Anthropic proxy: http://localhost:' + PORT + '/proxy/anthropic');
  console.log('');
});
