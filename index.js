const { getResponseData } = require('@chickaree/web');
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

const pos = '/parser/'.length;

exports.parse = async (req, res) => {
  const [domain, hash] = req.url.substring(pos).split('/');
  const url = new URL(hash ? decode(hash) : '', `https://${domain}/`);
  const response = new Response(req.body, {
    url: url.toString(),
    headers: {
      'Content-Type': req.header('Content-Type'),
    },
  });
  const data = await getResponseData(response);
  res.status(200).send(data);
};
