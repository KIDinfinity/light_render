import state from 'claim/pages/UserPermission/PermissionMaintenance/_models/state/state';
import effects from 'claim/pages/UserPermission/PermissionMaintenance/_models/effects/effects';
import reducers from 'claim/pages/UserPermission/PermissionMaintenance/_models/reducers/reducers';

export default {
  namespace: 'permissionMaintenanceController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
