import { callService, integrationStart } from '@/services/integrationTestControllerService';
import type { VNBCalculatorState } from '../_model/state';
import { mapVNBClaculationRequestData } from '../utils';
import Request from './Request';
import CalculationAction from '../enum/CalculationAction';
import { chain, isEmpty, isObjectLike } from 'lodash';
import { tenant } from '@/components/Tenant';
import { vnbConfig } from '../config';

export async function requestProductsList() {
  const req = new Request();
  req.api = `product/api/${vnbConfig.API_CHANNEL}/query`;
  const res = await callService(req.toParams());
  if (!isObjectLike(res)) {
    return Promise.reject('request product list fail');
  }
  return Promise.resolve(res?.products || []);
}

export async function requestBenefitsConfig(pid: string) {
  const req = new Request();
  req.api = `product/api/${vnbConfig.API_CHANNEL}/${pid}`;
  req.requestData = {
    type: 'quote',
    quotation: {
      channel: vnbConfig.API_CHANNEL,
      pid,
      basicInfo: {},
      plans: [
        {
          pid,
        },
      ],
      alterations: {},
      proposalOptions: {},
    },
  };
  const res = await callService(req.toParams());
  if (!isObjectLike(res)) {
    return Promise.reject('request benefit list fail');
  }
  const [basicBenefitsConfig, subBenefitsConfig] = Object.values(res || {}).reduce(
    (out, current) => {
      if (current.properties?.isMainBenefit) {
        out[0][current.pid] = current;
      } else {
        out[1][current.pid] = current;
      }
      return out;
    },
    [{}, {}]
  );
  return Promise.resolve([basicBenefitsConfig, subBenefitsConfig]);
}

export async function validate(model: VNBCalculatorState) {
  const req = new Request();
  req.api = 'quotation/api/quote';
  req.requestData = {
    type: 'quote',
    quotation: mapVNBClaculationRequestData(model, CalculationAction.VALIDATE),
  };
  return callService(req.toParams());
}

export async function requestAgeGroupConfig(pid: string) {
  const req = new Request();
  req.api = `quotation/api/${vnbConfig.API_CHANNEL}/${pid}`;
  req.requestData = {
    type: 'quote',
    quotation: {
      channel: vnbConfig.API_CHANNEL,
      pid,
      basicInfo: {},
      plans: [
        {
          pid,
        },
      ],
      alterations: {},
      proposalOptions: {},
    },
  };
  const res = await callService(req.toParams());
  if (!isObjectLike(res)) {
    return Promise.reject('request config failed');
  }
  const template = res?.template?.template;
  const option = (template && template.options && template.options[0]) || {};
  const alterationConfig = option?.alterationConfig;

  const mapConfig = (output, item) => {
    output[item.value] = item;
    return output;
  };

  const ageGroup = alterationConfig?.ageGroup?.code?.options;
  const ageGroupConfig = chain(ageGroup).reduce(mapConfig, {}).value();

  const gender = alterationConfig?.gender?.code?.options;
  const genderConfig = chain(gender).reduce(mapConfig, {}).value();

  const occupationClass = alterationConfig?.occupationClass?.code?.options;
  const occupationClassConfig = chain(occupationClass).reduce(mapConfig, {}).value();

  const paymentMode = alterationConfig?.paymentMode?.code?.options;
  const paymentModeConfig = chain(paymentMode).reduce(mapConfig, {}).value();
  const basicConfig = option.basicConfig;
  return Promise.resolve([
    ageGroupConfig,
    genderConfig,
    occupationClassConfig,
    paymentModeConfig,
    basicConfig,
  ]);
}

export async function requestOccClassAgePremium(model: VNBCalculatorState) {
  const req = new Request();
  req.api = `quotation/api/quote`;
  const quotation = mapVNBClaculationRequestData(model, CalculationAction.TARIFF_CALCULATION);
  req.requestData = {
    type: 'quote',
    quotation,
  };
  const res = await callService(req.toParams());
  if (!isObjectLike(res)) {
    return Promise.reject('request premiums data failed');
  }
  const { max, min, mid } = res?.quotation?.tariff?.occClassAgePremium || {};
  return Promise.resolve([max, min, mid]);
}

export async function requestVNBQuotation(model: VNBCalculatorState) {
  const req = new Request();
  req.api = 'quotation/api/quote';
  const quotation = mapVNBClaculationRequestData(model, CalculationAction.VNB_CALCULATION);
  req.requestData = {
    type: 'quote',
    quotation,
  };
  const res = await callService(req.toParams());
  if (!isEmpty(res?.warnings)) {
    const errorList = chain(res?.warnings)
      .map((warn) => ({
        code: warn.code,
        content: warn?.label?.en || warn?.code + ':' + warn?.id,
      }))
      .value();
    return Promise.reject(errorList);
  }
  return Promise.resolve(res?.quotation?.summary);
}

export async function gernateProposal(model: VNBCalculatorState) {
  const req = new Request();
  req.api = 'quotation/api/propose';
  const quotation = mapVNBClaculationRequestData(model, CalculationAction.TARIFF_CALCULATION);
  quotation.proposalOptions = { language: model.reportLang };
  req.requestData = {
    quotation,
  };
  const res = await callService(req.toParams());
  if (!isObjectLike(res)) {
    return Promise.reject('request gernate proposal failed');
  }
  return Promise.resolve(res?.quotation?.proposalInfo);
}

export async function checkProposalStatus(token: string) {
  if (!token) {
    return Promise.reject('token invalid.');
  }
  const req = new Request();
  req.api = `report/api/${token}/status`;
  req.serviceType = 'get';
  const res = await callService(req.toParams());
  if ((res && !isObjectLike(res)) || (res && res?.status !== '200')) {
    return Promise.reject('get proposal report status failed.');
  }
  return Promise.resolve(res);
}

export async function downloadProposalReport(token: string) {
  if (!token) {
    return Promise.reject('token invalid.');
  }
  const res = await integrationStart({
    integrationCode: 'INT_I_IL_NB_PAE',
    regionCode: tenant.region(),
    requestData: {
      fileType: 'PDF',
      token,
    },
    retry: false,
  });
  if (!res?.success) {
    return Promise.reject('download proposal report failed.');
  }
  return Promise.resolve(res?.resultData?.responseData?.imageData);
}
