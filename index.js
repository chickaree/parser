const { getResponseData } = require('@chickaree/web');
const { buffer, send } = require('micro');
const { decode } = require('base64url');
const fetch = require('node-fetch');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { Response } = fetch;

// Setup Globals
const { window } = new JSDOM('');
global.DOMParser = window.DOMParser;
global.HTMLDocument = window.HTMLDocument;
global.XMLDocument = window.XMLDocument;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return send(res, 405);
  }
  const [domain, hash] = req.url.substring(1).split('/');
  const url = new URL(hash ? decode(hash) : '', `https://${domain}/`);

  const response = new Response(await buffer(req), {
    url: url.toString(),
    headers: {
      'Content-Type': req.headers['content-type'],
    },
  });

  return getResponseData(response);
};
