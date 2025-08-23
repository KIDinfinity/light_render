import lodash from 'lodash';
import saveRemark from './saveRemark';

const changeData = (state: any, { payload }: any) => {
  const { key, value, idx, isRemark = false, changedFields } = payload;
  let newState = lodash.cloneDeep(state);
  if (isRemark) {
    newState = saveRemark(newState, {
      type: 'saveRemark',
      payload: {
        idx,
        value,
        changedFields,
      },
    });
  } else {
    lodash.set(newState, key, value);
  }
  const { invoiceInforData, invoiceInforSelRows } = lodash.get(newState, 'claimProcessData');
  const newInvoiceInforSelRows = lodash.cloneDeep(invoiceInforSelRows);
  lodash.forEach(newInvoiceInforSelRows, (item: any, i: number) => {
    if (item.key === invoiceInforData[idx].key) {
      newInvoiceInforSelRows[i] = invoiceInforData[idx];
    }
  });
  // 如果修改的是之前没有选中的数据，一旦修改，默认选中
  if (!lodash.some(newInvoiceInforSelRows, (item: any) => item.key === invoiceInforData[idx].key)) {
    newInvoiceInforSelRows.push(invoiceInforData[idx]);
  }
  lodash.set(newState, 'claimProcessData.invoiceInforSelRows', newInvoiceInforSelRows);
  return {
    ...newState,
  };
};

export default changeData;
