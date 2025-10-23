import lodash from 'lodash';

interface IAction {
  payload: {
    allDocumentTypes: any;
  };
}

export default function (state: any, { payload }: IAction) {
  return {
    ...state,
    allDocumentTypes: lodash.get(payload, 'allDocumentTypes'),
  };
};;
