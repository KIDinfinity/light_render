/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { OperationTypeEnum, BenefitLevelDecisionEnum } from 'process/GeneralPOS/common/Enum';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const {
      transactionId,
      changedFields,
      type,
      modalType,
      validating = false,
      isNotDataCapture,
      coverageIndex,
      index,
      updateKey,
    } = payload;
    const modalTypeObjMap = {
      loading: 'uwCoverageLoadingList',
      exclusion: 'uwCoverageExclusionList',
    };
    const reinstatementPath = `entities.transactionTypesMap[${transactionId}].uwPolicy`;
    const reinstatementData = lodash.get(draftState, `${reinstatementPath}`, {});
    switch (type) {
      case OperationTypeEnum.ADD: {
        const { name, productCode, list } = formUtils.cleanValidateData(changedFields || {});
        if (
          !(lodash.isEmpty(list) || lodash.isEmpty(productCode) || lodash.isEmpty(name)) ||
          lodash.isNumber(coverageIndex)
        ) {
          let findIndex = reinstatementData?.uwCoverageList?.findIndex(
            (item) => item.productCode === productCode && item?.clientId === name
          );
          findIndex = findIndex > -1 ? findIndex : coverageIndex;

          const dataList = lodash.get(
            draftState,
            `${reinstatementPath}.uwCoverageList[${findIndex}][${modalTypeObjMap[modalType]}]`,
            []
          );
          if (lodash.isEmpty(dataList)) {
            lodash.set(
              draftState,
              `${reinstatementPath}.uwCoverageList[${findIndex}][${modalTypeObjMap[modalType]}]`,
              list
            );
          } else {
            draftState.entities.transactionTypesMap[transactionId].uwPolicy.uwCoverageList[
              findIndex
            ][modalTypeObjMap[modalType]].push(...list);
          }
        }
        break;
      }
      case OperationTypeEnum.LISTINFOUPDATE: {
        const indexData =
          reinstatementData?.uwCoverageList?.[coverageIndex]?.[modalTypeObjMap?.[modalType]]?.[
            index
          ] || {};
        if (modalType === 'coverage') {
          lodash.set(
            draftState,
            `${reinstatementPath}.uwCoverageList[${coverageIndex}].uwCoverageDecision`,
            {
              ...(reinstatementData?.uwCoverageList?.[coverageIndex].uwCoverageDecision || {}),
              ...changedFields,
            }
          );
          if (!validating) {
            const mainFlag = reinstatementData?.uwCoverageList?.[coverageIndex].mainFlag;
            if (mainFlag) {
              lodash.set(
                draftState,
                `${reinstatementPath}.uwPolicyDecision.decision`,
                [BenefitLevelDecisionEnum.Postpone, BenefitLevelDecisionEnum.Decline].includes(
                  formUtils.queryValue(changedFields.decision)
                )
                  ? formUtils.queryValue(changedFields.decision)
                  : ''
              );
            }
          }
        }

        if (modalType === 'loading') {
          let pkData = {};
          if (!validating) {
            if (lodash.has(changedFields, 'pmLoading')) {
              const cleanPmPeriod = formUtils.queryValue(indexData?.pmPeriod);
              pkData = {
                flatMortality: null,
                pmPeriod:
                  lodash.isEmpty(cleanPmPeriod) && cleanPmPeriod !== 0
                    ? reinstatementData?.uwCoverageList?.[coverageIndex]?.payPeriod
                    : cleanPmPeriod,
              };
            }
            if (lodash.has(changedFields, 'flatMortality')) {
              const cleanFmPeriod = formUtils.queryValue(indexData?.fmPeriod);
              pkData = {
                pmLoading: null,
                fmPeriod:
                  lodash.isEmpty(cleanFmPeriod) && cleanFmPeriod !== 0
                    ? reinstatementData?.uwCoverageList?.[coverageIndex]?.payPeriod
                    : cleanFmPeriod,
              };
            }
          }
          lodash.set(
            draftState,
            `${reinstatementPath}.uwCoverageList[${coverageIndex}][${modalTypeObjMap[modalType]}][${index}]`,
            {
              ...indexData,
              ...changedFields,
              ...pkData,
            }
          );
        }

        if (modalType === 'exclusion') {
          const extra = {};
          if (!validating) {
            if (
              lodash.has(changedFields, 'shortName') &&
              lodash.isEmpty(formUtils.queryValue(changedFields?.shortName))
            ) {
              extra.code = null;
            }

            if (lodash.has(changedFields, 'code')) {
              const exclusionCodes = draftState?.dictObject?.exclusionCodes;
              const codeLongDesc =
                lodash
                  .chain(exclusionCodes)
                  .find(
                    (item) => item?.localExclusionCode === formUtils.queryValue(changedFields?.code)
                  )
                  .value()?.longDesc || formUtils.queryValue(changedFields?.code);
              extra.exclusionShortName = codeLongDesc;
            }
          }
          lodash.set(
            draftState,
            `${reinstatementPath}.uwCoverageList[${coverageIndex}][${modalTypeObjMap[modalType]}][${index}]`,
            {
              ...indexData,
              ...changedFields,
              ...extra,
            }
          );
        }
        break;
      }
      case OperationTypeEnum.DELETE: {
        lodash.set(
          draftState,
          `${reinstatementPath}.uwCoverageList[${coverageIndex}][${modalTypeObjMap[modalType]}]`,
          lodash.filter(
            reinstatementData?.uwCoverageList?.[coverageIndex]?.[modalTypeObjMap?.[modalType]],
            (item, itemIndex) => itemIndex !== index
          )
        );
        break;
      }
      case OperationTypeEnum.UPDATE: {
        lodash.set(draftState, `${reinstatementPath}.${updateKey}`, {
          ...reinstatementData?.[updateKey],
          ...changedFields,
        });
        break;
      }
    }
  });
