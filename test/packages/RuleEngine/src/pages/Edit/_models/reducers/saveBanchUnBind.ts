import { produce }  from 'immer';
import lodash from 'lodash';

const saveBanchUnBind = (state: any, action: any) => {
  const { id } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.decisionEditData.branchVO.branchList = lodash.map(
      draftState.decisionEditData.branchVO.branchList,
      (item: any) => {
        return item.id === id
          ? {
              ...item,
              binded: '0',
            }
          : item;
      }
    );
  });

  return { ...nextState };
};

export default saveBanchUnBind;
