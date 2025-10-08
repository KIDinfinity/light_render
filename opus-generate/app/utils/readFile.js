
const fs = require('fs');

function transBase64(fontPath, fontName) {
  const fontData = fs.readFileSync(fontPath);
  const base64 = fontData.toString('base64');
  return `
@font-face {
  font-family: '${fontName}';
  src: url(data:font/truetype;charset=utf-8;base64,${base64}) format('truetype');
  font-weight: normal;
  font-style: normal;
}
`;
}
function getFileContent(filePath) {
  const file = fs.readFileSync(filePath);
  const base64 = file.toString('base64');
  return base64;
}
exports.transBase64 = transBase64;
exports.getFileContent = getFileContent;
