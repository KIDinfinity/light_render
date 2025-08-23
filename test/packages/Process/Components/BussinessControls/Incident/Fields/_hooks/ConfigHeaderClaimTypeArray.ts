import { useSelector, useDispatch } from 'dva';
import { tenant, Region } from '@/components/Tenant';

interface IProps {
  NAMESPACE: string;
  incidentId: string;
}

export default ({ NAMESPACE, incidentId }: IProps) => {
  return tenant.region({
    [Region.HK]: () => {
      const dispatch = useDispatch();
      const serviceItemListMap = useSelector(
        ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.serviceItemListMap
      );

      return {
        extraConfig: {
          onChange: (value: any) => {
            dispatch({
              type: `${NAMESPACE}/getRepeatableByServiceCode`,
              payload: {
                serviceItemList: serviceItemListMap,
                incidentId,
                claimTypeArray: value,
              },
            });
          },
        },
      };
    },
    [Region.TH]: {},
    notMatch: {},
  });
};
