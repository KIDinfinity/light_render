import lodash from 'lodash';

interface IAction {
  payload: {
    caseNo: string;
  };
}

export default function saveCaseNo(state: any, { payload }: IAction) {
  return {
    ...state,
    formData: {
      ...state.formData,
      caseNo: lodash.get(payload, 'caseNo'),
    },
  };
}
