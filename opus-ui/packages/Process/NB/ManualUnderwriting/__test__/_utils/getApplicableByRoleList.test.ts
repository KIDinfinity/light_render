import getApplicableByRoleList from 'process/NB/ManualUnderwriting/utils/getApplicableByRoleList';

describe('test getApplicableByRoleList', () => {
  test('has no role list', () => {
    const roleList = [];
    const customerType = 'C';
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
    const atomConfig = [];
    const result = getApplicableByRoleList({
      roleList,
      customerType,
      fieldConfig,
      atomConfig,
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
        visible: 'N',
      },
    });
  });
  test('all atom config applicable is N', () => {
    const roleList = [
      {
        customerRole: 'CUS001',
      },
      {
        customerRole: 'CUS002',
      },
    ];
    const customerType = 'C';
    const fieldConfig = {
      activityCode: 'BP_NB_ACT004',
      caseCategory: 'BP_NB_CTG001',
      field: 'age',
      fieldType: 'Dropdown',
      section: 'Loading',
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
    const atomConfig = [
      {
        atomCode: 'BP_NB_CTG001_BP_NB_ACT004_CUS001_C_Loading_fields_age',
        applicable: 'N',
      },
      {
        atomCode: 'BP_NB_CTG001_BP_NB_ACT004_CUS002_C_Loading_fields_age',
        applicable: 'N',
      },
    ];
    const result = getApplicableByRoleList({
      roleList,
      customerType,
      fieldConfig,
      atomConfig,
    });
    expect(result).toEqual({
      activityCode: 'BP_NB_ACT004',
      caseCategory: 'BP_NB_CTG001',
      field: 'age',
      fieldType: 'Dropdown',
      section: 'Loading',
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
  test('some role atom config applicable is Y', () => {
    const roleList = [
      {
        customerRole: 'CUS001',
      },
      {
        customerRole: 'CUS002',
      },
    ];
    const customerType = 'C';
    const fieldConfig = {
      activityCode: 'BP_NB_ACT004',
      caseCategory: 'BP_NB_CTG001',
      field: 'age',
      fieldType: 'Dropdown',
      section: 'Loading',
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
    const atomConfig = [
      {
        atomCode: 'BP_NB_CTG001_BP_NB_ACT004_CUS001_C_Loading_fields_age',
        applicable: 'N',
      },
      {
        atomCode: 'BP_NB_CTG001_BP_NB_ACT004_CUS002_C_Loading_fields_age',
        applicable: 'Y',
      },
    ];
    const result = getApplicableByRoleList({
      roleList,
      customerType,
      fieldConfig,
      atomConfig,
    });
    expect(result).toEqual({
      activityCode: 'BP_NB_ACT004',
      caseCategory: 'BP_NB_CTG001',
      field: 'age',
      fieldType: 'Dropdown',
      section: 'Loading',
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
});
