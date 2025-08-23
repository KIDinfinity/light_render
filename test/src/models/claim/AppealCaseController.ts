export default {
  namespace: 'appealCaseController',

  state: {
    appealData: {},
    currentCaseInformation: {},
    forms: {},
  },

  effects: {
    *changeFields({ payload }, { put, select }) {
      const { changedFields } = payload;
      const appealData = yield select((state) => state.appealCaseController.appealData);
      yield put({
        type: 'setAppealData',
        payload: {
          appealData: {
            ...appealData,
            ...changedFields,
          },
        },
      });
    },
  },

  reducers: {
    setAppealData(state, action) {
      const { appealData } = action.payload;
      return {
        ...state,
        appealData,
      };
    },
  },
};
