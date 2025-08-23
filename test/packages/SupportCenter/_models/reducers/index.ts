import moduleToObject from '@/utils/moduleToObject';
const files = require.context('./', true, /\.ts$/);
const reduces = moduleToObject(files);

export default reduces;
