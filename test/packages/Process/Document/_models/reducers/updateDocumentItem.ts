import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.businessData.docViewVOList = lodash
      .chain(draftState.businessData.docViewVOList || [])
      .map((el: any) => ({
        ...el,
        isSelect: el.id === id ? (!el.isSelect || el.isSelect === 'N' ? 'Y' : 'N') : el.isSelect,
        voidFlag: el.id === id ? Number(!el.voidFlag) : el.voidFlag,
      }))
      .value();
  });
  return { ...nextState };
};
