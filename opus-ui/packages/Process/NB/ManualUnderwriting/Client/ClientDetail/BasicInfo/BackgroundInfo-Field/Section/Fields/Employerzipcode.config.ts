export const fieldConfig = {
  section: 'BackgroundInfo-Field',
  field: 'employerZipCode',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'AddressofEmployer',
    },
    expand: 'Y',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_CFG_PostalCode',
    },
  },
};
