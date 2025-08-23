import { useSelector, useDispatch } from 'dva';
import { Validator } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import { NamespaceType } from 'process/Components/BussinessControls';

interface IProps {
  namespaceType: string;
  NAMESPACE: string;
  invoiceId: string;
}

export default ({ NAMESPACE, namespaceType, invoiceId }: IProps) => {
  const dispatch = useDispatch();

  const claimEntities = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimEntities
  );

  const invoiceCurrency = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.claimEntities?.invoiceListMap?.[invoiceId]?.invoiceCurrency
  );

  const changeInvoiceCurrency = (selectCurrency: any) => {
    dispatch({
      type: `${NAMESPACE}/saveInvoiceItem`,
      payload: {
        changedFields: { invoiceCurrency: selectCurrency.currencyCode },
        invoiceId,
      },
    });
  };

  const onInvoiceCurrencyChange = (selectCurrency: any) => {
    const currency = selectCurrency.currencyCode;
    dispatch({
      type: `${NAMESPACE}/saveInvoiceCurrency`,
      payload: {
        invoiceCurrencyObj: {
          invoiceId,
          invoiceCurrency: currency,
        },
      },
    });
    dispatch({
      type: `${NAMESPACE}/hideCurrencyModal`,
      payload: {
        currencyModalShowStatus: true,
      },
    });
  };

  const configs = tenant.region({
    [Region.HK]: () => {
      return namespaceType === NamespaceType.DataCapture
        ? {
            extraConfig: {
              onSuffixChange: changeInvoiceCurrency,
              currencyCode: invoiceCurrency,
            },
          }
        : {
            Rules: {
              VLD_000013: Validator.VLD_000013({ claimEntities, invoiceId }),
            },
            extraConfig: {
              onSuffixChange: onInvoiceCurrencyChange,
              currencyCode: invoiceCurrency,
              min: 0,
              max: 999999999.99,
              precision: 2,
            },
          };
    },
    [Region.TH]: () => {
      return namespaceType === NamespaceType.DataCapture
        ? {
            Rules: {
              VLD_000013: Validator.VLD_000013({ claimEntities, invoiceId }),
            },
            extraConfig: {
              onSuffixChange: changeInvoiceCurrency,
              currencyCode: invoiceCurrency,
            },
          }
        : {
            extraConfig: {
              currencyCode: invoiceCurrency,
              onSuffixChange: onInvoiceCurrencyChange,
            },
          };
    },
    notMatch: {
      Rules: [],
      extraConfig: {},
    },
  });

  return {
    Rules: configs.Rules,
    extraConfig: configs.extraConfig,
  };
};
