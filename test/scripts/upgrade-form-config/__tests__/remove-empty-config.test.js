const { emptyConditionReg } =  require('../remove-empty-config');

describe('test reg', () => {
  test('test content matches', () => {
    const content = `export const fieldConfig = {
      section: 'PersonalInfo-Field',
      field: 'gender',
      fieldType: 'Dropdown',
      'field-props': {
        editable: 'Y',
        'editable-condition': {
          combine: '||',
          conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
        },
        label: {
          dictTypeCode: 'Label_BIZ_Individual',
          dictCode: 'Gender',
        },
        expand: 'Y',
        required: 'Y',
        visible: 'Y',
        'x-layout': {
          // 480px
          xs: {
            span: 4,
            offset: 0,
            pull: 0,
            order: 1,
          },
          // 576px
          sm: {
            span: 4,
            offset: 0,
            pull: 0,
            order: 1,
          },
          // 768px
          md: {
            span: 4,
            offset: 0,
            pull: 0,
            order: 1,
          },
          // 992px
          lg: {
            span: 4,
            offset: 0,
            pull: 0,
            order: 1,
          },
          // 1200px
          xl: {
            span: 4,
            offset: 0,
            pull: 0,
            order: 1,
          },
          // 1600px
          xxl: {
            span: 4,
            offset: 0,
            pull: 0,
            order: 1,
          },
        },
        'x-dict': {
          dictTypeCode: 'Dropdown_IND_Gender',
        },
      },
    };
    `
    const result = emptyConditionReg.test(content);

    expect(result).toBeTruthy();
  })
  test('replace content', () => {
    const content = `export const fieldConfig = {
      section: 'PersonalInfo-Field',
      field: 'gender',
      fieldType: 'Dropdown',
      'field-props': {
        editable: 'Y',
        'editable-condition': {
          combine: '||',
          conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
        },
        label: {
          dictTypeCode: 'Label_BIZ_Individual',
          dictCode: 'Gender',
        },
        expand: 'Y',
        required: 'Y',
        visible: 'Y',
        'x-layout': {
          // 480px
          xs: {
            span: 4,
            offset: 0,
            pull: 0,
            order: 1,
          },
          // 576px
          sm: {
            span: 4,
            offset: 0,
            pull: 0,
            order: 1,
          },
          // 768px
          md: {
            span: 4,
            offset: 0,
            pull: 0,
            order: 1,
          },
          // 992px
          lg: {
            span: 4,
            offset: 0,
            pull: 0,
            order: 1,
          },
          // 1200px
          xl: {
            span: 4,
            offset: 0,
            pull: 0,
            order: 1,
          },
          // 1600px
          xxl: {
            span: 4,
            offset: 0,
            pull: 0,
            order: 1,
          },
        },
        'x-dict': {
          dictTypeCode: 'Dropdown_IND_Gender',
        },
      },
    };
    `
    const result = content.replace(emptyConditionReg, '');
    console.log('result', result)
  })
})
