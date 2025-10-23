import { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { Validator } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import { NamespaceType } from 'process/Components/BussinessControls';

interface IProps {
  namespaceType: string;
  NAMESPACE: string;
  treatmentId: string
}

export default ({ NAMESPACE, namespaceType, treatmentId }: IProps) => {
  const invoiceListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimEntities?.invoiceListMap
  );

  const invoiceListFromEntities = useMemo(() => {
    const invoiceListMapEntries = Object.entries(invoiceListMap);
    const invoiceListFromEntitiesTemp: any[] = [];
    lodash.map(invoiceListMapEntries, (item: any) => {
      if (item[1].treatmentId === treatmentId) {
        invoiceListFromEntitiesTemp.push(item[1]);
      }
    });
    return invoiceListFromEntitiesTemp;
  }, [invoiceListMap]);

  const configs = tenant.region({
    [Region.HK]: () => {
      return namespaceType === NamespaceType.DataCapture ? {
        Rules: {
          checkInvoiceNoIsExist: Validator.checkInvoiceNoIsExist(invoiceListFromEntities),
        },
        extraConfig: {
          triggerEvent: "onBlur"
        }
      } : {}
    },
    [Region.TH]: () => {
      return namespaceType === NamespaceType.DataCapture ? {
        Rules: {
          checkInvoiceNoIsExist: Validator.checkInvoiceNoIsExist(invoiceListFromEntities),
        },
        extraConfig: {
          triggerEvent: "onBlur"
        }
      } : {}
    },
    notMatch: {}
  })
  return { Rules: configs.Rules || {}, extraConfig: configs.extraConfig || {} }
}

