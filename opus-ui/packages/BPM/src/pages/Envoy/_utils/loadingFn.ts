const loadingFn = async ({
  self,
  stateKey,
  dispatch,
  dispatchObj,
}: {
  self: any;
  stateKey: string;
  dispatch: Function;
  dispatchObj: any;
}): void => {
  const stateObj = {};
  stateObj[stateKey] = true;
  await self.setState(stateObj);
  await dispatch(dispatchObj);
  stateObj[stateKey] = false;
  await self.setState(stateObj);
};

export default loadingFn;
