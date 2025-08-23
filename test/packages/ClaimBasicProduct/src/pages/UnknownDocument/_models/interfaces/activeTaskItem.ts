interface IntActiveTaskItem {
  item: any;
  id: string;
  policies: string;
  status: string;
  insuredName: string;
  type: number;
  insured?: any;

  caseNo: string;
  applicationList: any;
  applicationNo: any;
  active: boolean;
  handleActiveTaskItem?: any;
  handleApplicationList?: any;
  caseCategory: string;
}

export default IntActiveTaskItem;
