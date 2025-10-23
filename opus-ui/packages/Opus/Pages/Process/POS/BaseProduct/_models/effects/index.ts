// import getDataForSubmit from './getDataForSubmit';
// import getPolicyInfoAsyncLoop from './getPolicyInfoAsyncLoop';
// import policyInfoRemoteAsyncEnd from './policyInfoRemoteAsyncEnd';
// import policyInfoRemoteAsyncStart from './policyInfoRemoteAsyncStart';
// import saveEntry from './saveEntry';
// import saveEntryEnd from './saveEntryEnd';
// import saveFormData from './saveFormData';
// import validateFields from './validateFields';
// // import saveSnapshot from './saveSnapshot';
// // import checkRegisterMcs from './checkRegisterMcs';
// // import getAgentNoList from './getAgentNoList';
// // import getPolicyAgentInfo from './getPolicyAgentInfo';
// // import agentRefresh from './agentRefresh';
// // import getC360Data from './getC360Data';
// // import validateClaimType from './validateClaimType';
// // import searchName from './searchName';
// // import getPolicyList from './getPolicyList';
// // import getKLIPClaimNo from './getKLIPClaimNo';
// // import getPremBankAccount from './getPremBankAccount';
// // import getPopUpInfo from './getPopUpInfo';
// // import getPolicyAgent from './getPolicyAgent';
// // import saveBusinessProcess from './saveBusinessProcess';
// // import getDrugsDetailList from './getDrugsDetailList';
// // import submitIntegration from './submitIntegration';
// // import getLifeJClaimId from './getLifeJClaimId';
// // import setIntegrationData from './setIntegrationData';
// // import getAccountHolderClientId from './getAccountHolderClientId';
// // import syncFieldData from './syncFieldData';
// // import getLifeJRefundInfo from './getLifeJRefundInfo';

// export default {
//   getDataForSubmit,
//   getPolicyInfoAsyncLoop,
//   policyInfoRemoteAsyncEnd,
//   policyInfoRemoteAsyncStart,
//   saveEntry,
//   saveEntryEnd,
//   saveFormData,
//   validateFields,
//   // saveSnapshot,
//   // checkRegisterMcs,
//   // getAgentNoList,
//   // getPolicyAgentInfo,
//   // agentRefresh,
//   // getC360Data,
//   // validateClaimType,
//   // searchName,
//   // getPolicyList,
//   // getKLIPClaimNo,
//   // getPremBankAccount,
//   // getPopUpInfo,
//   // getPolicyAgent,
//   // saveBusinessProcess,
//   // getDrugsDetailList,
//   // submitIntegration,
//   // getLifeJClaimId,
//   // setIntegrationData,
//   // getAccountHolderClientId,
//   // syncFieldData,
//   // getLifeJRefundInfo,
// };
import moduleToObject from '@/utils/moduleToObject';
const files = require.context('./', true, /\.ts$/);
const effects = moduleToObject(files);

export default effects;
