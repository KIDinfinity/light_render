/* eslint-disable no-param-reassign */
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';
import lodash from 'lodash';
import { IdentificationClientTagEnum, StateSectionEnum } from 'process/GeneralPOS/common/Enum';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId } = payload;
    const transactionPath = `entities.transactionTypesMap[${transactionId}]`;

    if (draftState?.isDecision) {
      const identificationClientResultList = lodash.get(
        draftState,
        `${transactionPath}.identificationClientResultList`
      );
      const clientInfoList = lodash.get(draftState, `${transactionPath}.clientInfoList`);

      const addNeedDuplicateCheckList = [];
      // 处理identificationResult 为 problematch并且 operationResult 为 select 并且 selectClientId 为空 的情况
      lodash.forEach(identificationClientResultList, (item) => {
        if (
          (item.operationResult === 'select' || lodash.isEmpty(item.operationResult)) &&
          item.identificationResult === IdentificationClientTagEnum.SuspectClient &&
          lodash.isEmpty(item.selectClientId)
        ) {
          addNeedDuplicateCheckList.push(item.clientSeq);
        }
      });
      // 处理clientInfoList 的数据量跟identificationClientResultList 的对不上的情况
      addNeedDuplicateCheckList.push(
        ...lodash.difference(
          lodash.map(clientInfoList, (item) => item.clientSeq),
          lodash.map(identificationClientResultList, (item) => item.clientSeq)
        )
      );
      lodash.set(
        draftState,
        `${transactionPath}.needDuplicateCheckList`,
        lodash.uniq([
          ...(lodash.get(state, `${transactionPath}.needDuplicateCheckList`) || []),
          ...addNeedDuplicateCheckList,
        ])
      );
    }

    lodash.set(
      draftState,
      `extraField.${StateSectionEnum.NOMINEE}.total`,
      lodash
        .chain(draftState)
        .get(`${transactionPath}.beneficiaryList`, [])
        .filter((beneficiaryItem: any) =>
          tenant.isTH()
            ? beneficiaryItem.beneficiaryType === 'DB' ||
              lodash.isEmpty(beneficiaryItem.beneficiaryType)
            : true
        )
        .map((childItem: any) => Number(formUtils.queryValue(childItem.benefitPercentage) || 0))
        .sum()
        .value()
    );
  });
