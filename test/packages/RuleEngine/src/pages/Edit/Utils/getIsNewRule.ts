import { find } from 'lodash';
import { ModuleCode } from '../Enum';
export default (moduleCode: string, ruleModules: any[]) => {
  const editType = find(ruleModules, (item) => item.moduleCode === moduleCode)?.editType;
  return editType === 2;
};

const getNewFlow = (moduleCode: string) =>
  [
    ModuleCode.TaskAutoAssign,
    ModuleCode.AutoUW,
    ModuleCode.Servicing,
    ModuleCode.ManualAssign,
    ModuleCode.UserAutoAssign,
    ModuleCode.ClaimEstimate,
  ].includes(moduleCode);
export { getNewFlow };
