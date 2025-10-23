import { formUtils } from 'basic/components/Form';

const getInvestigationResultConfirmationCategoryValue = (
  investigationResultConfirmationCategory: any
) => {
  const investigationResultConfirmationCategoryValue =
    formUtils.queryValue(investigationResultConfirmationCategory) || '';

  //兼容旧数据
  const config = {
    1: '01',
    2: '02',
    3: '03',
  };

  return (
    config?.[investigationResultConfirmationCategoryValue] ||
    investigationResultConfirmationCategoryValue
  );
};

export default getInvestigationResultConfirmationCategoryValue;
