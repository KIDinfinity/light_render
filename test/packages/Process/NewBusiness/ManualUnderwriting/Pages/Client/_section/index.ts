// localSectionConfig.d.ts
export interface localConfig {
  // 定义你的类型
  section: string
}

const req = require.context('.', true, /index\.tsx$/);

const configs: string[] = req.keys().map((filename) => {
  const module = req(filename) as { localConfig: localConfig };
  return module.localConfig?.section;
}).filter(item => item);

export default configs;
