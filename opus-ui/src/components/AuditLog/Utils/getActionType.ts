import { RegAdd, RegRemove } from './RegExps';
import { ActionType } from '../Enum';

export default (fieldPath: string): any => {
  const isAdd = RegAdd.test(fieldPath);
  const isRemove = RegRemove.test(fieldPath);
  if (isAdd) {
    return ActionType.Add;
  }
  if (isRemove) {
    return ActionType.Remove;
  }
};
