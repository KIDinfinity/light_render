import { useState } from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { searchServiceItemByPage } from '@/services/claimServiceItemInformationControllerService';
import { getNotRepeatableCodes } from 'claim/pages/utils/getNotRepeatableCodes';
import { tenant, Region } from '@/components/Tenant';
import { NamespaceType } from 'process/Components/BussinessControls';

interface IProps {
  NAMESPACE: string;
  incidentId: string;
  invoiceId?: string;
  serviceItemId: string;
  otherParams?: any;
  namespaceType: string;
}

export default ({ NAMESPACE, incidentId, invoiceId, serviceItemId, otherParams, namespaceType }: IProps) => {
  const dispatch = useDispatch();

  const [disabledDictCodes, setDisabledDictCodes] = useState([]);
  const repeatableServiceItemList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.repeatableServiceItemList || []
  );

  const serviceItemListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.serviceItemListMap
  );
  const notRepeatableCodeList = getNotRepeatableCodes({
    repeatableServiceItemList,
    invoiceId,
    serviceItemListMap,
  });

  const searchConfig = {
    otherParams: otherParams,
    customUrl: searchServiceItemByPage,
    callBackSetDataList: (list = []) => {
      const newDisabledDictCodes: any = lodash
        .chain(list)
        .filter((el: any) => el.repeatable !== 'Y' && notRepeatableCodeList.includes(el.dictCode))
        .reduce((arr: any, item: any) => {
          return [...arr, item.dictCode];
        }, [])
        .value();
      setDisabledDictCodes(newDisabledDictCodes);
    },
  };

  const configs = tenant.region({
    [Region.HK]: () => {
      return namespaceType === NamespaceType.DataCapture ? {
        extraConfig: {
          hideRequired: true
        }
      } : {}
    },
    [Region.TH]: () => {
      return namespaceType === NamespaceType.DataCapture ? {
        extraConfig: {
          hideRequired: true
        }
      } : {}
    },
    notMatch: {}
  })

  return {
    extraConfig: {
      ...(configs.extraConfig || {}),
      ...searchConfig,
      disabledDictCodes,
      onSelectCallback: (value: any) => {
        dispatch({
          type: `${NAMESPACE}/getRepeatableByServiceCode`,
          payload: {
            codes: [value],
            invoiceId,
            incidentId,
          },
        });

        dispatch({
          type: `${NAMESPACE}/removeFeeItemList`,
          payload: {
            serviceItemId,
          },
        });
      },
    },
    Rules: {},
  };
};
