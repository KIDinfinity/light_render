import type { IEffects } from '../interfaces/index';

export default function* loaAuditLogdNextPage(_: any, { put, select }: IEffects) {
  const { auditLogPagination } = yield select((state: any) => state.infoController);
  const { currentPage: prePage } = auditLogPagination;
  const currentPage = Number(prePage) + 1;

  yield put({
    type: 'getAuditLogsList',
    payload: {
      params: {
        ...auditLogPagination,
        currentPage,
      },
    },
  });
}
