import {
  LTAdd,
  LTDPEntrance,
  LTMAEntrance,
  LTMainBenefitItem,
  LTICUItem,
  LTBasicItem,
} from './Layout';

import Section, {
  SectionTitle,
  SectionAdd,
  SectionICU,
  SectionBasic,
  SectionMainBenefit,
  localConfig,
} from './Sections';
import FieldsBasic from './Fields';

const Procedure = ({ children }: any) => {
  return { children };
};

Procedure.Section = Section;

Procedure.LTAdd = LTAdd;
Procedure.LTDPEntrance = LTDPEntrance;
Procedure.LTMAEntrance = LTMAEntrance;
Procedure.LTMainBenefitItem = LTMainBenefitItem;
Procedure.LTICUItem = LTICUItem;
Procedure.LTBasicItem = LTBasicItem;

Procedure.SectionAdd = SectionAdd;
Procedure.SectionICU = SectionICU;
Procedure.SectionBasic = SectionBasic;
Procedure.SectionMainBenefit = SectionMainBenefit;

export { SectionTitle, FieldsBasic, localConfig };

export default Procedure;
