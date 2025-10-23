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

const Treatment = ({ children }: any) => {
  return { children };
};

Treatment.Section = Section;

Treatment.LYDC = LYDC;
Treatment.LYMA = LYMA;

Treatment.SectionAdd = SectionAdd;
Treatment.SectionBasic = SectionBasic;
Treatment.SectionCheck = SectionCheck;
Treatment.SectionHeader = SectionHeader;

export { SectionTitle, FieldsAdd, FieldsBasic, FieldsCheck, FieldsHeader, localConfig };

export default Treatment;
