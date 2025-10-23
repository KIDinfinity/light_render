import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const collapseState = payload?.collapseState;
  return {
    ...state,
    collapseState: lodash.isUndefined(collapseState) ? !state.collapseState : !!collapseState,
  };
};
