import { produce } from 'immer';
import lodash from 'lodash';

const PersonalInfoFields = ['customerEnFirstName', 'customerEnSurname', 'identityNo'];

export default (state: any, { payload }: any) => {
  const { changedFields, id } = payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.entries(changedFields).forEach(([key, field]) => {
      if (lodash.includes(PersonalInfoFields, key)) {
        lodash.set(draftState, `modalData.entities.clientMap.${id}.personalInfo.${key}`, field);
      }
    });
  });

  return {
    ...nextState,
  };
};
