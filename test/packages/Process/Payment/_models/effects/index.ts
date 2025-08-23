import moduleToObject from '@/utils/moduleToObject';
const files = require.context('./', true, /\.ts$/);
const effects = moduleToObject(files);

export default effects;
