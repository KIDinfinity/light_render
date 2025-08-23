import moduleToObject from '@/utils/moduleToObject';
const files = require.context('./', true, /\.ts$/);
const updateClaimPolicyPayableFun = moduleToObject(files);

export default updateClaimPolicyPayableFun;
