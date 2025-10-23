export const fieldConfig = {
  section: 'CharityOrganization-Table',
  field: 'donationPercentage',
  fieldType: 'Dropdown',
  'field-props': {
    editable: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'Donation%',
    },
    expand: 'N',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'x-rules': ['VLD_000941'],
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_Percentage',
    },
  },
};
