import { produce } from 'immer';
import lodash from 'lodash';

const saveMaps = (state: any) => {
  const nextState = produce(
    state,
    (draftState: {
      processData: any;
      roleByClientMap: {};
      sectionMap: {};
      questionnaireKey: string;
    }) => {
      const questionnaireKey = draftState.questionnaireKey;
      const roleByClientMap = {};
      const sectionMap = {};

      console.log('saveMap', lodash.cloneDeep(draftState.processData));
      lodash.forEach(lodash.cloneDeep(draftState.processData), (customerQuestionnaireItem) => {
        const roles: string[] = [];
        lodash.forEach(customerQuestionnaireItem.questionnaireList, (questionnaireItem) => {
          roles.push(...(questionnaireItem.clientType?.split(',') || []));
          // 对每个问卷根据不同section的和其下每个问题的sequence进行排序
          questionnaireItem.sectionList
            ?.sort((a: { sequence: number }, b: { sequence: number }) => a.sequence - b.sequence)
            ?.forEach(
              (
                sectionItem: {
                  sectionLabel: string;
                  sectionCode: string;
                  isDisplay: number;
                  sectionQuestionList: any[];
                },
                index: any
              ) => {
                lodash.set(
                  sectionMap,
                  `${customerQuestionnaireItem.clientInfo[questionnaireKey]}${questionnaireItem.questionnaireCode}.${index}`,
                  {
                    sectionLabel: sectionItem.sectionLabel,
                    sectionCode: sectionItem.sectionCode,
                    isDisplay: sectionItem.isDisplay,
                    sectionQuestionList: sectionItem.sectionQuestionList.sort(
                      (a: string, b: string) => {
                        const questionA = Number(a.split('--')[1]);
                        const questionB = Number(b.split('--')[1]);
                        return questionA - questionB;
                      }
                    ),
                  }
                );
              }
            );
        });

        // eg: {
        //   '用户A':['角色A','角色B']
        // }
        lodash.set(
          roleByClientMap,
          `${customerQuestionnaireItem.clientInfo[questionnaireKey]}`,
          lodash.uniq(roles).filter((item) => item !== undefined)
        );
      });

      draftState.roleByClientMap = roleByClientMap;
      draftState.sectionMap = sectionMap;
    }
  );

  return { ...nextState };
};

export default saveMaps;
