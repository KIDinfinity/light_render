export default function* (_: any, { select }: any) {
  const forms = yield select(({ formCommonController }: any) => formCommonController.forms);
  Object.keys(forms).forEach((key) => {
    if (key.includes('DistributionChannel-Field')) {
      forms[key].validateFields(['commissionSplitPercent'], { force: true });
    }
  });
}
