export const fieldConfig = {
  section: 'PlanInfo-Field',
  field: 'beneficialOwnerHasUsaFlag',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'HaveUSBeneficalOwner',
    },
    expand: 'Y',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        { left: { domain: '', field: 'beneficialOwnerFlag' }, operator: '===', right: 'Y' },
      ],
    },
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_YN',
    },
  },
};
