import Section, { SectionTitle, SectionBasic, localConfig } from './Sections';

import FieldsBasic from './Fields';

const ServiceItemPayable = ({ children }: any) => {
  return { children };
};

ServiceItemPayable.Section = Section;
ServiceItemPayable.SectionBasic = SectionBasic;

export { SectionTitle, FieldsBasic, localConfig };

export default ServiceItemPayable;
