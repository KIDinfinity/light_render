import DateOfBirth, { localFieldConfig as DateOfBirthConfig } from './DateOfBirth';
import ExtName, { localFieldConfig as ExtNameConfig } from './ExtName';
import FirstName, { localFieldConfig as FirstNameConfig } from './FirstName';
import Gender, { localFieldConfig as GenderConfig } from './Gender';
import MiddleName, { localFieldConfig as MiddleNameConfig } from './MiddleName';
import Nationality, { localFieldConfig as NationalityConfig } from './Nationality';
import PlaceOfBirth, {
  localFieldConfig as PlaceOfBirthConfig,
} from './PlaceOfBirth';
import Surname, { localFieldConfig as SurnameConfig } from './Surname';
import Title, { localFieldConfig as TitleConfig } from './Title';

export const localFieldConfigs = [
  DateOfBirthConfig,
  ExtNameConfig,
  FirstNameConfig,
  GenderConfig,
  MiddleNameConfig,
  NationalityConfig,
  PlaceOfBirthConfig,
  SurnameConfig,
  TitleConfig,
];

export default {
  DateOfBirth,
  ExtName,
  FirstName,
  Gender,
  MiddleName,
  Nationality,
  PlaceOfBirth,
  Surname,
  Title,
};
