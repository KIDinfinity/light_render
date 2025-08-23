/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { id } = payload;

    const cloneOriginSortList: any[] = [];

    // 初始化时获取克隆源数据并且排序

    const cloneOriginListMap = lodash.reduce(
      lodash.uniqBy(
        [
          ...(draftState?.processData?.policyInfo?.policyInfoList || []),
          ...(draftState?.entities?.transactionTypesMap?.[id]?.applyToPolicyOriginalList || []),
        ],
        'policyId'
      ),
      (result, value) => {
        const newId = uuidv4();

        cloneOriginSortList.push(`${id}____${value.policyId}`);

        return {
          ...result,
          [`${id}____${value.policyId}`]: {
            ...value,
            ...draftState.entities.policyInfoBOListMap?.[`${id}____${value.policyId}`],
            id: newId,
          },
        };
      },
      {}
    );

    draftState.sortApplyListMap[id] = cloneOriginSortList
      .sort((a: any) =>
        lodash.includes(draftState.entities.transactionTypesMap?.[id]?.applyToPolicyBOList, a)
          ? -1
          : 0
      )
      .filter((item: any) => item.split('____')[1] !== draftState.processData?.mainPolicyId);

    draftState.entities.policyInfoBOListMap = {
      ...draftState.entities.policyInfoBOListMap,
      ...cloneOriginListMap,
    };
  });
