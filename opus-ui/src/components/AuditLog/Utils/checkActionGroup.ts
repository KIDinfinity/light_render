import { ActionGroup, Group } from '../Enum';

const checkGroup = (action: string, group: string) => {
  return !!ActionGroup?.[group]?.[action];
};

const checkButton = (action: string) => checkGroup(action, Group.Button);
const checInformation = (action: string) => checkGroup(action, Group.Information);
const checkEnvoy = (action: string) => checkGroup(action, Group.Envoy);
const checkTask = (action: string) => checkGroup(action, Group.Task);
const checkCase = (action: string) => checkGroup(action, Group.Case);

export { checkButton, checInformation, checkEnvoy, checkTask, checkCase };

export default checkGroup;
