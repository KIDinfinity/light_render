import { toUpper } from 'lodash';
import Api from './Api';
import SEARCHNAME from './SEARCHNAME';

export default ({ searchName, typeCode }: any) => {
  const name = toUpper(searchName);
  const DataMap = {
    [SEARCHNAME.BANK]: Api.bank,
    [SEARCHNAME.BANKBRANCH]: Api.bankBranch,
    [SEARCHNAME.BANKBRANCHJP]: Api.bankBranchJp,
    [SEARCHNAME.DIAGNOSIS]: Api.diagnosis,
    [SEARCHNAME.DICTIONARY]: Api.dictionary(typeCode),
    [SEARCHNAME.MEDICALPROVIDER]: Api.medicalProvider,
    [SEARCHNAME.MEDICALPROVIDERTH]: Api.medicalProviderTh,
    [SEARCHNAME.NATIONALITY]: Api.nationality,
    [SEARCHNAME.OCCUPATION]: Api.occupation,
    [SEARCHNAME.PARTOFBODYINJURED]: Api.partOfBodyInjured,
    [SEARCHNAME.PRODUCT]: Api.product,
    [SEARCHNAME.SERVICEITEM]: Api.serviceItem,
    [SEARCHNAME.SURGERYPROCEDURE]: Api.surgeryProcedure,
    [SEARCHNAME.ADVANCEDMEDICALCN]: Api.medicalProviderJP,
  };
  return DataMap[name] || '';
};
