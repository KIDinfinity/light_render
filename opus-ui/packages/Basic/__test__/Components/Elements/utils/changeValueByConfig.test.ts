import changeValueByConfig from 'basic/components/Elements/utils/changeValueByConfig';

describe('changeValueByConfig', () => {
  test('reverse is false operation is time', () => {
    const result = changeValueByConfig({
      sectionConfig: [
        {
          id: 'b8f755c4-7ebb-4bd4-bbb2-81b8fee53069',
          case_category: 'BP_NB_CTG001',
          activity_code: 'BP_NB_ACT004',
          section_id: 'Loading-Field',
          field: 'extraMortality',
          fieldType: 'Dropdown',
          changeOperation: '*',
          changeParam: 100,
          changeResultLimitMin: 0,
        },
      ],
      dataItem: {
        extraMortality: 25,
      },
      reverse: false,
    });

    expect(result).toEqual({
      extraMortality: 2500,
    });
  });

  test('reverse is false operation is time value is object', () => {
    const result = changeValueByConfig({
      sectionConfig: [
        {
          id: 'b8f755c4-7ebb-4bd4-bbb2-81b8fee53069',
          case_category: 'BP_NB_CTG001',
          activity_code: 'BP_NB_ACT004',
          section_id: 'Loading-Field',
          field: 'extraMortality',
          fieldType: 'Dropdown',
          changeOperation: '*',
          changeParam: 100,
          changeResultLimitMin: 0,
        },
      ],
      dataItem: {
        extraMortality: {
          value: 25,
        },
      },
      reverse: false,
    });

    expect(result).toEqual({
      extraMortality: {
        value: 2500,
      },
    });
  });

  test('reverse is true operation is time', () => {
    const result = changeValueByConfig({
      sectionConfig: [
        {
          id: 'b8f755c4-7ebb-4bd4-bbb2-81b8fee53069',
          case_category: 'BP_NB_CTG001',
          activity_code: 'BP_NB_ACT004',
          section_id: 'Loading-Field',
          field: 'extraMortality',
          changeOperation: '*',
          changeParam: 5,
          changeResultLimitMin: 0,
        },
      ],
      dataItem: {
        extraMortality: 25,
      },
      reverse: true,
    });

    expect(result).toEqual({
      extraMortality: 5,
    });
  });

  test('reverse is false operation is add', () => {
    const result = changeValueByConfig({
      sectionConfig: [
        {
          id: 'b8f755c4-7ebb-4bd4-bbb2-81b8fee53069',
          case_category: 'BP_NB_CTG001',
          activity_code: 'BP_NB_ACT004',
          section_id: 'Loading-Field',
          field: 'extraMortality',
          changeOperation: '+',
          changeParam: 100,
          changeResultLimitMin: 0,
        },
      ],
      dataItem: {
        extraMortality: 25,
      },
      reverse: false,
    });

    expect(result).toEqual({
      extraMortality: 125,
    });
  });

  test('reverse is true operation is add', () => {
    const result = changeValueByConfig({
      sectionConfig: [
        {
          id: 'b8f755c4-7ebb-4bd4-bbb2-81b8fee53069',
          case_category: 'BP_NB_CTG001',
          activity_code: 'BP_NB_ACT004',
          section_id: 'Loading-Field',
          field: 'extraMortality',
          changeOperation: '+',
          changeParam: 100,
          changeResultLimitMin: 0,
        },
      ],
      dataItem: {
        extraMortality: 125,
      },
      reverse: true,
    });

    expect(result).toEqual({
      extraMortality: 25,
    });
  });

  test('reverse is false operation is minus', () => {
    const result = changeValueByConfig({
      sectionConfig: [
        {
          id: 'b8f755c4-7ebb-4bd4-bbb2-81b8fee53069',
          case_category: 'BP_NB_CTG001',
          activity_code: 'BP_NB_ACT004',
          section_id: 'Loading-Field',
          field: 'extraMortality',
          changeOperation: '-',
          changeParam: 100,
          changeResultLimitMin: 0,
        },
      ],
      dataItem: {
        extraMortality: 125,
      },
      reverse: false,
    });

    expect(result).toEqual({
      extraMortality: 25,
    });
  });

  test('reverse is true operation is minus', () => {
    const result = changeValueByConfig({
      sectionConfig: [
        {
          id: 'b8f755c4-7ebb-4bd4-bbb2-81b8fee53069',
          case_category: 'BP_NB_CTG001',
          activity_code: 'BP_NB_ACT004',
          section_id: 'Loading-Field',
          field: 'extraMortality',
          changeOperation: '-',
          changeParam: 100,
          changeResultLimitMin: 0,
        },
      ],
      dataItem: {
        extraMortality: 125,
      },
      reverse: true,
    });

    expect(result).toEqual({
      extraMortality: 225,
    });
  });

  test('reverse is false operation is divided', () => {
    const result = changeValueByConfig({
      sectionConfig: [
        {
          id: 'b8f755c4-7ebb-4bd4-bbb2-81b8fee53069',
          case_category: 'BP_NB_CTG001',
          activity_code: 'BP_NB_ACT004',
          section_id: 'Loading-Field',
          field: 'extraMortality',
          changeOperation: '/',
          changeParam: 5,
          changeResultLimitMin: 0,
        },
      ],
      dataItem: {
        extraMortality: 125,
      },
      reverse: false,
    });

    expect(result).toEqual({
      extraMortality: 25,
    });
  });

  test('reverse is true operation is divided', () => {
    const result = changeValueByConfig({
      sectionConfig: [
        {
          id: 'b8f755c4-7ebb-4bd4-bbb2-81b8fee53069',
          case_category: 'BP_NB_CTG001',
          activity_code: 'BP_NB_ACT004',
          section_id: 'Loading-Field',
          field: 'extraMortality',
          changeOperation: '/',
          changeParam: 5,
          changeResultLimitMin: 0,
        },
      ],
      dataItem: {
        extraMortality: 20,
      },
      reverse: true,
    });

    expect(result).toEqual({
      extraMortality: 100,
    });
  });

  test('reverse is false operation is minus & test  changeResultLimitMin', () => {
    const result = changeValueByConfig({
      sectionConfig: [
        {
          id: 'b8f755c4-7ebb-4bd4-bbb2-81b8fee53069',
          case_category: 'BP_NB_CTG001',
          activity_code: 'BP_NB_ACT004',
          section_id: 'Loading-Field',
          field: 'extraMortality',
          changeOperation: '-',
          changeParam: 50,
          changeResultLimitMin: 1,
        },
      ],
      dataItem: {
        extraMortality: 25,
      },
      reverse: false,
    });

    expect(result).toEqual({
      extraMortality: 1,
    });
  });
  test('reverse is false operation is add & value is String', () => {
    const result = changeValueByConfig({
      sectionConfig: [
        {
          id: 'b8f755c4-7ebb-4bd4-bbb2-81b8fee53069',
          case_category: 'BP_NB_CTG001',
          activity_code: 'BP_NB_ACT004',
          section_id: 'Loading-Field',
          field: 'extraMortality',
          changeOperation: '+',
          changeParam: 100,
          changeResultLimitMin: 0,
        },
      ],
      dataItem: {
        extraMortality: '25',
      },
      reverse: false,
    });

    expect(result).toEqual({
      extraMortality: 125,
    });
  });
});
