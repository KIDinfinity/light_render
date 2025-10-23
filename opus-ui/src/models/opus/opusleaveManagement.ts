import state from 'packages/Opus/Pages/LeaveManagement/_models/state';
import effects from 'packages/Opus/Pages/LeaveManagement/_models/effects';
import reducers from 'packages/Opus/Pages/LeaveManagement/_models/reducers';

export default {
  namespace: 'opusleaveManagement',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
