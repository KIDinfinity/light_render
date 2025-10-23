import saveTableSearch from 'configuration/pages/ConfigurationProcess/DataMainTenanceForBusiness/DataConfiguration/_models/reducers/saveTableSearch';
import saveDuplicateListPage from 'configuration/pages/ConfigurationProcess/DataMainTenanceForBusiness/DataConfiguration/_models/reducers/saveDuplicateListPage';
import { saveVersionList } from 'configuration/common/reducers';
import saveFunctionData from './saveFunctionData';
import saveListPage from './saveListPage';
import clearClaim from './clearClaim';

export default {
  saveFunctionData,
  saveListPage,
  clearClaim,
  saveTableSearch,
  saveDuplicateListPage,
  saveVersionList,
};
