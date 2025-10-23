/**
 * 关于case的可查询字段的接口字段，数据库字段以及配置数据中fileName字段值的mapping关系
 *
 * 接口字段：即高级查询的case查询接口返回的数据字段
 * 数据库字段：即接口字段对应的数据库表中对应的字段
 * 配置数据fileName字段值：即接口api/navigator/configuration/listAllConfigurablePageInfo返回来的数据中fileName的值
 */
const caseBE2DataBase = {
  // businessNo: 'business_no',
  claimNo: 'inquiryClaimNo',
  processInstanceId: 'procInstId',
  caseCategory: 'caseCategory',
  activityKey: 'activityKey',
  policyNo: 'policyNo',
  insuredName: 'insuredName',
  submissionDate: 'submissionDate',
};

const caseDataBase2BE = {
  inquiryClaimNo: 'claimNo',
  procInstId: 'processInstanceId',
  caseCategory: 'caseCategory',
  activityKey: 'activityKey',
  policyNo: 'policyNo',
  insuredName: 'insuredName',
  submissionDate: 'submissionDate',
};

const caseFieldName2DataBase = {
  'Claim No': 'business_no',
  'Case No': 'proc_inst_id',
  'Case Category': 'case_category',
  'Current Activity': 'activity_key',
  'Policy No': 'policyNo',
  'Insured Name': 'insured_sort',
  'Submission Date': 'submission_date',
};

/**
 * 关于task的可查询字段的接口字段，数据库字段以及配置数据中fileName字段值的mapping关系
 */
const taskBE2DataBase = {
  claimNo: 'inquiryClaimNo',
  processInstanceId: 'procInstId',
  caseCategory: 'caseCategory',
  activityKey: 'activityKey',
  taskStatus: 'taskStatus',
  assignee: 'assignee',
  dueDate: 'caseDueDate',
  remainingTime: 'remaining_time',
  policyNo: 'policyNo',
  insuredName: 'insuredName',
  eligibilityCheckDate: 'eligibilityCheckDate',
  firstFormReceiveDate: 'firstFormReceiveDate',
  startTime: 'startTime',
  endTime: 'endTime',
};

const taskDataBase2BE = {
  inquiryClaimNo: 'claimNo',
  procInstId: 'processInstanceId',
  caseCategory: 'caseCategory',
  activityKey: 'activityKey',
  taskStatus: 'taskStatus',
  assignee: 'assignee',
  caseDueDate: 'dueDate',
  remaining_time: 'remainingTime',
  policyNo: 'policyNo',
  insuredName: 'insuredName',
  eligibilityCheckDate: 'eligibilityCheckDate',
  firstFormReceiveDate: 'firstFormReceiveDate',
  startTime: 'startTime',
  endTime: 'endTime',
};

const taskFieldName2DataBase = {
  'Claim No': 'business_no',
  'Case No': 'proc_inst_id',
  'Case Category': 'caseCategory',
  Activity: 'activityKey',
  Status: 'taskStatus',
  Assignee: 'assignee',
  'Due Date': 'caseDueDate',
  'Remaining Time': 'remainingTime',
  'Policy No': 'policyNo',
  'Insured Name': 'insured',
  'Date Of Eligibility Check': 'eligibilityCheckDate',
  'Arrival Date': 'firstFormReceiveDate',
  'Creation Time': 'startTime',
  'Completed Time': 'endTime',
};

/**
 * 关于user的可查询字段的接口字段，数据库字段以及配置数据中fileName字段值的mapping关系
 */
const userBE2DataBase = {
  userId: 'user_id',
  userName: 'user_name',
  status: 'status',
  title: 'title',
  employmentDate: 'employment_date',
  organizationCode: 'organization_code',
  directSupervisor: 'direct_supervisor',
};

const userDataBase2BE = {
  user_id: 'userId',
  user_name: 'userName',
  status: 'status',
  title: 'title',
  employment_date: 'employmentDate',
  organization_code: 'organizationCode',
  direct_supervisor: 'directSupervisor',
};

const userFieldName2DataBase = {
  'User ID': 'user_id',
  'User Name': 'user_name',
  Status: 'status',
  Title: 'title',
  'Employment Date': 'employment_date',
  Organization: 'organization_code',
  'Report To': 'direct_supervisor',
};

export default {
  case: {
    BE2DataBase: caseBE2DataBase,
    DataBase2BE: caseDataBase2BE,
    FieldName2DataBase: caseFieldName2DataBase,
  },
  task: {
    BE2DataBase: taskBE2DataBase,
    DataBase2BE: taskDataBase2BE,
    FieldName2DataBase: taskFieldName2DataBase,
  },
  user: {
    BE2DataBase: userBE2DataBase,
    DataBase2BE: userDataBase2BE,
    FieldName2DataBase: userFieldName2DataBase,
  },
};
