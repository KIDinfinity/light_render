import lodash from 'lodash';
import { CategoryCode } from '@/utils/constant/information';
import {
  allCategoryInformation,
  markInformationRead,
  getCategroyReasonByList,
  api,
} from '@/services/bpmInfoControllerService';
import { findBizProcess } from '@/services/bpmBusinessProcessService';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import type { IEffects } from '../interfaces/index';

export default function* loadAllCategoryInformation(
  { payload }: any = {},
  { put, call, select }: IEffects
) {
  const { informationData, isCallAllCategoryInformation } = yield select(
    (state: any) => state.navigatorInformationController
  );
  const { caseNo, activityCode } = lodash.pick(informationData, ['caseNo', 'activityCode']);
  let caseCategory = payload?.caseCategory || '';
  if (!caseCategory && formUtils.queryValue(caseNo)) {
    const bizReponse = yield call(findBizProcess, {
      processInstanceId: formUtils.queryValue(caseNo),
    });
    caseCategory = lodash.get(bizReponse, 'resultData.caseCategory', '');
  }

  yield put({
    type: 'saveCaseCategory',
    payload: { caseCategory },
  });
  const params = yield put.resolve({
    type: 'formatLoadHistoryParams',
  });
  delete params.categoryCode;
  if (lodash.isEmpty(lodash.get(params, 'caseNo'))) return;
  const response = yield call(allCategoryInformation, params);

  yield put({
    type: 'workspaceSwitchOn/saveTriggerModalData',
    payload: {
      processInstanceId: params.caseNo,
      triggerModalData: {
        [params.caseNo]: {
          [api.allCategoryInformation]: response,
        },
      },
    },
  });

  yield call(markInformationRead, params);
  yield put({
    type: 'saveState',
    payload: {
      isCallAllCategoryInformation: !isCallAllCategoryInformation,
    },
  });

  const allCategoryTypeCode = {};
  const categoryCodes = lodash
    .chain(response)
    .get('resultData')
    .map((item: any) => item.categoryCode)
    .value();
  const reasonResponse = yield call(getCategroyReasonByList, {
    categoryCodes,
    activityCode: formUtils.queryValue(activityCode),
    caseCategory,
  });
  lodash.forEach(reasonResponse?.resultData, (res) => {
    const { fieldName, typeCode } = lodash.pick(res, ['fieldName', 'typeCode']);
    if (fieldName && typeCode) {
      allCategoryTypeCode[fieldName] = typeCode;
    }
  });

  const allCategoryHistory = lodash
    .chain(response)
    .get('resultData')
    .map((item: any) => {
      // 由于chat link 过来的information格式不同此处加入额外逻辑
      return {
        ...item,
        informationList: lodash.map(item?.informationList, (informationListItem: any) => {
          return {
            ...informationListItem,
            informationDOList: lodash.map(
              informationListItem?.informationDOList,
              (informationDOListItem: any) => {
                if (informationDOListItem?.category === CategoryCode.BusinessCheck) {
                  const RegDocType = new RegExp(/(?<=\[)(.*?)(?=\])/g);
                  const documentTypeCode = informationDOListItem?.content?.match(RegDocType)?.[0];
                  const newContent = informationDOListItem?.content?.replace?.(
                    documentTypeCode,
                    formatMessageApi({
                      documentType_i18n: documentTypeCode,
                    })
                  );
                  return {
                    ...informationDOListItem,
                    content: newContent,
                    contentType: 'normal',
                  };
                }
                return {
                  ...informationDOListItem,
                  contentType: 'normal',
                };
              }
            ),
          };
        }),
      };
    })
    .value();

  const setCode = put({
    type: 'setCategoryTypeCode',
    payload: {
      allCategoryTypeCode,
    },
  });
  const setHistory = put({
    type: 'setAllCategoryHistory',
    payload: {
      allCategoryHistory,
    },
  });

  yield [setCode, setHistory];
}
