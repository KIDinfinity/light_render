const fs = require('fs');
const path = require('path');
const glob = require('glob');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

// 获取项目根目录
const projectRoot = path.resolve(__dirname, '../..');

// router.config.ts 文件路径
const routerConfigPath = path.resolve(projectRoot, 'config/router.config.ts');

/**
 * 从 config.ts 文件中提取 alias 配置并转换为 aliasMap
 * @param {string} configFilePath - config.ts 文件路径
 * @returns {Object} - aliasMap 对象
 */
const extractAliasMap = (configFilePath) => {
  const code = fs.readFileSync(configFilePath, 'utf-8');
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript'], // 启用 TypeScript 解析
  });

  let aliasMap = {};

  traverse(ast, {
    ObjectProperty({ node }) {
      // 检查是否是 alias 属性
      if (node.key.name === 'alias' && node.value.type === 'ObjectExpression') {
        aliasMap = node.value.properties.reduce((map, property) => {
          const key = property.key.value || property.key.name; // 处理键名

          // 动态解析 path.resolve(__dirname, ...)
          if (
            property.value.type === 'CallExpression' &&
            property.value.callee.type === 'MemberExpression' &&
            property.value.callee.object.name === 'path' &&
            property.value.callee.property.name === 'resolve'
          ) {
            const args = property.value.arguments;
            if (args.length >= 2 && args[0].name === '__dirname') {
              const relativePath = args[1].value; // 获取相对路径
              const resolvedPath = path.resolve(path.dirname(configFilePath), relativePath);
              map[key] = resolvedPath; // 计算绝对路径
            } else {
              console.warn(`Invalid path.resolve arguments for alias: ${key}`);
            }
          } else if (property.value.type === 'StringLiteral') {
            map[key] = property.value.value; // 如果是普通字符串，直接赋值
          } else {
            console.warn(`Unsupported alias value type for key: ${key}`);
          }

          return map;
        }, {});
      }
    },
  });

  return aliasMap;
};

// 定义路径别名映射
const configFilePath = path.resolve(projectRoot, 'config/config.ts');

const aliasMap = {
  '@': path.resolve(projectRoot, 'src'), // 将 @ 映射到 src 目录
  ...extractAliasMap(configFilePath),
};

// 检查模块是否存在
const isModuleAvailable = (moduleName) => {
  const modulePath = path.resolve(projectRoot, 'node_modules', moduleName);
  return (
    !moduleName.startsWith('./') &&
    !moduleName.startsWith('../') &&
    !moduleName.startsWith('/') &&
    !moduleName.startsWith('..') &&
    !moduleName.startsWith('.') &&
    fs.existsSync(modulePath)
  );
};

/**
 * 尝试找到文件路径并输出
 * @param {string} filePath - 输入的文件路径
 */
const findFile = (filePath) => {
  // 如果路径不存在，尝试添加后缀并检查文件是否存在
  const extensions = ['.js', '.ts', '.tsx', '.jsx'];
  for (const ext of extensions) {
    const fullPath = `${filePath}${ext}`;
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }

  // 检查路径是否存在
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);

    // 如果路径是文件夹，尝试寻找 index 文件
    if (stats.isDirectory()) {
      const indexExtensions = ['index.js', 'index.ts', 'index.tsx', 'index.jsx'];
      for (const indexExt of indexExtensions) {
        const fullPath = path.join(filePath, indexExt);
        if (fs.existsSync(fullPath)) {
          return fullPath;
        }
      }
    }
  }
  return filePath;
};

/**
 * 将相对路径转换为绝对路径
 * @param {string} currentFilePath - 当前文件的绝对路径
 * @param {string} relativePath - 相对路径
 * @returns {string} - 转换后的绝对路径，如果文件存在则返回路径，否则返回 null
 */
const resolveRelativePath = (currentFilePath, relativePath) => {
  // 获取当前文件所在目录
  const currentDir = path.dirname(currentFilePath);
  // 转换为绝对路径
  const absolutePath = path.resolve(currentDir, relativePath);

  return absolutePath;
};

// 将路径别名解析为实际路径
const resolveAliasPath = (importPath, filePath) => {
  if (isModuleAvailable(importPath)) {
    return ''; // 如果是一个模块，返回空字符串
  }
  let outputPath = '';
  const aliasKey = Object.keys(aliasMap)
    .filter((key) => importPath.startsWith(key))
    .sort((a, b) => b.length - a.length)[0];

  if (aliasKey) {
    outputPath = path.resolve(aliasMap[aliasKey], importPath.slice(aliasKey.length + 1));
    return findFile(outputPath);
  }
  if (!path.isAbsolute(importPath)) {
    outputPath = resolveRelativePath(filePath, importPath); // 转换为绝对路径
    return findFile(outputPath);
  }
  return findFile(resolveRelativePath(filePath, importPath)); // 如果已经是绝对路径,并且没有别名，直接返回
};

// 获取项目中的所有文件
const getAllFiles = (patterns) => {
  const files = patterns.flatMap((pattern) =>
    glob.sync(pattern, {
      ignore: ['node_modules/**', '**/__mocks__/**', '**/*.d.ts', '**/*.test.*'],
    })
  );
  return [...new Set(files)]; // 去重，防止重复文件
};

/**
 * 模拟 require.context，提取依赖的文件路径
 * @param {string} dir - 要扫描的目录
 * @param {boolean} recursive - 是否递归扫描子目录
 * @param {RegExp} regex - 文件匹配规则
 * @returns {string[]} - 匹配的文件路径列表
 */
const requireContext = (dir, recursive, regex) => {
  const result = [];

  const scanDirectory = (directory) => {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
      const fullPath = path.join(directory, file);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory() && recursive) {
        scanDirectory(fullPath); // 递归扫描子目录
      } else if (regex.test(file)) {
        result.push(fullPath); // 匹配文件
      }
    });
  };

  scanDirectory(dir);
  return result;
};

// 分析文件依赖
const analyzeDependencies = (filePath, errorLogFile, allRequireDependencies) => {
  try {
    const code = fs.readFileSync(filePath, 'utf-8');
    const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'decorators-legacy', 'classProperties'], // 根据项目类型选择插件
    });

    const dependencies = new Set();
    // console.log(ast);
    traverse(ast, {
      ImportDeclaration({ node }) {
        const resolvedPath = resolveAliasPath(node.source.value, filePath);
        if (resolvedPath) {
          dependencies.add(resolvedPath);
        }
      },
      CallExpression({ node }) {
        if (node.callee.name === 'require' && node.arguments.length) {
          const resolvedPath = resolveAliasPath(node.arguments[0].value, filePath);
          if (resolvedPath) {
            allRequireDependencies.add(resolvedPath);
            dependencies.add(resolvedPath);
          }
        }
        // console.log(node);
        if (
          node.callee.name === 'lazy' &&
          node.arguments.length &&
          node.arguments[0].type === 'ArrowFunctionExpression'
        ) {
          // console.log(
          //   // node.arguments[0].body.arguments[0],
          //   node.arguments[0].body.arguments[0].value,
          //   node.arguments[0].body.arguments[0].type,
          //   resolveAliasPath(node.arguments[0].body.arguments[0].value, filePath),
          //   '1-'
          // );
          const dynamicImport = node.arguments[0].body.arguments[0];
          if (dynamicImport && dynamicImport.type === 'StringLiteral') {
            // console.log(2);
            const resolvedPath = resolveAliasPath(dynamicImport.value, filePath);
            allRequireDependencies.add(resolvedPath);
            dependencies.add(resolvedPath);
          }
        }

        // 检查是否是 require.context 调用
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.name === 'require' &&
          node.callee.property.name === 'context'
        ) {
          const args = node.arguments;
          if (args.length >= 3) {
            const baseDir = resolveRelativePath(filePath, args[0].value); // 第一个参数是路径
            const recursive = args[1].value; // 第二个参数是递归
            const regex = args[2].pattern; // 第三个参数是正则表达式

            // 模拟 require.context 的行为
            const dynamicDependencies = requireContext(baseDir, recursive, new RegExp(regex));
            dynamicDependencies.forEach((dep) => {
              const path = resolveAliasPath(dep, filePath);
              allRequireDependencies.add(path);
              dependencies.add(path);
            });
          }
        }
      },
      ExportNamedDeclaration({ node }) {
        if (node.source && node.source.value) {
          const resolvedPath = resolveAliasPath(node.source.value, filePath);
          if (resolvedPath) {
            dependencies.add(resolvedPath);
          }
        }
      },
    });
    return dependencies;
  } catch (error) {
    console.log(error);
    const errorMessage = `Error parsing file: ${filePath}\n${error.message}\n`;
    fs.appendFileSync(errorLogFile, errorMessage); // 将错误写入文件
    return new Set(); // 返回空依赖集，避免中断程序
  }
};

/**
 * 提取 router.config.ts 文件中的所有 component 值
 * @param {string} filePath - router.config.ts 文件路径
 * @returns {Set<string>} - 所有 component 值的集合
 */
const extractComponents = (filePath) => {
  const code = fs.readFileSync(filePath, 'utf-8');
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript'], // 启用 TypeScript 支持
  });

  const components = new Set();

  traverse(ast, {
    ObjectProperty({ node }) {
      // 检查是否是 component 属性
      if (node.key.name === 'component' && node.value.type === 'StringLiteral') {
        components.add(resolveAliasPath(node.value.value, 'src/pages/.')); // 提取 component 值并添加到 Set
      }
    },
  });

  return components;
};

const buildDependencyMap = (allFiles, errorLogFile, requireFile) => {
  const dependencyMap = new Map();
  const totalFiles = allFiles.length;

  // 构建一个集合，包含所有require类型引用的文件
  const allRequireDependencies = new Set();

  // 初始化进度
  let lastLoggedPercentage = 0;

  // 提取 router.config.ts 中的所有组件
  const components = extractComponents(routerConfigPath);
  // 将 router.config.ts 的组件添加到依赖关系图中
  dependencyMap.set(routerConfigPath, components);
  allFiles.forEach((file, index) => {
    const dependencies = analyzeDependencies(file, errorLogFile, allRequireDependencies);
    // console.log(dependencies);
    dependencyMap.set(file, dependencies);
    // 计算当前进度百分比
    const currentPercentage = Math.floor(((index + 1) / totalFiles) * 100);

    // 打印进度：0-5% 每1%，5-95% 每10%，95-100% 每1%
    if (
      (currentPercentage <= 5 && currentPercentage > lastLoggedPercentage) ||
      (currentPercentage > 5 &&
        currentPercentage < 95 &&
        currentPercentage % 10 === 0 &&
        currentPercentage > lastLoggedPercentage) ||
      (currentPercentage >= 95 && currentPercentage > lastLoggedPercentage)
    ) {
      console.log(`Progress: ${currentPercentage}%`);
      lastLoggedPercentage = currentPercentage;
    }
  });

  fs.writeFileSync(requireFile, JSON.stringify(Array.from(allRequireDependencies), null, 2));
  return dependencyMap;
};

const whitelist = [
  path.resolve(projectRoot, 'src/models'), // 白名单路径
  path.resolve(projectRoot, 'src/services'),
  path.resolve(projectRoot, 'src/global.ts'),
  path.resolve(projectRoot, 'src/global.less'),
  path.resolve(projectRoot, 'src/app.tsx'),
  path.resolve(projectRoot, 'src/layouts/index.tsx'),
  path.resolve(projectRoot, 'src/access.ts'),
  path.resolve(projectRoot, 'src/antd-icon.js'),
  path.resolve(projectRoot, 'src/globalConstants.ts'),
  path.resolve(projectRoot, 'src/themes'),
  path.resolve(projectRoot, 'src/locales'),
];

// 查找未被引用的文件
const findUnusedFiles = () => {
  const allFiles = getAllFiles(['src/**/*.{js,jsx,ts,tsx}', 'packages/**/*.{js,jsx,ts,tsx}']);
  // const allFiles = getAllFiles([
  //   'packages/Basic/src/components/Form/constants/index.{js,jsx,ts,tsx}',
  // ]);
  // const allFiles = getAllFiles([
  //   'packages/Process/Payment/_models/_function/beneficiaryPayeeMatch.ts',
  // ]);

  const allFile = path.resolve(__dirname, 'allFiles.txt'); // 错误日志文件
  fs.writeFileSync(allFile, '');
  const dependencyMapFile = path.resolve(__dirname, 'dependencyMapFile.txt'); // 未使用文件日志文件
  fs.writeFileSync(dependencyMapFile, '');

  fs.writeFileSync(allFile, allFiles.map((item) => path.resolve(projectRoot, item)).join('\n'));

  const errorLogFile = path.resolve(__dirname, 'error-log.txt'); // 错误日志文件
  const unusedFilesLogFile = path.resolve(__dirname, 'unused-files.txt'); // 未使用文件日志文件
  const requireFile = path.resolve(__dirname, 'requireFile.txt'); // require 文件日志文件

  // 清空日志文件
  fs.writeFileSync(errorLogFile, '');
  fs.writeFileSync(unusedFilesLogFile, '');
  fs.writeFileSync(requireFile, '');

  // 构建依赖关系图
  console.log('Building dependency map...');
  const dependencyMap = buildDependencyMap(allFiles, errorLogFile, requireFile);

  // 构建一个集合，包含所有被引用的文件
  const allDependencies = new Set();
  dependencyMap.forEach((deps) => {
    deps.forEach((dep) => allDependencies.add(dep)); // 添加文件的依赖项
  });
  fs.writeFileSync(dependencyMapFile, JSON.stringify(Array.from(allDependencies), null, 2));

  // 查找未使用的文件
  const unusedFiles = allFiles
    .map((file) => path.resolve(projectRoot, file))
    .filter(
      (file) =>
        !allDependencies.has(file) && !whitelist.some((whitelisted) => file.startsWith(whitelisted))
    );

  // 将未使用的文件写入日志文件
  fs.writeFileSync(unusedFilesLogFile, unusedFiles.join('\n'));
};

findUnusedFiles();
