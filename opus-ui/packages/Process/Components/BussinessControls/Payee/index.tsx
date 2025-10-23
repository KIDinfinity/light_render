import Section, { SectionTitle, SectionBasic, localConfig } from './Sections';
import FieldsBasic from './Fields';

const Payee = ({ children }: any) => {
  return { children };
};

Payee.Section = Section;
Payee.SectionBasic = SectionBasic;

export { SectionTitle, FieldsBasic, localConfig };

export default Payee;
