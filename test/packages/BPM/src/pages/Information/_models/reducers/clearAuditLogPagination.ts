import { produce } from 'immer';

/**
 *
 * @param 清除
 */
export default (state: any) => {
  const { auditLogPagination } = state;
  const nextState = produce(state, (draftState: any) => {
    draftState.auditLogPagination = {
      ...auditLogPagination,
      currentPage: 1,
    };
  });
  return { ...nextState };
};
