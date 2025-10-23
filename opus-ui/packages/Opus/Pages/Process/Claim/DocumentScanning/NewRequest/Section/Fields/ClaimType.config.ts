export const localFieldConfig = {
  section: 'NewRequest',
  field: 'claimType',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: ' Label_BIZ_Claim',
      dictCode: 'BusinessType',
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_ClaimType',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 586px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 868px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};
