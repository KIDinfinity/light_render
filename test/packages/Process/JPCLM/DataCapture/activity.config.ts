import { localConfig as incidentLocalConfig } from './Incident/Section';
import { localConfig as treatmentLocalConfig } from './Treatment/Section';
// import { localConfig as invoiceLocalConfig } from './Invoice/Section';
import { localConfig as diagnosisLocalConfig } from './Diagnosis/Section';
import { localConfig as porcedureLocalConfig } from './Procedure/Section';
import { localConfig as otherProcedureLocalConfig } from './OtherProcedure/Section';
// import { localConfig as serviceLocalConfig } from './Service/Section';
import { localConfig as insuredLocalConfig } from './Insured/Section';
import { localConfig as claimantLocalConfig } from './Claimant/Section';
import { localConfig as payeeLocalConfig } from './Payee/Section';
import { localConfig as serviceAgentLocalConfig } from './ServiceAgent/Section';
import { localConfig as popUpConfig } from './PopUp/Section';

const NAMESPACE = 'JPCLMOfDataCapture';

export { NAMESPACE };

export default {
  configs: [
    ...claimantLocalConfig.configs,
    ...diagnosisLocalConfig.configs,
    ...incidentLocalConfig.configs,
    ...insuredLocalConfig.configs,
    // ...invoiceLocalConfig.configs,
    ...otherProcedureLocalConfig.configs,
    ...payeeLocalConfig.configs,
    ...porcedureLocalConfig.configs,
    ...treatmentLocalConfig.configs,
    ...serviceAgentLocalConfig.configs,
    // ...serviceLocalConfig.configs,
    ...popUpConfig.configs,
  ],
  remote: false, // 远程配置来源于本地配置，当远程配置同步后，改remote为true,
};
