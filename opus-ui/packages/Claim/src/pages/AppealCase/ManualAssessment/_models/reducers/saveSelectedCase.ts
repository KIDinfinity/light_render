const saveSelectedCase = (state: any, { payload }: any) => {
  return {
    ...state,
    selectedCase: payload,
  };
};

export default saveSelectedCase;
