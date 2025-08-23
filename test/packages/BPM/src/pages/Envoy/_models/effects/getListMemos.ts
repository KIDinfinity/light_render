/* eslint-disable no-param-reassign */
import lodash from 'lodash';
import envoyMemoControllerService from '@/services/envoyMemoControllerService';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EMemoCode } from 'bpm/pages/Envoy/enum';
import { getDrowDownList } from '@/utils/dictFormatMessage';

function getNumber(str: string) {
  return Number(str.match(/[0-9]+/g));
}

const reasonCodeMarked = new Set();
function* getListMemos(
  { payload }: { payload: { reasonCode: string; caseCategory: string } },
  { call, put, select }: any
) {
  const { reasonCode, caseCategory } = payload;
  const memoDescriptionList = getDrowDownList('DropDown_ENV_PendingMemoDescription');

  const reasonHaveMemoSubType = yield select(
    (state: any) => state.envoyController.reasonHaveMemoSubType
  );

  if (!reasonCodeMarked.has(reasonCode)) {
    reasonCodeMarked.add(reasonCode)
    const response = yield call(envoyMemoControllerService.listMemos, { reasonCode, caseCategory });
    const listMemos = yield select((state: any) => state.envoyController.listMemos);
    const listMemoSubType = yield select((state: any) => state.envoyController.listMemoSubType);

    if (lodash.isPlainObject(response) && response?.success && response?.resultData) {
      yield put({
        type: 'saveListMemos',
        payload: {
          listMemos: {
            ...listMemos,
            [reasonCode]: response.resultData
              ?.map((item) => item.memoCode)
              ?.sort((a: string, b: string) => {
                if (b === EMemoCode.FREE) return -1;
                return 0;
              })
              ?.sort((a: string, b: string) => {
                if (a === undefined || a === null) {
                  return 1;
                }
                return getNumber(a) - getNumber(b);
              })
              ?.map((memoCode: string) => {
                return {
                  memoCode,
                  memoName: formatMessageApi({
                    DropDown_ENV_PendingMemoName: memoCode,
                  }),
                  memoDesc: lodash
                    .chain(memoDescriptionList)
                    .find((item: any) => item?.dictCode === memoCode)
                    .get('dictName')
                    .value(),
                  memoCategory: lodash
                    .chain(response)
                    .get('resultData', [])
                    .find((memoItem: any) => memoItem.memoCode === memoCode)
                    .get('memoCategory')
                    .value(),
                  multiSelect: lodash
                    .chain(response)
                    .get('resultData', [])
                    .find((memoItem: any) => memoItem.memoCode === memoCode)
                    .get('multiSelect')
                    .value(),
                };
              }),
          },
          listMemoSubType: {
            ...listMemoSubType,
            [reasonCode]: response?.resultData?.reduce((result, current) => {
              result[current.memoCode] = {
                haveMemoSubType: current.haveMemoSubType,
                memoSubType: current.memoSubTypeCodes
                  ?.sort((a: string, b: string) => {
                    return getNumber(a) - getNumber(b);
                  })
                  ?.map((reason: string) => ({
                    reasonCode: reason,
                    reasonName: formatMessageApi({
                      DropDown_ENV_SubPendingMemo: reason,
                    }),
                    reasonDesc: formatMessageApi({
                      DropDown_ENV_SubPendingMemo: reason,
                    }),
                  })),
                cron: current.reminderConfigDO?.cron?.split(',')?.map((item) => Number(item)) || [],
                code: current.reminderConfigDO?.code || null,
              };
              return result;
            }, {}),
          },
          reasonHaveMemoSubType: {
            ...reasonHaveMemoSubType,
            [reasonCode]: response.resultData?.some((item) => item.haveMemoSubType === true),
          },
        },
      });
    } else {
      reasonCodeMarked.delete(reasonCode)
    }
  }
}

export default getListMemos;
