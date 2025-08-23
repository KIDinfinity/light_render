import { LYDC, LYMA } from './Layout';

import Section, {
  SectionColumns,
  SectionTitle,
  SectionAdd,
  SectionBasic,
  localConfig,
} from './Sections';
import { FieldsBasic, FieldsHeader } from './Fields';

const Invoice = ({ children }: any) => {
  return { children };
};

Invoice.Section = Section;
Invoice.LYDC = LYDC;
Invoice.LYMA = LYMA;

Invoice.SectionAdd = SectionAdd;
Invoice.SectionBasic = SectionBasic;

export { SectionColumns, SectionTitle, FieldsBasic, FieldsHeader, localConfig };

export default Invoice;
