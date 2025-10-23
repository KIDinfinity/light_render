import lodash from 'lodash';

export default (state: any, action: any) => {
  const { buttonCode, errorsCount } = action?.payload;
  lodash.set(state, `buttonStatus.${buttonCode}.errorsCount`, errorsCount);
  return state;
};
