// Database Lisensi Pembeli (Key & PlaceId)
const WHITELIST_DB = {
    "KEY-DEV-TESTING": { placeId: 0, active: true }, // PlaceId 0 = Boleh untuk Studio Testing
    "KEY-PEMBELI-SAMPLE": { placeId: 123456789, active: true }
};

// Kode testing sederhana untuk tes jalur koneksi pertama kali
const TEST_SCRIPT = `
print("[Remote Server] License Verified! Connecting to Roblox Studio...");
`;

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const { key, placeId } = req.body || {};
    const clientData = WHITELIST_DB[key];

    if (clientData && clientData.active) {
        // Jika PlaceId match atau merupakan mode test (0)
        if (clientData.placeId === 0 || clientData.placeId === Number(placeId)) {
            return res.status(200).json({ success: true, code: TEST_SCRIPT });
        }
    }

    return res.status(403).json({ success: false, message: 'License Key atau Place ID tidak terdaftar!' });
}