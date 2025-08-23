export default {
  namespace: 'menuCreateCaseClaim',
  state: {
    errors: [],
    form: null,
  },
  effects: {
    *validate(_, { select }) {
      const errors = yield select((state) => state.menuCreateCaseClaim.errors);
      return errors;
    },
  },
  reducers: {
    register(state, action) {
      return {
        ...state,
        form: action.payload.form,
      };
    },
    setErrors(state, action) {
      return {
        ...state,
        errors: action.payload.errors,
      };
    },
  },
};
