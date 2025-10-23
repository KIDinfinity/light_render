const saveListPolicy = (state: any, action: any) => {
  return {
    ...state,
    listPolicy: action.payload,
  };
};

export default saveListPolicy;
