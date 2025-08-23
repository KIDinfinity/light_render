import lodash from 'lodash';

const companyCode5 = [
  'BP_AP_CTG03',
  'BP_VAN_CTG001',
  'BP_NB_CTG005',
  'BP_UW_CTG003',
  'NB_UW_CTG006',
  'NB_UW_CTG005',
  'BP_PAPER_CTG001',

  'BP_POS_CTG001',

  'BP_POS_CTG002',
  'BP_DC_CTG002',
];
const companyCode2 = [
  'NB_UW_CTG001',
  'BP_NB_CTG001',
  'BP_AP_CTG02',
  'BP_POS_CTG006',
  'BP_POS_CTG008',
  'BP_PAPER_CTG004',
];

export default ({ caseCategory }: any) => {
  const key = lodash.includes(companyCode5, caseCategory)
    ? '5'
    : lodash.includes(companyCode2, caseCategory)
    ? '2'
    : '';
  (window as any).companyCode = key;

  return key;
};
