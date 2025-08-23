import { useSelector } from 'dva';
import { tenant, Region } from '@/components/Tenant';
import { NamespaceType } from 'process/Components/BussinessControls';

interface IProps {
  namespaceType: string;
  NAMESPACE: string;
  invoiceId: string;
}

export default ({ NAMESPACE, namespaceType, invoiceId }: IProps) => {
  const currencyCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.invoiceListMap?.[invoiceId]?.invoiceCurrency
  );

  const publicExtraConfig = {
    currencyCode,
    placeholder: true,
    hideRequired: true,
    hiddenPrefix: true,
  };

  const configs = tenant.region({
    [Region.HK]: () => {
      return namespaceType === NamespaceType.DataCapture
        ? {
            extraConfig: publicExtraConfig,
          }
        : {};
    },
    [Region.TH]: () => {
      return namespaceType === NamespaceType.DataCapture
        ? {
            extraConfig: publicExtraConfig,
          }
        : {};
    },
    notMatch: {},
  });
  return {
    rulesConfig: configs.Rules || {},
    extraConfig: configs.extraConfig || {},
  };
};
