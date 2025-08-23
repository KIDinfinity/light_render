import { v4 as uuid4 } from 'uuid';
import { eTraceStatus, eOperation, ePageService } from '@/components/TarckPoint/enum';
import logCenterTatLogControllerService from '@/services/logCenterTatLogControllerService';

const getParams = (state: any, exact: any) => ({
  ...state,
  ...exact,
});

export default {
  namespace: 'tarckPointController',
  state: {},
  effects: {
    *loadPoint({ payload }: any, { call, put, select }: any) {
      const spanId = uuid4();
      const traceId = uuid4();
      const operator = yield select((state: any) => state.user.currentUser.userId);
      const params = getParams(
        {},
        {
          spanId,
          traceId,
          traceStatus: eTraceStatus.start,
          operator,
          version: '1',
          ...payload,
        }
      );

      const service = ePageService[params.page] || ePageService.default;

      yield call(logCenterTatLogControllerService[service], params); // TODO
      yield put({
        type: 'save',
        payload: params,
      });
    },
    *changeStatusPoint({ payload }: any, { all, call, put, select }: any) {
      const { taskStatus } = payload;
      const dstate = yield select((state: any) => state.tarckPointController);
      const endParams = getParams(dstate, {
        traceStatus: eTraceStatus.end,
        operation: eOperation.changeStatus,
      });
      const startParams = getParams(dstate, {
        traceId: uuid4(),
        taskStatus,
        traceStatus: eTraceStatus.start,
        operation: eOperation.changeStatus,
      });
      yield all([
        call(logCenterTatLogControllerService.log4claim, endParams),
        call(logCenterTatLogControllerService.log4claim, startParams),
        put({
          type: 'save',
          payload: startParams,
        }),
      ]);
    },
    *unLoadPoint(_: any, { put, select, call }: any) {
      const dstate = yield select((state: any) => state.tarckPointController);
      const params = getParams(dstate, {
        traceStatus: eTraceStatus.end,
        operation: eOperation.unload,
      });
      const service = ePageService[params.page] || ePageService.default;
      yield call(logCenterTatLogControllerService[service], params);
      yield put({
        type: 'clear',
      });
    },
    *inquiryPoint({ payload }: any, { call, select }: any) {
      const spanId = uuid4();
      const traceId = uuid4();
      const operator = yield select((state: any) => state.user.currentUser.userId);
      const params = {
        spanId,
        traceId,
        traceStatus: eTraceStatus.start,
        operation: eOperation.inquiry,
        operator,
        version: '1',
        ...payload,
      };
      yield call(logCenterTatLogControllerService.simpleLog, params);
    },
  },
  reducers: {
    save(state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {};
    },
  },
};
