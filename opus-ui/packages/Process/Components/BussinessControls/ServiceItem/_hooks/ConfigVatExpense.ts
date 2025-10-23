import { useSelector } from 'dva';
import { tenant, Region } from '@/components/Tenant';
import { NamespaceType } from 'process/Components/BussinessControls';

interface IProps {
  namespaceType: string;
  NAMESPACE: string;
  invoiceId: string;
}

export default ({ NAMESPACE, namespaceType, invoiceId }: IProps) => {
  const configs = tenant.region({
    [Region.HK]: () => {
      const currencyCode = useSelector(
        ({ [NAMESPACE]: modelnamepsace }: any) =>
          modelnamepsace.claimEntities?.invoiceListMap?.[invoiceId]?.invoiceCurrency
      );

      return namespaceType === NamespaceType.DataCapture
        ? {
            extraConfig: {
              currencyCode,
              hideRequired: true,
              placeholder: true,
            },
          }
        : {};
    },
    notMatch: {},
  });
  return {
    Rules: configs.Rules || {},
    extraConfig: configs.extraConfig || {},
  };
};
