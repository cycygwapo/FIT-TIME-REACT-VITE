import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourcePath = join(__dirname, 'src', 'assets', 'logo.png');
const destPath = join(__dirname, 'public', 'logo.png');

// Create public directory if it doesn't exist
if (!existsSync(join(__dirname, 'public'))) {
    mkdirSync(join(__dirname, 'public'));
}

// Copy the file
copyFileSync(sourcePath, destPath);
console.log('Logo copied successfully!');
