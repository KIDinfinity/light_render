import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const currentReasonGroups = lodash.get(state, 'currentReasonGroups', []) || [];

  return {
    ...state,
    currentReasonGroups: [
      {
        id: lodash.get(payload, 'id', null),
        status: lodash.get(payload, 'status', null),
        reasonDetails: [{
          type: lodash.get(payload, 'requestType', null)
        }],
        isNew: true,
      },
      ...currentReasonGroups,
    ],
  };
};
