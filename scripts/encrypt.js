#!/usr/bin/env node
/**
 * Encrypts content/private/**\/*.md files using AES-256-GCM.
 * Output: .md.enc files alongside the originals (then originals are deleted).
 * Key source: STATICRYPT_PASSWORD env var (from .env.local or CI secret).
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Load .env.local if present
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}

// Check if there are any private .md files to encrypt
function hasPrivateFiles(dir) {
  if (!fs.existsSync(dir)) return false;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && hasPrivateFiles(path.join(dir, entry.name))) return true;
    if (entry.isFile() && entry.name.endsWith(".md")) return true;
  }
  return false;
}

const privateDir = path.join(__dirname, "..", "content", "private");
if (!hasPrivateFiles(privateDir)) {
  console.log("No private .md files found. Skipping encryption.");
  process.exit(0);
}

const password = process.env.STATICRYPT_PASSWORD;
if (!password) {
  console.error("Error: STATICRYPT_PASSWORD is not set.");
  process.exit(1);
}

const PRIVATE_DIR = path.join(__dirname, "..", "content", "private");
const ALGORITHM = "aes-256-gcm";

function deriveKey(password) {
  // Use scrypt to derive a 32-byte key from the password
  return crypto.scryptSync(password, "midasworld-salt-v1", 32);
}

function encryptFile(filePath, key) {
  const plaintext = fs.readFileSync(filePath);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const authTag = cipher.getAuthTag();

  // Format: iv (16 bytes) + authTag (16 bytes) + ciphertext
  const output = Buffer.concat([iv, authTag, encrypted]);
  const outPath = filePath + ".enc";
  fs.writeFileSync(outPath, output);
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
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const encPath = encryptFile(fullPath, key);
      fs.unlinkSync(fullPath); // remove plaintext
      console.log(`Encrypted: ${path.relative(process.cwd(), encPath)}`);
      count++;
    }
  }
}

walkDir(PRIVATE_DIR);
console.log(`\nEncrypted ${count} file(s).`);
