const saveRegisterMcs = (state: any, { payload = {} }: any) => {
  const { isRegisterMcs } = payload;

  return {
    ...state,
    isRegisterMcs,
  };
};

export default saveRegisterMcs;
