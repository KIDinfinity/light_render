import { LYDC, LYMA } from './Layout';

import Section, {
  SectionTitle,
  SectionDCAdd,
  SectionMAAdd,
  SectionBasic,
  localConfig,
} from './Sections';

import FieldsBasic from './Fields';

const Diagnosis = ({ children }: any) => {
  return { children };
};

Diagnosis.Section = Section;
Diagnosis.LYDC = LYDC;
Diagnosis.LYMA = LYMA;

Diagnosis.SectionDCAdd = SectionDCAdd;
Diagnosis.SectionMAAdd = SectionMAAdd;
Diagnosis.SectionBasic = SectionBasic;

export { SectionTitle, FieldsBasic, localConfig };

export default Diagnosis;
