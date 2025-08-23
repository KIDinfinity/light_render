import lodash from 'lodash';
import claimHospitalBillingBatchControllerService from '@/services/claimHospitalBillingBatchControllerService';

export default function* cleanInformation({ payload }: any, { call, put }: any) {
    const { selectedinvoiceInformation } = payload;
    
    const response = yield call(claimHospitalBillingBatchControllerService.cleanInvoiceByClaimHospitalBillingDetails,selectedinvoiceInformation)

    if(
        lodash.isPlainObject(response) && 
        response.success 
    ){
        const invoiceInforData=lodash.get(response,'resultData.claimHospitalBillingDetails',{});

        yield put({
            type:'saveInvoiceInforData',
            payload:{
                invoiceInforData,
            },
        });
    }

}
