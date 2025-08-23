import { useDispatch } from 'dva';
import { Region, tenant } from '@/components/Tenant';
import { SeachCustom } from 'claim/pages/utils/claimUtils';

const seachCustom: any = new SeachCustom();
const { handleBankBranch } = seachCustom;

export default ({ NAMESPACE, form }: any) => {
  return tenant.region({
    [Region.JP]: () => {
      const dispatch = useDispatch();

      const onSelect = (value: any, typeCode: any, exProps: any) => {
        dispatch({
          type: `${NAMESPACE}/payeeUpdate`,
          payload: {
            changedFields: { branchName: exProps },
          },
        });
      };

      return {
        searchCustom: (postData: any) => handleBankBranch(postData),
        searchName: 'bankBranchJp',
        onSelectCallback: { onSelect },
        selectCallbackExProp: 'branchName',
      };
    },
    [Region.TH]: () => {
      const bankCode = form.getFieldValue('bankCode');

      return {
        searchCustom: (postData: any) => handleBankBranch(postData, bankCode),
        searchName: 'bankBranch',
      };
    },
    [Region.HK]: () => {
      const bankCode = form.getFieldValue('bankCode');

      return {
        searchCustom: (postData: any) => handleBankBranch(postData, bankCode),
      };
    },
    notMatch: () => ({}),
  });
};
