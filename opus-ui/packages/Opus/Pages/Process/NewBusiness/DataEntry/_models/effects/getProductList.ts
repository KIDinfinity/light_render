import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';
import type { State } from '../state';
import { productList } from '@/services/productInfoService';


export default function* getProductList({ payload }: any, { call, put, select }: any) {
  const task = yield select((state) => state.processTask.getTask);
  const processData: State["processData"] = formUtils.cleanValidateData(yield select(state => state[NAMESPACE].processData));
  const agentInfo = processData?.agentInfo;
  const productInfo = processData?.productInfo;
  
  const clientMapper = (client:any, clientOccupation:any) => {
    return {
      fullName: lodash.compact([client.name, client.lastName]).join(' '),
      dob: client.dateOfBirth,
      gender: client.gender,
      occClass: clientOccupation?.occupationClass,
    }
  };
  const insuredAge = processData.insuredInfo.age || 0;
  const insuredInfo = clientMapper(processData.insuredInfo, processData.insuredOccupation);
  const payorInfo = clientMapper(processData.payorInfo, processData.payorOccupation);
  
  const params = {
    regionCode     : tenant.region(),
    companyCode    : task.companyCode,
    bizCode        : task.businessCode,
    callerSystem   : task.submissionChannel,
    businessNo: task.businessNo,
    channel   : payload?.salesChannel || agentInfo?.salesChannel || "",
    subChannel: payload?.subChannel || agentInfo?.subChannel || "",
    productCategory: payload?.productCategory || productInfo?.productCategory || "",
    insureds       : [insuredInfo],
    proposers      : [insuredAge < 20 ? payorInfo : insuredInfo],
    basicInfo      : null
  }

  const response = yield call(productList,params);
  
  if (response?.success) {
    const product:any = [];
    const language = tenant.getLocaleLang();
    response.resultData.products.map((p:any) => {
      product.push({
        dictCode : p.planCode,
        dictName : p.planCode + " - " + (language === "en-US" || !p.productName.th ? p.productName.en : p.productName.th)
      })
    })

    yield put({
      type: 'saveProductList',
      payload: {
        list: product,
      },
    });

    yield put({
      type: 'saveProductDetailList',
      payload: {
        resultData: [],
        selectedBasicPlan : {}
      },
    });

    yield put({
      type: 'removeBasicPlan'
    });

    yield put({
      type: 'removeProductInfoRider'
    });
  }
}
