import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';

describe('getSortModuleArr', () => {
  test('sort', () => {
    const configs = {
      envoyTo: {
        visible: true,
        editable: true,
        sort: 1,
      },
      freeField: {
        visible: true,
        editable: true,
        required: false,
        custom: {
          type: 'input',
          labelTypeCode: 'Label_COM_Envoy',
          labelDictCode: 'remark',
          name: 'remark',
          dataPath: 'remark',
        },
        sort: 2,
      },
      subcase: {
        visible: true,
        sort: 3,
      },
      switch: {
        visible: true,
        editable: true,
      },
    };

    const result = getSortModuleArr(configs);

    expect(result).toEqual([
      {
        configRequired: false,
        editable: true,
        moduleName: 'envoyTo',
        required: false,
        dropDownList: [],
      },
      {
        editable: true,
        required: false,
        configRequired: true,
        custom: {
          type: 'input',
          labelTypeCode: 'Label_COM_Envoy',
          labelDictCode: 'remark',
          name: 'remark',
          dataPath: 'remark',
        },
        moduleName: 'freeField',
        dropDownList: [],
      },
      {
        moduleName: 'subcase',
        required: false,
        dropDownList: [],
        editable: true,
        configRequired: false,
      },
    ]);
  });

  test('filter missing sort ', () => {
    const configs = {
      switch: {
        visible: true,
        editable: true,
      },
    };

    const result = getSortModuleArr(configs);

    expect(result).toEqual([]);
  });

  test('filter visible not true ', () => {
    const configs = {
      subcase: {
        visible: false,
        sort: 3,
      },
    };

    const result = getSortModuleArr(configs);

    expect(result).toEqual([]);
  });

  test('match freeField type', () => {
    const configs = {
      xx: {
        visible: true,
        editable: true,
        required: false,
        custom: {
          type: 'input',
          labelTypeCode: 'Label_COM_Envoy',
          labelDictCode: 'remark',
          name: 'remark',
          dataPath: 'remark',
        },
        sort: 2,
      },
    };

    const result = getSortModuleArr(configs);
    expect(result).toEqual([
      {
        editable: true,
        required: false,
        configRequired: true,
        custom: {
          type: 'input',
          labelTypeCode: 'Label_COM_Envoy',
          labelDictCode: 'remark',
          name: 'remark',
          dataPath: 'remark',
        },
        dropDownList: [],
        moduleName: 'freeField',
      },
    ]);
  });
});
