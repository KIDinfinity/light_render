import Section, {
  SectionTitle,
  SectionBasic,
  SectionExpandBasic,
  SectionPayable,
  localConfig,
} from './Sections';

import FieldsBasic from './Fields/Basic';
import FieldsPayable from './Fields/Payable';

const Therapies = ({ children }: any) => {
  return { children };
};

Therapies.Section = Section;
Therapies.SectionBasic = SectionBasic;
Therapies.SectionExpandBasic = SectionExpandBasic;
Therapies.SectionPayable = SectionPayable;

export { SectionTitle, FieldsBasic, FieldsPayable, SectionPayable, localConfig };

export default Therapies;
