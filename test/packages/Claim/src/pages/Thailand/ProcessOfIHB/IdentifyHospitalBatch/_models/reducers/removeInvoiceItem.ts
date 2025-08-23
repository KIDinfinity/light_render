import { produce } from 'immer';
import lodash, { isEqual } from 'lodash';

const removeInvoiceItem = (state: any, { payload: {} }: any) => {
  const nextState = produce(state, (draftState: any) => {
    const invoiceInforData = lodash.get(draftState.claimProcessData, `invoiceInforData`, []);
    const removeInvoiceInfoList = lodash.get(
      draftState.claimProcessData,
      `removeInvoiceInfoList`,
      []
    );
    const discardedSubmissionIdList: any = lodash
      .chain(removeInvoiceInfoList)
      .map((item): any => item?.submissionId)
      .uniq()
      .compact()
      .value();
    const newInvoiceInforList = lodash.differenceWith(
      invoiceInforData,
      removeInvoiceInfoList,
      isEqual
    );
    const discardedClaimNoList=lodash.chain(removeInvoiceInfoList).map('claimNo').compact().value();
    lodash.set(draftState.claimProcessData, `discardedSubmissionIdList`, discardedSubmissionIdList);
    lodash.set(draftState.claimProcessData, `discardedClaimNoList`, discardedClaimNoList);
    lodash.set(draftState.claimProcessData, `invoiceInforData`, newInvoiceInforList);
    lodash.set(draftState.claimProcessData, `removeInvoiceInfoList`, []);
  });
  return { ...nextState };
};

export default removeInvoiceItem;
