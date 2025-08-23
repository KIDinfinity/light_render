import addDefaultAction from '../../ButtonAction/loopService/addDefaultAction';

const taskDetail = {
  operationType: 'appealCreate',
  taskId: '111',
  processInstanceId: '222',
  businessNo: '333',
  activityKey: 'Key-444',
  caseCategory: 'BP_AP_CTG02',
  assignee: 'assignee-555',
};

const defaultConfig = {
  defaultConfig: 'defaultConfig',
};

describe('addDefaultAction', () => {
  test("test data don't contaipn dynamic data", () => {
    const serviceItem = {
      buttonParams: '{"operationType":"appealCreate","caseCategory":"BP_AP_CTG02"}',
    };
    const result = addDefaultAction({ serviceItem, taskDetail, defaultConfig });
    const { getDataForSubmit, ...config } = result;
    const data = getDataForSubmit();
    expect(data).toEqual({
      operationType: 'appealCreate',
      caseCategory: 'BP_AP_CTG02',
    });
    expect(config).toEqual({
      defaultConfig: 'defaultConfig',
    });
  });
  test('test data contain dynamic data,and the key of dynamic data is the same as value ', () => {
    const serviceItem = {
      buttonParams: '{"taskId":"$taskId","businessNo":"$businessNo","activityKey":"$activityKey"}',
    };
    const result = addDefaultAction({ serviceItem, taskDetail, defaultConfig });
    const { getDataForSubmit, ...config } = result;
    const data = getDataForSubmit();
    expect(data).toEqual({
      taskId: '111',
      businessNo: '333',
      activityKey: 'Key-444',
    });
    expect(config).toEqual({
      defaultConfig: 'defaultConfig',
    });
  });
  test('The test data contain dynamic data, and the key and value of dynamic data are different', () => {
    const serviceItem = {
      buttonParams: '{"caseNo":"$processInstanceId"}',
    };
    const result = addDefaultAction({ serviceItem, taskDetail, defaultConfig });
    const { getDataForSubmit, ...config } = result;
    const data = getDataForSubmit();
    expect(data).toEqual({
      caseNo: '222',
    });
    expect(config).toEqual({
      defaultConfig: 'defaultConfig',
    });
  });
  test('The test data contains a hierarchy', () => {
    const serviceItem = {
      buttonParams: '{"activityVariables":{"applicant":"$assignee"}}',
    };
    const result = addDefaultAction({ serviceItem, taskDetail, defaultConfig });
    const { getDataForSubmit, ...config } = result;
    const data = getDataForSubmit();
    expect(data).toEqual({
      activityVariables: {
        applicant: 'assignee-555',
      },
    });
    expect(config).toEqual({
      defaultConfig: 'defaultConfig',
    });
  });
  test('The test data contains the above scenarios', () => {
    const serviceItem = {
      buttonParams:
        '{"operationType":"appealCreate","taskId":"$taskId","caseNo":"$processInstanceId","businessNo":"$businessNo","activityKey":"$activityKey","caseCategory":"BP_AP_CTG02","activityVariables":{"applicant":"$assignee"}}',
    };
    const result = addDefaultAction({ serviceItem, taskDetail, defaultConfig });
    const { getDataForSubmit, ...config } = result;
    const data = getDataForSubmit();
    expect(data).toEqual({
      operationType: 'appealCreate',
      taskId: '111',
      caseNo: '222',
      businessNo: '333',
      activityKey: 'Key-444',
      caseCategory: 'BP_AP_CTG02',
      activityVariables: {
        applicant: 'assignee-555',
      },
    });
    expect(config).toEqual({
      defaultConfig: 'defaultConfig',
    });
  });
});
