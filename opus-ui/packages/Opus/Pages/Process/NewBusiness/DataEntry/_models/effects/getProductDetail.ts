import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';
import type { State } from '../state';
import { productDetail } from '@/services/productInfoService';


export default function* getProductDetail({ payload }: any, { call, put, select }: any) {
  const task = yield select(state => state.processTask.getTask);
  const processData: State["processData"] = formUtils.cleanValidateData(yield select(state => state[NAMESPACE].processData));

  const clientMapper = (client:any, clientOccupation:any) => ({
    fullName: lodash.compact([client.name, client.lastName]).join(' '),
    dob: client.dateOfBirth,
    gender: client.gender,
    occClass: clientOccupation?.occupationClass,
  });

  const insuredAge = processData?.insuredInfo?.age;
  const insuredInfo = clientMapper(processData.insuredInfo, processData.insuredOccupation);
  const payorInfo = clientMapper(processData.payorInfo, processData.payorOccupation);
  
  const params = {
    regionCode  : tenant.region(),
    companyCode : task.companyCode,
    bizCode     : task.businessCode,
    callerSystem: task.submissionChannel,
    businessNo  : task.businessNo,
    proposalDate: new Date(),
    quotation   : {
      insureds  : [insuredInfo],
      proposers : [insuredAge < 20 ? payorInfo : insuredInfo],
      channel   : processData.agentInfo?.salesChannel,
      subChannel: payload?.subChannel || processData.agentInfo?.subChannel,
      plans     : [{
        planCode: payload.planCode
      }],
      basicInfo : null
    }
  }

  const response = yield call(productDetail, params);
  if (response?.success) {
    const products = response?.resultData?.productPackage?.products || [];
    const riderPlanCodeList:any = [];
    const basePlan = products.find((p:any) => p.basicPlanInd);
    
    products.map((p:any) => {
      if(!p.basicPlanInd) {
        const language = tenant.getLocaleLang();
        let name = "";
        if(!p.productName.en && !p.productName.th) {
          name = p.planCode;
        } else {
          name = language === "en-US" || !p.productName.th  ? p.productName.en : p.productName.th;
        }

        riderPlanCodeList.push({
          dictCode : p.planCode,
          dictName : p.planCode + " - " + name
        })
      }
    });

    yield put({
      type: 'saveProductDetailList',
      payload: {
        resultData: products,
        selectedBasicPlan : basePlan
      },
    });

    yield put({
      type: 'clearRiders'
    })

    yield put({
      type : 'saveRiderProductCodeList',
      payload : {
        riderPlanCodeList 
      }
    });
  }
}
