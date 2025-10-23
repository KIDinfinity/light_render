import state from 'packages/Opus/Modules/SiderTabs/_models/state';
import effects from 'packages/Opus/Modules/SiderTabs/_models/effects';
import reducers from 'packages/Opus/Modules/SiderTabs/_models/reducers';

export default {
  namespace: 'opusSider',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
