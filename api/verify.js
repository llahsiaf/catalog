const WHITELIST_DB = {
  "KEY-DEV-TESTING": { placeId: 0, active: true },
  "KEY-PEMBELI-SAMPLE": { placeId: 123456789, active: true }
};

// Masukkan link raw dari GitHub Gist / file hosting kamu di sini
const SCRIPT_URL = "https://gist.githubusercontent.com/llahsiaf/37ffc1f587cd34c3fa61dcc8a265349c/raw/75aa39e990f5851c043888927b30d7ae42c17e21/catalog%2520dadang";

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }

  const { key, placeId } = body || {};
  const clientData = WHITELIST_DB[key];

  if (clientData && clientData.active) {
    if (clientData.placeId === 0 || clientData.placeId === Number(placeId)) {
      // Kirim URL saja, sangat ringan dan tidak bikin HTTP 500 / ServerProtocolError
      return res.status(200).json({ success: true, url: SCRIPT_URL });
    }
  }

  return res.status(403).json({ success: false, message: 'License Key atau Place ID tidak terdaftar!' });
}
