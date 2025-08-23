export default {
  businessSystem: {},
  registrationId: '',
  dataSource: [],
  steps: [
    {
      title: 'Choose BusinessSystem',
      description: 'This is a descripttion',
    },
    {
      title: 'Choose DataSource',
      description: 'This is a descripttion',
    },
    {
      title: 'Choose Table',
      description: 'This is a descripttion',
    },
  ],
  currentStep: 0, // 当前流程
  pagination: {
    currentPage: 1,
    firstResult: 0,
    offset: 0,
    pageSize: 1,
    params: {},
    rows: [{}],
    sortName: '',
    sortOrder: '',
    startPage: 0,
    total: 0,
    totalPage: 0,
  },
};

