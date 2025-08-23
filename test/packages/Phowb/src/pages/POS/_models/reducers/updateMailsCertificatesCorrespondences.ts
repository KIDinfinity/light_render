import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import MailsCertificatesSendTo from '../../Enum/MailsCertificatesSendTo';

const updateMailsCertificatesCorrespondences = (state: any, action: any) => {
  const { changedFields } = action.payload;
  let result = { ...changedFields };
  if (lodash.keys(changedFields).length === 1) {
    if (lodash.has(changedFields, 'sendTo')) {
      if (formUtils.queryValue(changedFields.sendTo) !== MailsCertificatesSendTo.Branch) {
        result = { ...changedFields, branchCode: '' };
      }
    }
  }
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.requestOfMailsCertificatesCorrespondences = {
      ...draftState.claimProcessData.posDataDetail.requestOfMailsCertificatesCorrespondences,
      ...result,
    };
  });

  return { ...nextState };
};

export default updateMailsCertificatesCorrespondences;
