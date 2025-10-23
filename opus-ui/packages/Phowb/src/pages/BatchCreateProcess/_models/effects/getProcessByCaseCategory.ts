import lodash from 'lodash';
import { listActivityByCaseCategory } from '@/services/bpmProcessActivityService';
import { getCaseCategory } from '@/services/posControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import { formUtils } from 'basic/components/Form';
import { Modal } from 'antd';

export default function* (action: any, { call, put, select }: any) {
  const id = lodash.get(action, 'payload.addId[0]');
  const { transactionTypes, submissionChannel } = yield select((state: any) => ({
    transactionTypes: state.batchCreateProcess.transactionTypes,
    submissionChannel:
      state.batchCreateProcess?.policyInfo?.posRequestInformation?.submissionChannel,
  }));

  const { transactionTypeName, slaDuration, transactionTypeCode } = lodash
    .chain(transactionTypes)
    .find((item) => item.id == id)
    //@ts-ignore
    .pick(['transactionTypeName', 'slaDuration', 'transactionTypeCode'])
    .value();

  const caseCategoryResponse: any = yield call(getCaseCategory, {
    submissionChannel: formUtils.queryValue(submissionChannel),
    transactionType: transactionTypeCode,
  });

  if (
    !caseCategoryResponse ||
    !caseCategoryResponse?.success ||
    !caseCategoryResponse?.resultData
  ) {
    const errorMsg = caseCategoryResponse?.promptMessages?.[0]?.content;
    if (errorMsg) {
      Modal.error({ content: errorMsg });
    }
    return;
  }

  const caseCategory = lodash.get(caseCategoryResponse, 'resultData.caseCategory');
  const response = yield call(
    listActivityByCaseCategory,
    objectToFormData({
      caseCategory,
    })
  );

  const { resultData = [] } = lodash.pick(response, ['resultData']);
  yield put({
    type: 'addProcess',
    payload: {
      processData: resultData,
      id,
      caseCategory,
      transactionTypeName,
      slaDuration,
    },
  });
}
