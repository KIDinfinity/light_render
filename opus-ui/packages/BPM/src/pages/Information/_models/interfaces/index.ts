export interface IEffects {
  put: any;
  call: Function;
  select: Function;
  take: Function;
  takeLatest: Function;
  throttle: Function;
}

export interface IDispatch {
  dispatch: Function;
}
