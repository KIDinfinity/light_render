import { useSelector, useDispatch } from 'dva';
import moment from 'moment';
import { formUtils, Validator } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import { NamespaceType } from 'process/Components/BussinessControls';


interface IProps {
  namespaceType: string;
  NAMESPACE: string;
  incidentId: string;
  invoiceId: string;
}

export default ({ NAMESPACE, namespaceType, incidentId, invoiceId }: IProps) => {

  const dispatch = useDispatch();

  const hkabRate = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.claimEntities?.incidentListMap?.[incidentId]?.hkabRate
  );

  const item = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.claimEntities?.invoiceListMap?.[invoiceId]
  );

  const isAssessment = {
    Rules: { VLD_000651: Validator.VLD_000651(formUtils.queryValue(hkabRate)) },
    extraConfig: {
      onchange: (value: any) => {
        if (!moment(formUtils.queryValue(item?.exchangeDate)).isSame(value)) {
          dispatch({
            type: `${NAMESPACE}/getExchangeRateForExchangeDate`,
            payload: {
              invoiceId,
              exchangeDate: value,
              oldExchangeDate: formUtils.queryValue(item?.exchangeDate),
            },
          });
        }
      }
    }
  }

  const configs = tenant.region({
    [Region.HK]: () => {
      return namespaceType === NamespaceType.DataCapture ? {} : isAssessment
    },
    [Region.TH]: () => {
      return namespaceType === NamespaceType.DataCapture ? {} : isAssessment
    },
    notMatch: {}
  })

  return {
    Rules: configs.Rules,
    extraConfig: configs.extraConfig
  }
}
