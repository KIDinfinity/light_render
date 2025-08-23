/* eslint-disable no-param-reassign */
import lodash from 'lodash';

const common = (
  list: any,
  map: {},
  todo: {
    (normalizeId: any, denormalizeId: any): any;
    (normalizeId: any, denormalizeId: any): any;
    (arg0: string, arg1: any): any;
  },
  isNormalize: boolean,
  questionnaireKey
) => {
  const resultList = lodash.cloneDeep(list);
  lodash.forEach(resultList, (customerQuestionnaireItem, index) => {
    lodash.forEach(customerQuestionnaireItem.questionnaireList, (questionnaireItem, index1) => {
      lodash.forEach(questionnaireItem.sectionList, (sectionItem, index2) => {
        const newSectionQuestionList = sectionItem.sectionQuestionList?.map(
          (sectionQuestionItem: { questionCode: any; sequence: any }) => {
            const mapKey = `${customerQuestionnaireItem.clientInfo[questionnaireKey]}${questionnaireItem.questionnaireCode}-${sectionItem.sectionCode}${sectionQuestionItem.questionCode}--${sectionQuestionItem.sequence}`;
            if (isNormalize) {
              if (lodash.isEmpty(map.sectionQuestionListMap)) {
                map.sectionQuestionListMap = {};
              }
              map.sectionQuestionListMap[mapKey] = sectionQuestionItem;
            }
            return todo(`${mapKey}`, sectionQuestionItem);
          }
        );
        lodash.set(
          resultList,
          `[${index}].questionnaireList[${index1}].sectionList[${index2}].sectionQuestionList`,
          newSectionQuestionList
        );
      });
    });
  });

  if (isNormalize) {
    return { processData: resultList, entities: { ...map } };
  }
  return resultList;
};

export const normalizeData = (processData: any, questionnaireKey) => {
  const sectionQuestionListMap = {};
  return common(
    lodash.cloneDeep(processData),
    sectionQuestionListMap,
    (normalizeId: any, denormalizeId: any) => normalizeId,
    true,
    questionnaireKey
  );
};

export const denormalizeData = (processData: any, entities: any) => {
  return common(
    lodash.cloneDeep(processData),
    entities,
    (normalizeId: any, denormalizeId: string | number) =>
      entities.sectionQuestionListMap[denormalizeId],
    false
  );
};
