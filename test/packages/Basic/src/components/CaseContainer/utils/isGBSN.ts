import CaseCategory from 'enum/CaseCategory';

interface IParams {
  caseCategory: typeof CaseCategory;
}
export default ({ caseCategory }: IParams) => {
  return [CaseCategory.BP_NB_CTG005, CaseCategory.BP_NB_CTG003].includes(caseCategory);
};
