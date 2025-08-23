import Section, { SectionTitle, SectionBasic, localConfig } from './Sections';
import FieldsBasic from './Fields';

const Claimant = ({ children }: any) => {
  return { children };
};

Claimant.Section = Section;
Claimant.SectionBasic = SectionBasic;

export { SectionTitle, FieldsBasic, localConfig };

export default Claimant;
