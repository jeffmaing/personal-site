// 阿里云函数计算 - AI 代理（转发到百炼 API）
// 运行时：Node.js 18，触发器：HTTP 函数（匿名访问）

const https = require('https');
const API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
const API_KEY = 'sk-f45f5d9bc8b64898a3f9370ec743c8dd';

exports.handler = async (request, response, context) => {
  // CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.setHeader('Access-Control-Max-Age', '86400');

  // OPTIONS preflight
  if (request.method === 'OPTIONS') {
    response.setStatusCode(204);
    response.send('');
    return;
  }

  if (request.method !== 'POST') {
    response.setStatusCode(405);
    response.send(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
    const postData = JSON.stringify(body);

    const result = await new Promise((resolve, reject) => {
      const url = new URL(API_URL);
      const req = https.request({
        hostname: url.hostname,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Length': Buffer.byteLength(postData),
        },
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, body: data }));
      });
      req.on('error', reject);
      req.write(postData);
      req.end();
    });

    response.setHeader('Content-Type', 'application/json');
    response.setStatusCode(result.status);
    response.send(result.body);
  } catch (error) {
    response.setHeader('Content-Type', 'application/json');
    response.setStatusCode(500);
    response.send(JSON.stringify({ error: 'AI proxy error', details: error.message }));
  }
};
