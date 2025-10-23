export default function moduleToObject(files: []) {
    return files.keys().reduce((obj, fileName) => {
        if (!fileName.includes('index.ts')) {
            const value = files(fileName).default;
            const reducerName = fileName.replace(/(.*\/)*([^.]+).*/gi, '$2');
            obj[reducerName] = value;
        }
        return obj;
    }, {});
}
