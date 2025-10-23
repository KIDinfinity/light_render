export default (state: any, action: any) => {

  return {
    ...state,
    mentorDropdownList: action?.payload?.mentorDropdownList || []
  };
};
