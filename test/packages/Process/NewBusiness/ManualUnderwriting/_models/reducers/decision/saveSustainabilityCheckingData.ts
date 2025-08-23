import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { businessData } = payload;

  const sustainableY =
    lodash.some(businessData.sustainabilityOptions, (item: any) => item.sustainable === 'Y') || [];

  const nextState = produce(state, (draftState: any) => {
    draftState.sustainabilityModalBtnVisible = !lodash.isEmpty(sustainableY);

    draftState.sustainabilityCheckingData = !lodash.isEmpty(sustainableY)
      ? {}
      : {
          ...businessData,
          ...lodash
            .chain(businessData?.sustainabilityOptions || [])
            .map((item: any) => {
              const { optionName, version } = item;
              const applied =
                lodash
                  .chain(draftState.sustainabilityCheckingData?.sustainabilityOptions || [])
                  .find({ optionName, version })
                  .gte('applied')
                  .value() || '';

              return {
                ...item,
                applied: !lodash.isEmpty(applied) ? applied : 'N',
              };
            })
            .value(),
        };
  });
  return {
    ...nextState,
  };
};
