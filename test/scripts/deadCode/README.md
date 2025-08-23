# Deadcode

## 简介
本脚本用于自动检测并清理项目中的未使用代码（dead code）。

## 使用方法
### 查找和删除未使用的文件
1. 查找未被引用的代码 
```sh
npm run find-unused-files
```
2. 删除未使用文件
```sh
node scripts/deadCode/deleteFiles.js
```
3. 重复上述两步，直到没有找到unused-files

### 删除未使用的引用
```sh
npx eslint packages/ src/  --fix
```

## 测试方法
1. 本地运行项目，运行没有错误并通过
2. 访问项目页面，没有白屏报错
3. 检查ts报错，没有未定义变量
```sh
npx tsc --noEmit > tsc-output.txt 2>&1

grep "Cannot find name" tsc-output.txt > cannot-find-name.txt
```

## 注意事项
- 建议先备份代码
- 仅适用于 TypeScript/JavaScript 项目