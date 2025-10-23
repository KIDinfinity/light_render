import CaseCategory from 'enum/CaseCategory';
import TaskDefKey from 'enum/TaskDefKey';

const ManualUnderwritingConfig = {
  caseCategory: CaseCategory.BP_NB_CTG001,
  activityCode: TaskDefKey.BP_NB_ACT004,
};

const FECApproval01Config = {
  caseCategory: CaseCategory.BP_FEC_CTG001,
  activityCode: TaskDefKey.BP_FEC_ACT001,
};

export { ManualUnderwritingConfig, FECApproval01Config };

export default FECApproval01Config;
