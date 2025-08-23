interface IEffects {
  put: any;
  select: Function;
  takeLatest: Function;
}

interface IState {
  isFirstLoadEnd: boolean;
  isLoadEnd: boolean;
}

export default {
  namespace: 'claimDataStatus',

  state: {
    // isFirstLoadEnd: true,
    // isLoadEnd: false,
    // 在不是理赔页的时候，默认理赔数据是加载完，不是第一次加载（因为没有理赔数据，也不需要记录是否是第一次加载）
    isFirstLoadEnd: false,
    isLoadEnd: true,
  },

  effects: {
    *saveClaimDataListener(_: any, { put, takeLatest }: IEffects) {
      // 进入理赔页的时候会将isFirstLoadEnd（是否第一次加载）设置为true，isLoadEnd（理赔数据是否加载完）设置为false，监听理赔数据加载完保存的时候，设置isLoadEnd为true，isFirstLoadEnd为false。
      yield takeLatest(
        [
          'bpOfDataCaptureController/saveClaimProcessData',
          'bpOfClaimAssessmentController/saveClaimProcessData',
          'JPCLMOfClaimRegistrationController/saveClaimProcessData',
          'JPCLMOfQualityController/saveClaimProcessData',
          'JPCLMOfClaimAssessmentController/saveClaimProcessData',
          'JPDPOfDocumentDispatchController/saveClaimProcessData',
          'daOfClaimCaseController/saveClaimProcessData',
          'daOfClaimAssessmentController/saveClaimProcessData',
          'hbOfClaimAssessmentController/saveClaimProcessData',
          'apOfClaimCaseController/saveClaimProcessData',
          'apOfClaimAssessmentController/saveClaimProcessData',
          'UnknownDocumentController/saveClaimProcessData',
          'IdentifyHospitalBatchController/saveClaimProcessData',
          'UnknownDocumentBaseController/saveClaimProcessData',
          'permissionMaintenanceController/saveClaimProcessData',
          'dataConfigurationController/saveFunctionData',
          'permissionConfigurationController/saveFunctionData',
          'ruleEngineController/saveClaimProcessData',
          'phowbDataCaptureController/savePosDateDetail',
        ],
        function* action() {
          yield put({
            type: 'loadClaimDataEnd',
          });
        }
      );
    },
    *loadClaimDataEnd(_, { select, put }) {
      const isFirstLoadEnd = yield select((state: any) => state.claimDataStatus.isFirstLoadEnd);
      if (isFirstLoadEnd) {
        yield put({
          type: 'saveClaimDataStatus',
          payload: {
            isFirstLoadEnd: false,
            isLoadEnd: true,
          },
        });
      }
    },
  },

  reducers: {
    saveClaimDataStatus(state: IState, { payload }: any) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch }: any) {
      dispatch({
        type: 'saveClaimDataListener',
      });
    },
  },
};
