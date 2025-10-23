import ChangePrefix, { localFieldConfig as ChangePrefixConfig } from './ChangePrefix';
import ChangeFirstName, { localFieldConfig as ChangeFirstNameConfig } from './ChangeFirstName';
import ChangeMiddleName, { localFieldConfig as ChangeMiddleNameConfig } from './ChangeMiddleName';
import ChangeSurname, { localFieldConfig as ChangeSurnameConfig } from './ChangeSurname';
import ReasonforChange, { localFieldConfig as ReasonforChangeConfig } from './ReasonforChange';

export const localFieldConfigs = [
  ChangePrefixConfig,
  ChangeFirstNameConfig,
  ChangeMiddleNameConfig,
  ChangeSurnameConfig,
  ReasonforChangeConfig,
];

export default {
  ChangePrefix,
  ChangeFirstName,
  ChangeMiddleName,
  ChangeSurname,
  ReasonforChange,
};
