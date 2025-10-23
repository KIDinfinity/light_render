import { state, effects, reducers } from '../../../packages/LeaveManagement/_models';

export default {
  namespace: 'leaveManagement',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
