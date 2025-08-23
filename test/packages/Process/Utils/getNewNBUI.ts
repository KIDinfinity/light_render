export const judgeIsRefactorNB = ({ caseCategory, taskDefKey }: any) => {
  const MappingKey = {
    'BP_NB_CTG001.BP_NB_ACT004': true,
    'BP_NB_CTG005.BP_NB_ACT004': true,
    'VN_UW_CTG001.VN_UW_ACT001': true,
    'BP_NB_CTG002.BP_NB_ACT004': true,
    'BP_NB_CTG003.BP_NB_ACT004': true,
    'BP_AP_CTG02.BP_AP_ACT003': true,
    'BP_AP_CTG03.BP_AP_ACT003': true,
    'NB_UW_CTG001.NB_UW_ACT001': true,
    'NB_UW_CTG005.NB_UW_ACT002': true,
    'NB_UW_CTG006.NB_UW_ACT001': true,
    'BP_UW_CTG003.NB_UW_ACT001': true,
    'BP_AP_CTG02.BP_NB_ACT004': true,
    // 'BP_NB_CTG003.BP_NB_ACT008': true,
  };
  return !!MappingKey[`${caseCategory}.${taskDefKey}`]
}

/**
 * 获取是否用新的NBUI
 */
export default ({ caseCategory, taskDefKey }: any) => {
  const isNewBusinessHistory = window.location.href.includes('nb/history');
  const isEws = window.location.href.includes('nb/uw/ews');
  if (isNewBusinessHistory || isEws) {
    return true;
  }
  const href = window.location.href.includes('process');

  return !!href && judgeIsRefactorNB({ caseCategory, taskDefKey }) ? true : false;
};

interface Props {
  caseCategory: string;
  taskDefKey: string;
}

export const isOldNewBusinessUi = (props: Props): boolean => {
  const caseCategory = props?.caseCategory;
  const taskDefKey = props?.taskDefKey;

  const MappingKey = {
    'BP_NB_CTG001.BP_NB_ACT004': true,
    'BP_NB_CTG005.BP_NB_ACT004': true,
  };
  const href = window.location.href.includes('claim');

  return !!href && !!MappingKey[`${caseCategory}.${taskDefKey}`] ? true : false;
};
