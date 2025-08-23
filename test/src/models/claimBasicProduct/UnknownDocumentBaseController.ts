import {
  state,
  effects,
  reducers,
  listeners,
} from 'claimBasicProduct/pages/UnknownDocument/_models';

export default {
  namespace: 'UnknownDocumentBaseController',
  state,
  effects: {
    ...effects,
    ...listeners,
  },
  reducers,
};
