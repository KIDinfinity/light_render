import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* getDataForSubmit(_: any, { select }: any) {
  const getTask = yield select((state: any) => state.processTask.getTask);
  const { taskId, processInstanceId } = getTask;
  const { basicInforData, invoiceInforData } = yield select((state: any) => ({
    basicInforData: state.IdentifyHospitalBatchController.claimProcessData.basicInforData,
    invoiceInforData: state.IdentifyHospitalBatchController.claimProcessData.invoiceInforData,
  }));
  const dataForSubmit = {
    processInstanceId,
    taskId,
    claimHospitalBillingVO: {
      ...formUtils.cleanValidateData(basicInforData),
      claimHospitalBillingDetails: lodash.map(invoiceInforData, (item: any) =>
        formUtils.cleanValidateData({
          ...item,
          status: formUtils.queryValue(item.status),
          identityNo: formUtils.queryValue(item.identityNo),
          firstName: formUtils.queryValue(item.firstName),
          surname: formUtils.queryValue(item.lastName),
          lastName: formUtils.queryValue(item.lastName),
        })
      ),
    },
  };
  return dataForSubmit;
}
