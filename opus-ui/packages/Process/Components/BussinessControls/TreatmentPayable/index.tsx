import Section, { SectionTitle, SectionBasic, localConfig } from './Sections';

import FieldsBasic from './Fields';

const TreatmentPayable = ({ children }: any) => {
  return { children };
};

TreatmentPayable.Section = Section;
TreatmentPayable.SectionBasic = SectionBasic;

export { SectionTitle, FieldsBasic, localConfig };

export default TreatmentPayable;
