import moduleToObject from '@/utils/moduleToObject';
const files = require.context('./', true, /\.ts$/);
const NBreducers = moduleToObject(files);

export default NBreducers;
