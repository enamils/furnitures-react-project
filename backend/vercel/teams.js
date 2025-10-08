import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);
const baseDir = path.join(currentDir, '..', 'api');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const filePath = path.join(baseDir, 'teams.json');

        if (!filePath.startsWith(baseDir)) {
            return res.status(400).json({ error: 'Invalid file path' });
        }

        const data = await fs.promises.readFile(filePath, 'utf-8');
        const teams = JSON.parse(data);
        res.json(teams);
    } catch (err) {
        console.error('Error reading teams.json:', err.message);
        res.status(500).json({ error: 'Failed to load teams profile' });
    }
}
