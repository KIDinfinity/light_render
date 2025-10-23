import initState from '../state';

export default (state: any, action: any) => {
  const keepState = action?.payload?.keepState;
  const extra = keepState ? { [keepState]: state?.[keepState] } : {};

  return {
    ...initState,
    ...extra,
  };
};
