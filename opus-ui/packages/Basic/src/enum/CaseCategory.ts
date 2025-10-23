import JPCaseCategory from './CaseCategory/jp';
import HKCaseCategory from './CaseCategory/hk';
import THCaseCategory from './CaseCategory/th';
import PHCaseCategory from './CaseCategory/ph';
import KHCaseCategory from './CaseCategory/kh';
import MYCaseCategory from './CaseCategory/my';
import IDCaseCategory from './CaseCategory/id';
import VNCaseCategory from './CaseCategory/vn';

const CaseCategory = {
  ...JPCaseCategory,
  ...HKCaseCategory,
  ...THCaseCategory,
  ...PHCaseCategory,
  ...KHCaseCategory,
  ...MYCaseCategory,
  ...IDCaseCategory,
  ...VNCaseCategory,
};

export default CaseCategory;
