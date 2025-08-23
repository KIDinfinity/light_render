import Section, { SectionTitle, SectionBasic, localConfig } from './Sections';
import FieldsBasic from './Fields';

const ServiceAgent = ({ children }: any) => {
  return { children };
};

ServiceAgent.Section = Section;
ServiceAgent.SectionBasic = SectionBasic;

export { SectionTitle, FieldsBasic, localConfig };

export default ServiceAgent;
