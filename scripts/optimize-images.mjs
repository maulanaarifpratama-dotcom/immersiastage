import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const dir = fileURLToPath(new URL("../public/assets", import.meta.url));
const exts = new Set([".jpg", ".jpeg", ".png"]);

function walk(root) {
  let results = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else if (exts.has(path.extname(entry.name).toLowerCase()))
      results.push(full);
  }
  return results;
}

const files = walk(dir);

if (files.length === 0) {
  console.log("No images found to convert.");
  process.exit(0);
}

console.log(`Found ${files.length} images to convert to WebP...`);

let converted = 0;
let errors = 0;

for (const file of files) {
  const webpPath = file.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  try {
    await sharp(file).webp({ quality: 80 }).toFile(webpPath);
    const origSize = fs.statSync(file).size;
    const webpSize = fs.statSync(webpPath).size;
    const savings = ((1 - webpSize / origSize) * 100).toFixed(1);
    console.log(
      `  ${path.basename(file)} → ${path.basename(webpPath)} (${savings}% smaller)`,
    );
    converted++;
  } catch (err) {
    console.error(`  ${path.basename(file)}: ${err.message}`);
    errors++;
  }
}

console.log(`\nDone: ${converted} converted, ${errors} errors.`);
