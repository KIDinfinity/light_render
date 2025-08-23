import { LYDC, LYMA } from './Layout';
import Section, {
  SectionTitle,
  SectionAdd,
  SectionBasic,
  SectionCheck,
  SectionHeader,
  localConfig,
} from './Sections';
import { FieldsAdd, FieldsBasic, FieldsCheck, FieldsHeader } from './Fields';

const Incident = ({ children }: any) => {
  return { children };
};

Incident.Section = Section;
Incident.SectionAdd = SectionAdd;
Incident.SectionBasic = SectionBasic;
Incident.SectionCheck = SectionCheck;
Incident.SectionHeader = SectionHeader;

Incident.LYDC = LYDC;
Incident.LYMA = LYMA;

export { SectionTitle, FieldsAdd, FieldsBasic, FieldsCheck, FieldsHeader, localConfig };

export default Incident;
