import initState from '../state';

export default (state: any) => {
  return {
    ...state,
    auditList: initState.auditList,
    colorDict: initState.colorDict,
    auditLogPagination: initState.auditLogPagination,
  };
};
