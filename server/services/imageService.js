import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, "..", "uploads");

// Skapa uploads-mappen om den inte redan finns
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const uploadToS3 = async ({ buffer, originalname, mimetype }) => {
    const ext = path.extname(originalname) || ".jpg";
    const filename = `${crypto.randomUUID()}${ext}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    fs.writeFileSync(filePath, buffer);

    const baseUrl = process.env.SERVER_URL || `http://localhost:${process.env.PORT || 4000}`;
    return { Location: `${baseUrl}/uploads/${filename}` };
};

export const deleteFromS3 = async (key) => {
    const filename = key.split("/").pop();
    const filePath = path.join(UPLOAD_DIR, filename);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};