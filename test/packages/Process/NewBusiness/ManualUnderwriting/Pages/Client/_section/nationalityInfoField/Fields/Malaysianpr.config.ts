export const fieldConfig = {
  section: 'NationalityInfo-Field',
  field: 'malaysianPR',
  fieldType: 'Dropdown',
  'field-props': {
     editable: 'C',
    'editable-condition': {
      combine: '&&',
      conditions: [{ left: { domain: 'field', field: 'nationality' }, operator: '!==', right: 'MYS' }],
    },
     label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'MalaysianPR',
 },
     expand: 'N',
    required: 'Y',
     visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
       span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
         span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_YN',
    },
  },
};
