import { produce } from 'immer';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { Status } from '../../Enum';

const addInvoiceItem = (state: any, { payload: {} }: any) => {
  const nextState = produce(state, (draftState: any) => {
    const basicInforData = formUtils.cleanValidateData(
      lodash.get(draftState.claimProcessData, `basicInforData`)
    );
    const {
      totalNoOfInvoice,
      coverPageNo,
      hospitalName,
      scanDate,
      medicalProvider,
      hospitalBatchClaimNo,
    } = basicInforData;
    let invoiceInforList = lodash.get(draftState.claimProcessData, `invoiceInforData`, []);
    if (!lodash.isArray(invoiceInforList)) {
      invoiceInforList = [];
    }
    const invoiceInforLength = lodash.size(invoiceInforList);
    for (let i = invoiceInforLength, len = totalNoOfInvoice; i < len; i += 1) {
      invoiceInforList.push({
        ...draftState.claimProcessData.invoiceItem,
        key: i,
        status: Status.Scanned,
        no: i + 1,
        coverPageNo,
        hospitalName,
        scanDate,
        medicalProvider,
        hospitalBatchClaimNo,
        submissionId: uuidv4(),
      });
    }
    lodash.set(draftState.claimProcessData, `invoiceInforData`, invoiceInforList);
  });
  return { ...nextState };
};

export default addInvoiceItem;
