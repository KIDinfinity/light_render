import { tenant } from "@/components/Tenant";

export default function saveSideBarOverallList(state: any, action: any) {
  const {
    payload: { sideBarOverallList },
  } = action;

  if(sideBarOverallList?.length && tenant.isJP()) {
    sideBarOverallList.map(sideBarOverall => {
      sideBarOverall?.policyInfoList?.map(policyInfo => {
        policyInfo?.productInfoList?.map(productInfo => {
          if(productInfo?.benefitTypeInfoList?.length)
            productInfo.benefitTypeInfoList = productInfo.benefitTypeInfoList.filter(benefitTypeInfo =>
              benefitTypeInfo?.benefitTypeCode !== 'CIWOP' &&
              benefitTypeInfo?.benefitTypeCode !== 'CIWOP2'
            )
        })
      })
    })
  }

  return {
    ...state,
    sideBarOverallList,
  };
}
