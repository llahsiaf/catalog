const WHITELIST_DB = {
  "KEY-DEV-TESTING": { placeId: 0, active: true },
  "KEY-PEMBELI-SAMPLE": { placeId: 123456789, active: true },
  "KEY-PEMBELI-1": { placeId: 76361626105292, active: true }
};

const SCRIPT_URL = "https://gist.githubusercontent.com/llahsiaf/5fcfd9f98f33259883221411738a1cda/raw/929fe510ff3de6057b8a1fc650dd08c500621e6b/fixcatalog";

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

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
    // Membandingkan placeId sebagai String agar presisi
    if (clientData.placeId === 0 || String(clientData.placeId) === String(placeId)) {
      return res.status(200).json({ success: true, url: SCRIPT_URL });
    }
    return res.status(403).json({ success: false, message: `Place ID tidak cocok! Diterima: ${placeId}` });
  }

  return res.status(403).json({ success: false, message: 'License Key tidak terdaftar atau nonaktif!' });
}
