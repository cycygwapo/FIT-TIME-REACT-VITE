const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'src', 'assets', 'logo.png');
const destPath = path.join(__dirname, 'public', 'logo.png');

// Create public directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'public'))) {
    fs.mkdirSync(path.join(__dirname, 'public'));
}

// Copy the file
fs.copyFileSync(sourcePath, destPath);
console.log('Logo copied successfully!');
