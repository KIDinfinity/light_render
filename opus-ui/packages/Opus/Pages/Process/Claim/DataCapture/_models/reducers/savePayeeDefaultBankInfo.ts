import { BankDesc, IsDefault } from 'claim/enum';
import { produce } from 'immer';
import lodash from 'lodash';
import { SourceSystem } from 'process/Enum';

const savePayeeDefaultBankInfo = (state: any, action: any) => {
  const { policyContractList } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (!lodash.isArray(policyContractList)) {
      return;
    }

    const isLifeJ = draftState?.claimProcessData?.insured?.policySource === SourceSystem.Lifej;

    lodash.forEach(draftState?.claimEntities?.payeeListMap, (item: any) => {
      lodash.forEach(item?.payeeBankAccountList, (info: any) => {
        info.isNewBankAccount = isLifeJ ? IsDefault.YES : undefined;
        info.bankDesc = isLifeJ ? BankDesc.KLIP : undefined;
      });
    });
  });

  return { ...nextState };
};

export default savePayeeDefaultBankInfo;
