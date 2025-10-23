import lodash from 'lodash';

interface IAction {
  payload: {
    viewReasonInfo: any;
  };
}

const saveViewReasonInfo = (state: any, { payload }: IAction) => {
  return {
    ...state,
    viewReasonInfo: lodash.get(payload, 'viewReasonInfo'),
  };
};

export default saveViewReasonInfo;
