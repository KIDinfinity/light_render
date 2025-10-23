import lodash from 'lodash';

enum PrintDestinationSelected {
  MS = 'manualStatement',
  RDA = 'returnToAgent',
  RDC = 'returnToClient',
}

export default ({ payeeItem, Label_CLM_printingDestination }: any) => {
  const printDestinationSelectedSet = new Set();
  lodash.forEach(Label_CLM_printingDestination, (item: any) => {
    if (lodash.get(payeeItem, PrintDestinationSelected[item.dictCode]) === 'Y') {
      printDestinationSelectedSet.add(item.dictCode);
    }
  });
  return Array.from(printDestinationSelectedSet) || [];
};
