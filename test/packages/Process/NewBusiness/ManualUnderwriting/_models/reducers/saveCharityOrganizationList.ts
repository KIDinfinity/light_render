import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuid } from 'uuid';

export default (state: any, action: any) => {
  const { changedFields, id, type } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    switch (type) {
      case 'change':
        draftState.modalData.processData.charityOrganizationList = lodash
          .chain(draftState.modalData.processData.charityOrganizationList)
          .map((el: any) => {
            return el.id === id ? { ...el, ...changedFields } : el;
          })
          .value();

        break;
      case 'add':
        draftState.modalData.processData.charityOrganizationList = [
          ...draftState.modalData.processData.charityOrganizationList,
          {
            id: uuid(),
            ...changedFields,
          },
        ];

        break;
      case 'delete':
        draftState.modalData.processData.charityOrganizationList = lodash.filter(
          draftState.modalData.processData.charityOrganizationList,
          (item: any) => item.id !== id
        );

        break;
    }
  });
  return {
    ...nextState,
  };
};
