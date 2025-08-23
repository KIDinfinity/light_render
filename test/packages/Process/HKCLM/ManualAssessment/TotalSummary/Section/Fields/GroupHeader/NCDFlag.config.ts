
const localFieldConfig = {
    atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT003',
    caseCategory: 'HK_CLM_CTG001',
    activityCode: 'HK_CLM_ACT003',
    section: 'SummaryPayable.groupHeader',
    field: 'ncdFlag',
    'field-props': {
      visible: 'C',
      editable: 'Y',
      required: 'N',
      label: {
        dictTypeCode: 'Label_BIZ_Claim',
        dictCode: 'AffectNoClaimDiscount',
      },
      'x-layout': {
        // 480px
        xs: {
          span: 5,
          offset: 0,
          pull: 0,
          order: 1,
        },
        // 576px
        sm: {
          span: 5,
          offset: 0,
          pull: 0,
          order: 1,
        },
        // 768px
        md: {
          span: 5,
          offset: 0,
          pull: 0,
          order: 1,
        },
        // 992px
        lg: {
          span: 5,
          offset: 0,
          pull: 0,
          order: 1,
        },
        // 1200px
        xl: {
          span: 5,
          offset: 0,
          pull: 0,
          order: 1,
        },
        // 1600px
        xxl: {
          span: 5,
          offset: 0,
          pull: 0,
          order: 1,
        },
      },
      'x-rules': ['VLD_001099', 'VLD_001100'],
    },
  };
  
  export { localFieldConfig };
  