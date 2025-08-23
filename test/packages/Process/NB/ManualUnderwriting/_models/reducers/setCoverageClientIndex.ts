import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { firstName, surname } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const coverageList = lodash.get(draftState, 'businessData.policyList[0].coverageList', []);
    lodash.set(draftState, 'coverageClientList', []);
    lodash
      .chain(coverageList)
      .map((item: any, index: any) => {
        lodash
          .chain(item)
          .get('coverageInsuredList')
          .map((insured: any, insuredIndex: any) => {
            const coverageClientName = lodash.get(insured, 'clientName', '');
            const coverageClientNameItem = lodash.split(coverageClientName, ' ');
            if (
              (!lodash.isEmpty(firstName) &&
                !lodash.isEmpty(surname) &&
                coverageClientNameItem?.length === 2 &&
                !lodash.isEmpty(coverageClientNameItem[0]) &&
                !lodash.isEmpty(coverageClientNameItem[1]) &&
                lodash.isEqual(firstName, coverageClientNameItem?.[0]) &&
                lodash.isEqual(surname, coverageClientNameItem?.[1])) ||
              (!lodash.isEmpty(firstName) &&
                !lodash.isEmpty(coverageClientNameItem[0]) &&
                lodash.isEmpty(coverageClientNameItem[1]) &&
                lodash.isEqual(firstName, coverageClientNameItem?.[0])) ||
              (!lodash.isEmpty(surname) &&
                lodash.isEmpty(coverageClientNameItem[0]) &&
                !lodash.isEmpty(coverageClientNameItem[1]) &&
                lodash.isEqual(surname, coverageClientNameItem?.[1]))
            ) {
              lodash.set(draftState, 'coverageClientList', [
                ...lodash.get(draftState, 'coverageClientList'),
                {
                  coverageClientIndex: index,
                  coverageClientItemIndex: insuredIndex,
                },
              ]);
            }
            return insured;
          })
          .value();
        return item;
      })
      .value();
  });
  return {
    ...nextState,
  };
};
