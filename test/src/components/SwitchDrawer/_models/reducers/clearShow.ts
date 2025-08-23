import InitState from '../state';

export default (state: any) => {
  const { processShow, processInfo } = InitState;
  return {
    ...state,
    processShow,
    processInfo,
  };
};
