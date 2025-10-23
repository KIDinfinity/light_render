export const fieldConfig = {
  section: 'Exclusion-Field',
  field: 'exclusionReasonCode',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'ExclusionReason',
    },
    expand: 'Y',
    editable: 'Y',
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'x-dict': {
      dictTypeCode: 'localExclusionCode',
      dictTypeName: 'longDesc',
    },
  },
};
