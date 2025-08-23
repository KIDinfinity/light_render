const savePayOwerList = (state: any, action: any) => {
  return {
    ...state,
    ...action.payload,
  };
};

export default savePayOwerList;
