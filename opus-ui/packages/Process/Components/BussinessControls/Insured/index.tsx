import Section, { SectionTitle, SectionBasic, SectionSearchForm, localConfig } from './Sections';

import FieldsBasic from './Fields';
import FieldsForm from './Fields/Form';

const Insured = ({ children }: any) => {
  return { children };
};

Insured.Section = Section;
Insured.SectionBasic = SectionBasic;
Insured.SectionSearchForm = SectionSearchForm;

export { SectionTitle, FieldsBasic, FieldsForm, localConfig };

export default Insured;
