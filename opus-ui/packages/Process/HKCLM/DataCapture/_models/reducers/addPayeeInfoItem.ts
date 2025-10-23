import { PAYEEINFO } from '@/utils/claimConstant';
import { IsDefault } from 'claim/enum';
import { v4 as uuidv4 } from 'uuid';
import { produce } from 'immer';
import { SubmissionChannel, relationshipWithInsuredForHK } from 'claim/enum';
import { get } from 'lodash';
import { formUtils } from 'basic/components/Form';

const addPayeeInfoItem = (state: any) => {
  const submissionChannel = get(state, 'claimProcessData.submissionChannel');
  const isGOPBillingCase = formUtils.queryValue(submissionChannel) === SubmissionChannel.GOPBilling;
  const nextState = produce(state, (draftState: any) => {
    const id = uuidv4();
    const payeeInfoItem = {
      ...PAYEEINFO,
      claimNo: draftState.claimProcessData.claimNo,
      id,
      payeeType: isGOPBillingCase
        ? relationshipWithInsuredForHK.medicalProvider
        : PAYEEINFO.payeeType,
      organization: isGOPBillingCase ? 1 : PAYEEINFO.organization,
      isDefault: IsDefault.YES,
      payeeContactList: [{ isDefault: IsDefault.YES, email: '', contactType: '', id: uuidv4() }],
      payeeBankAccountList: [
        {
          isSelect: true,
          isDefault: IsDefault.YES,
          bankCode: '',
          accountHolder: '',
          bankAccountNo: '',
          branchCode: '',
          id: uuidv4(),
        },
      ],
      claimChequeRemarkList: [
        { claimNo: draftState.claimProcessData.claimNo, id: uuidv4(), remark: '', seq: 0 },
      ],
    };
    draftState.claimProcessData.payeeList = [...draftState.claimProcessData.payeeList, id];
    draftState.claimEntities.payeeListMap[id] = payeeInfoItem;
  });
  return { ...nextState };
};

export default addPayeeInfoItem;
