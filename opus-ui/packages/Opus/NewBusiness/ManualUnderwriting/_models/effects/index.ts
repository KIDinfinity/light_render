import moduleToObject from '@/utils/moduleToObject';
const files = require.context('./', true, /\.ts$/);
const NBeffects = moduleToObject(files);

export default NBeffects;
