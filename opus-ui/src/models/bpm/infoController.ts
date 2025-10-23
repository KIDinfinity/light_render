import { state, effects, reducers } from 'opus/Modules/InformationManagement/_models';

export default {
  namespace: 'infoController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
