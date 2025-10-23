import state from 'opus/Pages/Process/NewBusiness/DataEntry/_models/state';
import effects from 'opus/Pages/Process/NewBusiness/DataEntry/_models/effects';
import reducers from 'opus/Pages/Process/NewBusiness/DataEntry/_models/reducers';
import { NAMESPACE } from 'opus/Pages/Process/NewBusiness/DataEntry/activity.config';

export default {
  namespace: NAMESPACE,
  state,
  effects,
  reducers,
};
