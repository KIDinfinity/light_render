import { useDispatch } from 'dva';
import { Region, tenant } from '@/components/Tenant';
import { SeachCustom } from 'claim/pages/utils/claimUtils';

const seachCustom: any = new SeachCustom();
const { handleBank } = seachCustom;

export default ({ NAMESPACE }: any) => {
  return tenant.region({
    [Region.JP]: () => {
      const dispatch = useDispatch();

      const onSelect = (value: any, typeCode: any, exProps: any) => {
        dispatch({
          type: `${NAMESPACE}/payeeUpdate`,
          payload: {
            changedFields: { bankName: exProps },
          },
        });
      };
      return {
        searchCustom: handleBank,
        searchName: 'bank',
        onSelectCallback: onSelect,
        selectCallbackExProp: 'bankName',
      };
    },
    [Region.TH]: () => () => {
      return { seachCustom: handleBank };
    },
    [Region.HK]: () => () => {
      return { seachCustom: handleBank };
    },
    notMatch: () => ({}),
  });
};
