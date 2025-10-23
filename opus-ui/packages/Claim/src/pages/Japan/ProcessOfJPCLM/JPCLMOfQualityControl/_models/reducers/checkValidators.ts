import lodash from 'lodash';
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import { DocumentCategory, CategoryMapName, Category as enumCategory } from '../../Enum';
import { Mapping, getValidatorFields } from '../../ValidatorRules';
import { getNameArray } from '../../Utils/documentUtils';

export default (state: any, action: any) => {
  const { documentId, keyName, id, changedFields, documentTypeCode } = action.payload;

  const Category = DocumentCategory[documentTypeCode];
  const changeKey = lodash.head(lodash.keys(changedFields)) || '';
  const checkValue = formUtils.queryValue(lodash.get(changedFields, changeKey));
  const currentRule = lodash.get(Mapping, `${Category}.${changeKey}`);

  const nextState = produce(state, (draftState: any) => {
    if (currentRule) {
      const {
        arrayKey,
        arrayItem,
        arrayMapping,
        validateFirst,
        mappingKeys,
        borderMap,
      } = currentRule;
      // 一层结构自身校验
      if (mappingKeys) {
        const data = draftState.claimProcessData.claimEntities.bpoFormDataList[documentId].formData;
        draftState.claimProcessData.claimEntities.bpoFormDataList[documentId].formData = {
          ...data,
          ...getValidatorFields({
            mappingKeys,
            checkValue,
            data,
          }),
        };
      }
      // 一层导致二层结构校验
      if (arrayKey) {
        const dataArrays =
          draftState.claimProcessData.claimEntities.bpoFormDataList[documentId].formData[arrayKey];
        draftState.claimProcessData.claimEntities.bpoFormDataList[documentId].formData[
          arrayKey
        ] = lodash.map(dataArrays, (data: any, index: number) => {
          if (validateFirst && index > 0) {
            return data;
          }
          const validatorFields = getValidatorFields({
            mappingKeys: arrayMapping,
            checkValue,
            data,
          });
          return {
            ...data,
            ...validatorFields,
          };
        });
      }
      // 二层结构自身校验
      if (arrayItem) {
        const dataArrays =
          draftState.claimProcessData.claimEntities.bpoFormDataList[documentId].formData[keyName];
        draftState.claimProcessData.claimEntities.bpoFormDataList[documentId].formData[
          keyName
        ] = lodash.map(dataArrays, (data: any) =>
          data.id === id
            ? {
                ...data,
                ...getValidatorFields({
                  mappingKeys: arrayMapping,
                  checkValue,
                  data,
                }),
              }
            : data
        );
      }
      // 同层结构兄弟校验
      if (borderMap) {
        const checkArray = lodash.pickBy(
          draftState.claimProcessData.claimEntities.bpoFormDataList,
          (item, key) => {
            const { formData } = item;
            return (
              key !== documentId &&
              lodash.has(enumCategory, DocumentCategory[formData.documentTypeCode])
            );
          }
        );
        const bpoFormDataListClone = lodash.cloneDeep(
          draftState.claimProcessData.claimEntities.bpoFormDataList
        );
        lodash.forEach(checkArray, (item, key) => {
          const { formData, documentId } = item;
          const { rules } = borderMap;
          const insuredNameList = getNameArray(
            draftState.claimProcessData.claimEntities.bpoFormDataList,
            documentId
          );
          const fieldName = CategoryMapName[DocumentCategory[formData.documentTypeCode]];
          bpoFormDataListClone[key].formData = {
            ...formData,
            ...getValidatorFields({
              mappingKeys: { [fieldName]: rules },
              checkValue: insuredNameList,
              data: formData,
            }),
          };
        });
        draftState.claimProcessData.claimEntities.bpoFormDataList = bpoFormDataListClone;
      }
    }
  });

  return { ...nextState };
};
