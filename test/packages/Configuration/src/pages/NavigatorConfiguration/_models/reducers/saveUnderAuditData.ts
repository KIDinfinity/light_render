export default (state: any, action: any) => {
  const { underAuditData } = action.payload;
  return {
    ...state,
    underAuditData,
  };
};
