export const fieldConfig = {
  section: 'UWDecision-Table',
  field: 'indemnifyPeriod',
  fieldType: 'Text',
  'field-props': {
    editable: 'C',
    'editable-condition': {
      combine: '&&',
      conditions: [
        { left: { domain: 'field', field: 'policyTermEditInd' }, operator: '!==', right: 'N' },
        { left: { domain: '', field: 'indemnifyAgePeriod' }, operator: 'empty', right: '' },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PolicyTerm',
    },
    expand: 'N',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
    'x-dict': {
      dictTypeCode: '',
    },
  },
};
