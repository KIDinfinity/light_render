import moduleToObject from '@/utils/moduleToObject';
const files = require.context('./', true, /\.ts$/);
const reducers = moduleToObject(files);

export default reducers;
