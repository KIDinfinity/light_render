import lodash from 'lodash';
import moment from 'moment';
import { serialize as objectToFormData } from 'object-to-formdata';
import claimHospitalBillingBatchControllerService from '@/services/claimHospitalBillingBatchControllerService';
import claimMedicalProviderInformationControllerService from '@/services/claimMedicalProviderInformationControllerService';
import claimDiagnosisInformationControllerService from '@/services/claimDiagnosisInformationControllerService';
import miscDictionaryControllerService from '@/services/miscDictionaryControllerService';
import { tenant } from '@/components/Tenant';
import { numberPrecisionFn } from '../../utils';

interface IEffects {
  call: Function;
  put: any;
  select: Function;
}

export default {
  *findDictionaryByTypeCodes(_: any, { call, put }: IEffects) {
    const response = yield call(miscDictionaryControllerService.findDictionaryByTypeCodes, [
      'CauseOfIncident',
      'DiagnosisType',
      'MainBenefit',
      'hospitalBillingType',
    ]);
    if (lodash.get(response, 'success')) {
      const resultData = lodash.get(response, 'resultData');
      yield put({
        type: 'saveData',
        payload: {
          causeOfIncident: resultData.CauseOfIncident,
          diagnosisType: resultData.DiagnosisType,
          mainBenefit: resultData.MainBenefit,
          hospitalBillingType: resultData.hospitalBillingType,
        },
      });
    }
  },
  *searchName({ payload }: any, { call }: IEffects) {
    const {
      searchType,
      searchVal,
      showCode = 'dictCode',
      showName = 'dictName',
      showType = 'both',
    } = payload;
    let url = '';
    switch (searchType) {
      case 'mdeicalProvider':
        url = claimMedicalProviderInformationControllerService.searchNameByRegionCode;
        break;
      case 'diagnosis':
        url = claimDiagnosisInformationControllerService.searchNameByRegionCode;
        break;
      default:
        url = '';
    }
    if (url === '') {
      return searchVal;
    }
    const response = yield call(url, { codes: searchVal, regionCode: tenant.region() });
    if (lodash.get(response, 'success') && lodash.get(response, 'resultData.length')) {
      if (showType === 'both') {
        const code = lodash.get(response, `resultData[0][${showCode}]`);
        const name = lodash.get(response, `resultData[0][${showName}]`);
        return `${code}-${name}`;
      }
      return lodash.get(response, `resultData[0][${showType}]`, '');
    }
    return searchVal;
  },
  *getHospitalBillingByClaimNoData({ payload }: any, { call, put }: IEffects) {
    const { claimNo } = payload;
    const response = yield call(
      claimHospitalBillingBatchControllerService.getHospitalBillingByClaimNo,
      objectToFormData({
        claimNo,
      })
    );
    if (response.success) {
      const { claimHospitalBillingDetails: invoiceInforData, ...basicInforData } =
        response.resultData || {};
      const medicalProviderName = yield put.resolve({
        type: 'searchName',
        payload: {
          searchType: 'mdeicalProvider',
          searchVal: [basicInforData.medicalProvider],
        },
      });
      const newBasicInforData = {
        'Cover Page No': basicInforData.coverPageNo,
        'Hospital Name': medicalProviderName,
        'OCR Hosipital Name': basicInforData.hospitalName,
        'Invoice Date': moment(basicInforData.coverPageDate).format('L'),
        'Scan Date': moment(basicInforData.scanDate).format('L'),
        'Total Invoice': basicInforData.totalNoOfInvoice,
        'IPD Invoice': basicInforData.noOfIpdInvoice,
        'OPD Invoice': basicInforData.noOfOpdInvoice,
        'GEB Invoice': basicInforData.noOfGebInvoice,
        'Total Invoice Amount': numberPrecisionFn(basicInforData.totalInvoiceAmount),
        'Total IPD Amount': numberPrecisionFn(basicInforData.ipdInvoiceAmount),
        'Total OPD Amount': numberPrecisionFn(basicInforData.opdInvoiceAmount),
        'Total GEB Amount': numberPrecisionFn(basicInforData.getInvoiceAmount),
        'Final Invoice Amount': numberPrecisionFn(basicInforData.totalFinalAmount),
        'Final IPD Invoice Amount': numberPrecisionFn(basicInforData.finalIpdInvoiceAmount),
        'Final OPD Invoice Amount': numberPrecisionFn(basicInforData.finalOpdInvoiceAmount),
        'Final GEB Invoice Amount': numberPrecisionFn(basicInforData.finalGebInvoiceAmount),
      };
      const newInvoiceInforData = [];
      for (let i = 0, len = invoiceInforData.length; i < len; i++) {
        const newItem = {
          key: i,
          isShowMore: false,
          ...invoiceInforData[i],
        };
        if (newItem.type === 'OPD') {
          const invoiceFormDetail = yield call(
            claimHospitalBillingBatchControllerService.getRegistration,
            objectToFormData({
              submissionId: newItem.submissionId,
            })
          );
          if (lodash.get(invoiceFormDetail, 'success')) {
            newItem.registration = lodash.get(invoiceFormDetail, 'resultData');
          }
        }
        newInvoiceInforData.push(newItem);
      }
      yield put({
        type: 'saveClaimProcessData',
        payload: {
          basicInforData: newBasicInforData,
          invoiceInforData: newInvoiceInforData,
        },
      });
    }
  },
};
