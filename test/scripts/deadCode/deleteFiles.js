const fs = require('fs');
const path = require('path');

/**
 * 批量删除文件
 * @param {string} fileListPath - 包含文件路径的文件（如 unused-files.txt）
 */
const deleteFiles = (fileListPath) => {
  // 读取文件列表
  const filePaths = fs
    .readFileSync(fileListPath, 'utf-8')
    .split('\n')
    .map((line) => line.trim());

  filePaths.forEach((filePath) => {
    if (filePath) {
      try {
        // 检查文件是否存在
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // 删除文件
          // console.log(`Deleted: ${filePath}`);
        } else {
          console.warn(`File not found: ${filePath}`);
        }
      } catch (error) {
        console.error(`Error deleting file: ${filePath}`, error.message);
      }
    }
  });
};

// 示例调用
const unusedFilesPath = path.resolve(__dirname, 'unused-files.txt'); // 替换为实际的 unused-files.txt 路径
deleteFiles(unusedFilesPath);
