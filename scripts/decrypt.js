#!/usr/bin/env node
/**
 * Decrypts content/private/**\/*.md.enc files back to .md.
 * Used in CI/CD before `next build`.
 * Key source: STATICRYPT_PASSWORD env var (GitHub Actions secret).
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

// Load .env.local if present (for local development)
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}

const password = process.env.STATICRYPT_PASSWORD;
if (!password) {
  console.error("Error: STATICRYPT_PASSWORD is not set.");
  process.exit(1);
}

const PRIVATE_DIR = path.join(__dirname, "..", "content", "private");
const ALGORITHM = "aes-256-gcm";

function deriveKey(password) {
  return crypto.scryptSync(password, "midasworld-salt-v1", 32);
}

function decryptFile(filePath, key) {
  const data = fs.readFileSync(filePath);
  const iv = data.slice(0, 16);
  const authTag = data.slice(16, 32);
  const ciphertext = data.slice(32);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  const outPath = filePath.replace(/\.enc$/, "");
  fs.writeFileSync(outPath, decrypted);
  return outPath;
}

const key = deriveKey(password);
let count = 0;

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".md.enc")) {
      const decPath = decryptFile(fullPath, key);
      console.log(`Decrypted: ${path.relative(process.cwd(), decPath)}`);
      count++;
    }
  }
}

walkDir(PRIVATE_DIR);
console.log(`\nDecrypted ${count} file(s).`);
