export default function fieldExport(files: []) {
    const localFieldConfigs = []
    const fields = {}
    files.keys().forEach((fileName) => {
        if (!fileName.includes('index.ts')) {
            const value = files(fileName).default;
            const reducerName = fileName.replace(/(.*\/)*([^.]+).*/gi, '$2');
            fields[reducerName] = value;
            localFieldConfigs.push(files(fileName).fieldConfig || {});
        }
    });
    return {
      localFieldConfigs,
      fields
    }
}
