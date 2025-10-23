export default {
  processData: {
    // 不同doc选择不同case
    udDocCaseRelationList:[],
    // 最终被选中的case详情
    udSelectedCaseList:[],
    // doc的列表
    unknownDocList:[]
  },
  // 当前链接的doc和case，submit的时候需要转化插入
  attachList: [],
  searchParams: {
    insuredNames: '', // 被保人
    policies: '', // 保单号，多个逗号隔开
    claimNos: '',
    processInstanceId: '',
  },
  searchCaseList: [],
};
