import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { createNormalizeData } from '../../utils/normalizrUtils';
import { IsDefault } from 'claim/enum';
import { PAYEEITEM } from '@/utils/claimConstant';
import { wholeEntities } from '../dto/EntriesModel';

const saveClaimProcessData = (state: any, action: any) => {
  const claimData = { ...action.payload };
  if (lodash.isEmpty(claimData.incidentList)) {
    claimData.incidentList = [];
  }
  if (lodash.isEmpty(claimData.payeeList)) {
    claimData.payeeList = [
      {
        ...PAYEEITEM,
        claimNo: claimData.claimNo,
        id: uuidv4(),
        isDefault: IsDefault.YES,
        payeeContactList: [{ isDefault: IsDefault.YES, email: '', contactType: '' }],
        payeeBankAccountList: [
          {
            isDefault: IsDefault.YES,
            bankCode: '',
            accountHolder: '',
            bankAccountNo: '',
            branchCode: '',
          },
        ],
      },
    ];
  }
  if (!claimData.insured) {
    claimData.insured = {};
  }
  if (!claimData.claimant) {
    claimData.claimant = {};
  }

  lodash.set(
    claimData,
    'payeeList',
    lodash
      .chain(claimData.payeeList)
      .compact()
      .filter((item: any) => !!item.id)
      .value()
  );

  const result = createNormalizeData(claimData, wholeEntities);
  
  return {
    ...state,
    ...result,
  };
};

export default saveClaimProcessData;
