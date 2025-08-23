/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import { v4 as uuidv4 } from 'uuid';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    let {
      transactionId,
      changedFields,
      type,
      modalType,
      validating = false,
      isNotDataCapture,
      coverageIndex,
      index,
      updateKey,
      newAddFlag,
      id,
    } = payload;
    const modalTypeObjMap = {
      loading: 'uwCoverageLoadingList',
      exclusion: 'uwCoverageExclusionList',
    };
    const addNewRidersPath = `entities.transactionTypesMap[${transactionId}].uwPolicy`;
    const addNewRidersData = lodash.get(draftState, `${addNewRidersPath}`, {});
    const uwCoverageList = lodash.get(addNewRidersData, 'uwCoverageList', []);
    const { mainPolicyId, sourceSystem } = draftState.processData?.policyInfo;
    const uwCoverageIndex = lodash.findIndex(uwCoverageList, (item: any) => item.id === id);
    if (lodash.has(changedFields, 'decision')) {
      const uwCoverageDecision = lodash.get(uwCoverageList, `[${uwCoverageIndex}]`, {});
      changedFields = {
        ...changedFields,
        uwCoverageDecision: {
          ...uwCoverageDecision,
          decision: lodash.get(changedFields, 'decision'),
        },
      };
    }
    switch (type) {
      case OperationTypeEnum.ADD: {
        if (modalType === 'coverage' && newAddFlag === 'Y') {
          const currentChangedFields = formUtils.cleanValidateData(changedFields || {});
          lodash.set(draftState, `${addNewRidersPath}.uwCoverageList`, [
            ...uwCoverageList,
            {
              ...currentChangedFields,
              newAddFlag: 'Y',
              policyId: mainPolicyId,
              sourceSystem,
              id: uuidv4(),
            },
          ]);
        } else {
          const { name, productCode, list } = formUtils.cleanValidateData(changedFields || {});
          if (
            !(lodash.isEmpty(list) || lodash.isEmpty(productCode) || lodash.isEmpty(name)) ||
            lodash.isNumber(coverageIndex)
          ) {
            let findIndex = uwCoverageList?.findIndex(
              (item) =>
                item.productCode === productCode &&
                item?.clientId === name &&
                item?.newAddFlag === 'Y'
            );
            findIndex = findIndex > -1 ? findIndex : coverageIndex;

            const dataList = lodash.get(
              draftState,
              `${addNewRidersPath}.uwCoverageList[${findIndex}][${modalTypeObjMap[modalType]}]`,
              []
            );
            if (lodash.isEmpty(dataList)) {
              lodash.set(
                draftState,
                `${addNewRidersPath}.uwCoverageList[${findIndex}][${modalTypeObjMap[modalType]}]`,
                list
              );
            } else {
              draftState.entities.transactionTypesMap[transactionId].uwPolicy.uwCoverageList[
                findIndex
              ][modalTypeObjMap[modalType]].push(...list);
            }
          }
        }
        break;
      }
      case OperationTypeEnum.LISTINFOUPDATE: {
        const indexData =
          addNewRidersData?.uwCoverageList?.[coverageIndex]?.[modalTypeObjMap?.[modalType]]?.[
            index
          ] || {};
        if (modalType === 'coverage') {
          lodash.set(draftState, `${addNewRidersPath}.uwCoverageList[${uwCoverageIndex}]`, {
            ...(uwCoverageList?.[uwCoverageIndex] || {}),
            ...changedFields,
          });
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
                    ? addNewRidersData?.uwCoverageList?.[coverageIndex]?.payPeriod
                    : cleanPmPeriod,
              };
            }
            if (lodash.has(changedFields, 'flatMortality')) {
              const cleanFmPeriod = formUtils.queryValue(indexData?.fmPeriod);
              pkData = {
                pmLoading: null,
                fmPeriod:
                  lodash.isEmpty(cleanFmPeriod) && cleanFmPeriod !== 0
                    ? addNewRidersData?.uwCoverageList?.[coverageIndex]?.payPeriod
                    : cleanFmPeriod,
              };
            }
          }
          lodash.set(
            draftState,
            `${addNewRidersPath}.uwCoverageList[${coverageIndex}][${modalTypeObjMap[modalType]}][${index}]`,
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
            `${addNewRidersPath}.uwCoverageList[${coverageIndex}][${modalTypeObjMap[modalType]}][${index}]`,
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
        if (modalType === 'coverage') {
          lodash.set(
            draftState,
            `${addNewRidersPath}.uwCoverageList`,
            lodash.filter(addNewRidersData?.uwCoverageList, (item) => item.id !== id)
          );
        } else {
          lodash.set(
            draftState,
            `${addNewRidersPath}.uwCoverageList[${coverageIndex}][${modalTypeObjMap[modalType]}]`,
            lodash.filter(
              addNewRidersData?.uwCoverageList?.[coverageIndex]?.[modalTypeObjMap?.[modalType]],
              (item, itemIndex) => itemIndex !== index
            )
          );
        }
        break;
      }
      case OperationTypeEnum.UPDATE: {
        if (lodash.isEmpty(updateKey)) {
          lodash.set(draftState, addNewRidersPath, {
            ...addNewRidersData,
            ...changedFields,
          });
        } else {
          lodash.set(draftState, `${addNewRidersPath}.${updateKey}`, {
            ...addNewRidersData?.[updateKey],
            ...changedFields,
          });
        }
        break;
      }
    }
  });
