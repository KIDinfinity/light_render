import fieldExportor from '@/utils/fieldExportor';
const  files= require.context('./', false, /\.tsx$/);
const {fields,localFieldConfigs} = fieldExportor(files);

export {localFieldConfigs}

export default fields;
