// 根据字典的code保存
const linkTos = {
  POLICY: 'policy',
  INSURED: 'insured',
  TASK: 'task',
  CASE: 'case',
};
const memoCatgs = {
  REMARK: 'remark',
  ASSESSMENT: 'assessmentNote',
  APPROVAL: 'approvalMessage',
  REJECT: 'reject',
};
const submitType = {
  REJECT: 'reject',
  APPROVAL: 'approval',
  ASSESSMENT: 'assessmentNote',
  SUBMIT: 'submit',
};
const validateType = {
  VALIDATE: 'validate',
  SUBMIT: 'submit',
};

const submissionChannel = {
  A: 'Agency',
  C: 'Counter',
  E: 'E-Claim',
  W: 'Web Portal',
  T: 'TPA',
  M: 'Manual Create',
  Branch: 'Branch',
  Email: 'Email',
  TAPP: 'TAPP',
};

const pendingTo = {
  Agent: {
    name: 'Agent',
    param: 'AGT',
  },
  Underwriter: {
    name: 'Underwriter',
    param: 'UW',
  },
  Claimant: {
    name: 'Claimant',
    param: '',
  },
  AssessmentTeamLeader: {
    name: 'Assessment Team Leader',
    param: 'AssessmentTeamLeader',
  },
};

const configurationKey = 'venus-ui_configuration';

const colorsPond = [
  'rgba(48, 77, 80, 1)',
  'rgba(99, 177, 188, 1)',
  'rgba(0, 98, 105, 1)',
  'rgba(236, 236, 236, 1)',
  'rgba(232, 119, 34, 1)',
  'rgba(110, 206, 178, 1)',
  'rgba(255, 201, 68, 1)',
  'rgba(0, 151, 169, 1)',
  // 'var(--claim-card-claimpayablelistitem-bg-color)',
];

const dashboardPageSize = 8;

export {
  linkTos,
  memoCatgs,
  submitType,
  validateType,
  submissionChannel,
  pendingTo,
  colorsPond,
  configurationKey,
  dashboardPageSize,
};
