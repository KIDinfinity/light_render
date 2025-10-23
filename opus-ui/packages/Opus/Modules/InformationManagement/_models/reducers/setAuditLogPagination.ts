export default (state: any, { payload }: any) => {
  const { auditLogPagination } = payload;
  return {
    ...state,
    auditLogPagination,
  };
};
