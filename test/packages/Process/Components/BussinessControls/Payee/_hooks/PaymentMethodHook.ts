import { useDispatch } from 'dva';
import { PaymentMethod as PaymentMethodEnum } from 'claim/pages/Enum';
import { Region, tenant } from '@/components/Tenant';

export default ({ NAMESPACE, payeeId }: any) => {
  return tenant.region({
    [Region.JP]: () => {
      const dispatch = useDispatch();

      const onSelect = async (value: any) => {
        const isPremiumAccount = value === PaymentMethodEnum.PremiumAccount;
        if (isPremiumAccount) {
          await dispatch({
            type: `${NAMESPACE}/searchName`,
            payload: {
              payeeId,
              paymentMethod: value,
            },
          });
        }
      };
      return { onSelect };
    },
    [Region.TH]: () => {
      return { existCodes: ['05', '06'] };
    },
    notMatch: () => ({}),
  });
};
