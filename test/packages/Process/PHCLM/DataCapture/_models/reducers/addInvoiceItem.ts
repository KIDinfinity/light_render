import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { filterInvoiceList, getInvoiceNo } from 'claim/pages/utils/handleInvoiceData';
import moment from 'moment';
import { tenant } from '@/components/Tenant';
import { INVOICEITEM } from '@/utils/claimConstant';

const addInvoiceItem = (state: any, action: any) => {
  const { treatmentId, invoiceId, claimNo, changedFields } = action.payload;

  const nextState = produce(state, (draftState) => {
    const { treatmentListMap } = draftState.claimEntities;
    if (!draftState.claimEntities.treatmentListMap[treatmentId].invoiceList) {
      draftState.claimEntities.treatmentListMap[treatmentId].invoiceList = [];
    }
    const invoiceList = treatmentListMap?.[treatmentId]?.invoiceList;

    let invoiceIndex = 1;
    if (lodash.isArray(invoiceList)) {
      invoiceIndex = invoiceList.length + 1;
    }

    const addItem = {
      ...INVOICEITEM,
      claimNo,
      id: invoiceId,
      serviceItemList: [],
      treatmentId,
      exchangeDate: moment().format(),
      invoiceCurrency: tenant.currency(),
      invoiceIndex,
    };

    draftState.claimEntities.treatmentListMap[treatmentId].invoiceList = [
      ...draftState.claimEntities.treatmentListMap[treatmentId].invoiceList,
      addItem.id,
    ];
    draftState.claimEntities.invoiceListMap[addItem.id] = {
      ...addItem,
      invoiceDate: changedFields.invoiceDate,
    };

    if (tenant.isHK()) {
      lodash.map(treatmentListMap, (treatment: any) => {
        const invoiceListMapData = formUtils.cleanValidateData(
          draftState.claimEntities.invoiceListMap
        );

        const newInvoiceList = filterInvoiceList(
          invoiceListMapData,
          formUtils.queryValue(changedFields?.invoiceDate)
        );
        lodash.map(newInvoiceList, (item: any, key) => {
          const invoiceNumber = key + 1;
          draftState.claimEntities.invoiceListMap[item.id].invoiceNo = getInvoiceNo(
            invoiceNumber,
            item.invoiceDate
          );
        });
      });
    }
  });

  return { ...nextState };
};

export default addInvoiceItem;
