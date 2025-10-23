import { has, isEqual } from 'lodash';
import { transferData } from '../utils';

export default ({ props, formValue, recoverValue }: any) => {
  return (
    has(props, 'recoverValue') && !isEqual(transferData(recoverValue), transferData(formValue))
  );
};
