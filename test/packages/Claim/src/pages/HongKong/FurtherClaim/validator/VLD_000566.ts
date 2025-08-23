import lodash from 'lodash';
import { getSelectionTreatment } from '../functions';

/**
 * System cannot identify any potential serial claims for current claim after running prior/further claim checking (only for active screen in Assessment)
 */

export const VLD_000566 = (claimData: any) => lodash.isEmpty(getSelectionTreatment(claimData));
