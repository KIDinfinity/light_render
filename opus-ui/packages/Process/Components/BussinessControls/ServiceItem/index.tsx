import { LYDC, LYMA } from './Layout';
import {
  ConfigServiceItem,
  ConfigUnit,
  ConfigVatExpense,
  ConfigExpense,
  ConfigOtherInsurerPaidAmount,
  ConfigSurgeryClass,
} from './_hooks';

import Section, {
  SectionColumns,
  SectionTitle,
  SectionAdd,
  SectionBasic,
  localConfig,
} from './Sections';

import FieldsBasic from './Fields';

const ServiceItem = ({ children }: any) => {
  return { children };
};

ServiceItem.Section = Section;

ServiceItem.LYDC = LYDC;
ServiceItem.LYMA = LYMA;

ServiceItem.SectionAdd = SectionAdd;
ServiceItem.SectionBasic = SectionBasic;

ServiceItem.ConfigServiceItem = ConfigServiceItem;
ServiceItem.ConfigUnit = ConfigUnit;
ServiceItem.ConfigVatExpense = ConfigVatExpense;
ServiceItem.ConfigExpense = ConfigExpense;
ServiceItem.ConfigOtherInsurerPaidAmount = ConfigOtherInsurerPaidAmount;
ServiceItem.ConfigSurgeryClass = ConfigSurgeryClass;

export { SectionColumns, SectionTitle, FieldsBasic, localConfig };

export default ServiceItem;
