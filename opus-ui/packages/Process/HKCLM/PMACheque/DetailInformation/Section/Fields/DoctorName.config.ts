const localFieldConfig = {
  atomGroupCode: 'HK_CR_CTG001.HK_CR_ACT001',
  caseCategory: 'HK_CR_CTG001',
  activityCode: 'HK_CR_ACT001',
  section: 'DetailInformation',
  field: 'doctorName',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'C',
    'required-condition': {
      combine: '&&',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'payeeName',
          },
          operator: '===',
          right: 'medicalProvider13',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'pmaCheque.doctorName',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    rules: ['VLD_000800']
  },
};

export { localFieldConfig };
