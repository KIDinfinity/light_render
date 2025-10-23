export const fieldConfig = {
  section: 'PersonalInfo-Field',
  field: 'ctfId',
  fieldType: 'Text',
  'field-props': {
    editable: 'Y',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: '', field: 'ctfType' },
          operator: 'not empty',
          right: '',
        },
        {
          left: { domain: '', field: 'ctfId' },
          operator: 'not empty',
          right: '',
        },
        {
          left: { domain: '', field: 'ctfExpireDate' },
          operator: 'not empty',
          right: '',
        },
        {
          left: { domain: '', field: 'ctfPlace' },
          operator: 'not empty',
          right: '',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'IDNo',
    },
    expand: 'N',
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: '', field: 'ctfType' },
          operator: '!==',
          right: undefined,
        },
        {
          left: { domain: '', field: 'ctfType' },
          operator: '!==',
          right: null,
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 27,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 27,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 27,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 27,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 27,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 27,
      },
    },
  },
};
