import getApplicableByDisableCondidtions from 'process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions';

describe('test getApplicableByDisableCondidtions', () => {
  test('disableFieldsConditions is empty', () => {
    const fieldConfig = {
      field: 'b',
      fieldType: 'Dropdown',
      'field-props': {
        'x-layout': {
          lg: {
            order: 1,
            span: 3,
          },
        },
        label: {
          dictTypeCode: 'Label_BIZ_Claim',
          dictCode: 'b',
        },
        'x-dict': {
          dictTypeCode: 'gender',
        },
        visible: 'Y',
      },
    };
    const disableFieldsConditions = [];
    const condition = 'mw';
    const result = getApplicableByDisableCondidtions({
      fieldConfig,
      disableFieldsConditions,
      condition,
    });
    expect(result).toEqual({
      field: 'b',
      fieldType: 'Dropdown',
      'field-props': {
        'x-layout': {
          lg: {
            order: 1,
            span: 3,
          },
        },
        label: {
          dictTypeCode: 'Label_BIZ_Claim',
          dictCode: 'b',
        },
        'x-dict': {
          dictTypeCode: 'gender',
        },
        visible: 'Y',
      },
    });
  });
  test('match disable condition', () => {
    const fieldConfig = {
      section: 'personal',
      field: 'age',
      fieldType: 'Dropdown',
      'field-props': {
        'x-layout': {
          lg: {
            order: 1,
            span: 3,
          },
        },
        label: {
          dictTypeCode: 'Label_BIZ_Claim',
          dictCode: 'b',
        },
        'x-dict': {
          dictTypeCode: 'gender',
        },
        visible: 'Y',
      },
    };
    const disableFieldsConditions = [
      {
        atomCode: 'personal_age_mw_field_disable',
        applicable: 'N',
      },
    ];
    const condition = 'mw';
    const result = getApplicableByDisableCondidtions({
      fieldConfig,
      disableFieldsConditions,
      condition,
    });
    expect(result).toEqual({
      section: 'personal',
      field: 'age',
      fieldType: 'Dropdown',
      'field-props': {
        'x-layout': {
          lg: {
            order: 1,
            span: 3,
          },
        },
        label: {
          dictTypeCode: 'Label_BIZ_Claim',
          dictCode: 'b',
        },
        'x-dict': {
          dictTypeCode: 'gender',
        },
        visible: 'N',
      },
    });
  });
});
