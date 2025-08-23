const saveListBenefitFactor = (state: any, action: any) => {
  return {
    ...state,
    listBenefitFactor: action.payload,
  };
};

export default saveListBenefitFactor;
