const fs = require('fs');
const path = require('path');

// Simple regex-based TSX to JSX converter
function convertTSXtoJSX(content) {
  return content
    .replace(/: \w+\[\]/g, '')           // Remove `: string[]`, `: number[]`, etc.
    .replace(/: \w+/g, '')               // Remove `: string`, `: number`, etc.
    .replace(/<\w+>/g, '')               // Remove `<string>` generics
    .replace(/\s+as \w+/g, '')           // Remove `as string`, etc.
    .replace(/interface \w+ \{[^}]+\}/g, '') // Remove interface blocks
    .replace(/\.tsx/g, '.jsx')           // Update imports
    .replace(/\.ts/g, '.js');            // Update imports
}

// Recursively find all .ts and .tsx files
function findTSFiles(dir, files = []) {
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      if (item === 'node_modules' || item === '.git') continue;
      findTSFiles(fullPath, files);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Main conversion
function convertProject(rootDir) {
  const tsFiles = findTSFiles(rootDir);
  tsFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const newContent = convertTSXtoJSX(content);

    const ext = filePath.endsWith('.tsx') ? '.jsx' : '.js';
    const newPath = filePath.replace(/\.tsx?$/, ext);

    fs.writeFileSync(newPath, newContent);
    if (newPath !== filePath) fs.unlinkSync(filePath); // Remove old .ts/.tsx file

    console.log(`✅ Converted: ${filePath} → ${newPath}`);
  });
}

// 🔧 Run the conversion
convertProject('./src');
