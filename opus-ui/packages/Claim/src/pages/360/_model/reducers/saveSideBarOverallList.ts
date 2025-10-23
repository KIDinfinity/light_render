import { tenant } from '@/components/Tenant';

export default function saveSideBarOverallList(state: any, action: any) {
  const {
    payload: { sideBarOverallList },
  } = action;

  if (sideBarOverallList?.length && tenant.isJP()) {
    sideBarOverallList.map((sideBarOverall) => {
      sideBarOverall?.policyInfoList?.map((policyInfo) => {
        policyInfo?.productInfoList?.map((productInfo) => {
          if (productInfo?.benefitTypeInfoList?.length)
            productInfo.benefitTypeInfoList = productInfo.benefitTypeInfoList.filter(
              (benefitTypeInfo) =>
                ![
                  'CIWOP',
                  'CIWOP2',
                  'NNMCIWOP',
                  'NNMCIWOP2',
                  '085CIWOP',
                  '086CIWOP',
                  '087CIWOP',
                ].includes(benefitTypeInfo?.benefitTypeCode)
            );
        });
      });
    });
  }

  return {
    ...state,
    sideBarOverallList,
  };
}
