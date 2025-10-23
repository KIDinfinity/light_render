import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { formUtils, Validator } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';
import type { State } from '../state';
import { quotation } from '@/services/pcPlanExtraPremiumLoadingRuleControllerService';


export default function* calPrem(_, { select, put, call }: any) {
  const forms = yield select((state: any) => state.formCommonController.forms);

  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.filter(forms, (_, key) => key.includes('product')),
    force: true,
  });

  if(errors?.length)
    return errors;

  const { businessCode } = yield select(state => state.processTask.getTask);
  const processData: State["processData"] = formUtils.cleanValidateData(yield select(state => state[NAMESPACE].processData));
  const insuredAge = processData.insuredInfo.age;
  if(typeof insuredAge !== 'number') {
    return [];
  }

  const clientMapper = (client, clientOccupation) => ({
    fullName: lodash.compact([client?.name, client?.lastName]).join(' '),
    dob: client?.dateOfBirth,
    gender: client?.gender,
    occClass: clientOccupation?.occupationClass,
  });

  const insuredInfo = clientMapper(processData.insuredInfo, processData.insuredOccupation);
  const ownerInfo = insuredAge < 20? clientMapper(processData.payorInfo, processData.payorOccupation): insuredInfo;
  
  const productMapper = (productInfo) => ({
    planCode: productInfo.riderProductCode || productInfo.baseProductCode,
    sumAssured: productInfo.sumAssuredRider || productInfo.sumAssuredBase,
    insuredIndex: 0,
    classes: productInfo.classes,
    premiumTerm: productInfo.premiumPeriod,
    basePrem: productInfo.premiumRider || productInfo.premiumBasePlan,
  })

  const params = {
    regionCode: tenant.region(),
    bizCode: businessCode,
    proposeDate: new Date(),
    quotation: {
      channel: processData.agentInfo.salesChannel,
      basicInfo: {
        currency: 'THB',
        paymentMode: processData.productInfoBasicPlan.premiumFrequency,
        initialPaymentMethod: 'CAH',
      },
      quoteType: 'quote',
      insureds: [insuredInfo],
      proposers: [ownerInfo],
      plans: [productMapper(processData.productInfoBasicPlan || {})].concat(processData.productInfoRiders.filter(item => item.riderProductCode).map(productMapper))
    }
  }
  
  const response = yield call(quotation, params);
  if(response?.success) {
    const result = response.resultData.quotation;
    yield put({
      type: 'saveInsuredInfo',
      payload: {
        changedFields: {
          age: result.insureds[0].age
        }
      }
    });
    const basePlan = result.plans.find(item => item.planCode === processData.productInfoBasicPlan.baseProductCode);
    yield put({
      type: 'saveProductInfoBasicPlan',
      payload: {
        changedFields: {
          pid: basePlan.pid,
          coveredPeriod: basePlan.policyTerm,
          premiumPeriod: basePlan.premiumTerm,
          premiumFrequency: result.basicInfo.paymentMode,
          sumAssuredBase: basePlan.sumAssured,
          premiumBasePlan: basePlan.basePrem,
        }
      }
    });
    const riderPlans = result.plans.filter(item => item.planCode !== processData.productInfoBasicPlan.baseProductCode);
    yield put({
      type: 'saveRiderForCalPrem',
      payload: {
        riderPlans
      }
    })
    if(insuredAge < 20 && typeof result.proposers?.[0]?.age === 'number') {
      yield put({
        type: 'savePayorInfo',
        payload: {
          changedFields: {
            age: result.proposers[0].age
          }
        }
      })
    }
    
  }
}
