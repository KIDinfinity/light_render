import setActionConfig from './setActionConfig';
import setClaimDataSelector from './setClaimDataSelector';
import setCommonActionLife from './setCommonActionLife';
import setTitle from './setTitle';
import updateErrors from './updateErrors';
import setOverdueTime from './setOverdueTime';
import setPolicyId from './setPolicyId';

export default {
  setActionConfig,
  setClaimDataSelector,
  setCommonActionLife,
  setTitle,
  updateErrors,
  setOverdueTime,
  setPolicyId,
  buttonAction: (buttonCode: string) => buttonCode,
  reload: () => {},
};
