import moduleToObject from '@/utils/moduleToObject';
const files = require.context('./', true, /\.ts$/);
const moduleObject = moduleToObject(files);

export default moduleObject;
