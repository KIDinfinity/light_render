import lodash from 'lodash';
import { listActivityByCaseCategoryV2 } from '@/services/bpmProcessActivityService';
import { getCaseCategoryAndSla } from '@/services/posSrvCaseInquiryControllerService';
import { Modal } from 'antd';
import { NAMESPACE } from '../../activity.config';

export default function* (action: any, { call, put, select }: any) {
  const id = lodash.get(action, 'payload.id[0]');
  const isAdd = lodash.get(action, 'payload.isAdd');
  const transactionType = {
    transactionTypeCode: id,
  };

  const transactionTypes = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.transactionTypes || []
  );
  if (!transactionTypes) {
    yield put({
      type: 'saveTransactionTypes',
      payload: {
        transactionTypes: [],
      },
    });
  }

  if (!isAdd) {
    yield put({
      type: 'saveTransactionTypes',
      payload: {
        transactionTypes: lodash
          .chain(transactionTypes)
          .filter((item) => item.transactionTypeCode != id)
          .value(),
      },
    });
    return;
  }

  yield put({
    type: 'saveTransactionTypes',
    payload: {
      transactionTypes: [...transactionTypes, transactionType],
    },
  });
  const caseCategoryResponse: any = yield call(getCaseCategoryAndSla, {
    transactionType: id,
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

  const transactionProcessList = lodash.map(caseCategoryResponse?.resultData, (i) =>
    lodash.pick(i, [
      'caseCategory',
      'transactionTypeName',
      'slaDuration',
      'transactionTypeCode',
      'slaUnit',
    ])
  );

  const response = yield call(listActivityByCaseCategoryV2, {
    caseCategoryList: lodash.map(transactionProcessList, (i) => i.caseCategory),
  });

  const { resultData = [] } = lodash.pick(response, ['resultData']);
  const groupByCaseCategory = lodash.groupBy(resultData, 'caseCategory');
  const newTransactionProcessList = lodash.map(
    transactionProcessList,
    ({ transactionTypeCode, caseCategory, transactionTypeName, slaUnit, slaDuration }) => {
      return {
        activities: groupByCaseCategory[caseCategory],
        id,
        transactionTypeCode,
        caseCategory,
        transactionTypeName,
        slaDuration: `${slaDuration} ${slaUnit}`,
      };
    }
  );

  yield put({
    type: 'saveTransactionTypes',
    payload: {
      transactionTypes: [
        ...transactionTypes,
        { ...transactionType, transactionProcessList: newTransactionProcessList },
      ],
    },
  });
}
