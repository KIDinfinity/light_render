export const fieldConfig = {
  section: 'PolicyReplacement- Field',
  field: 'extensionToExistingProduct',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'extensionToExistingProduct',
    },
    expand: 'N',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: '', field: 'replaceInforce' },
          operator: '===',
          right: 'Y',
        },
      ],
    },
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_YN',
    },
  },
};
