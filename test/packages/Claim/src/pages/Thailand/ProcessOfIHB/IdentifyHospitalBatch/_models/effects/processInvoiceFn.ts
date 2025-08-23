import lodash from 'lodash';
import claimHospitalBillingBatchControllerService from '@/services/claimHospitalBillingBatchControllerService';
import{ v4 as  uuidv4 } from 'uuid';
import { CLAIMPROCESSDATAFORHBPROCESS } from '@/utils/claimConstant';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ClaimType, ServiceItem } from '../../Enum';

export default function* processInvoiceFn({ payload = {} }: any, { call, put, select }: any) {
  const { invoiceInforSelRows } = yield select((state: any) => ({
    invoiceInforSelRows: state.IdentifyHospitalBatchController.claimProcessData.invoiceInforSelRows,
  }));

  if (invoiceInforSelRows && invoiceInforSelRows.length) {
    const validateInvoiceInforArr = yield put.resolve({
      type: 'validateInvoiceInfor',
      payload: {
        invoiceInfor: invoiceInforSelRows,
      },
    });
    const errTip = yield put.resolve({
      type: 'errTipFn',
      payload: {
        isCheckScannedOrError: true,
        isCheckType: true,
        isCheckDiagnosisType: true,
      },
    });
    const { invoiceNotScannedOrErrorTip, invoiceTypeIsNullTip, diagnosisNotTypeIsPrimaryTipArr } =
      errTip;

    const invoiceInforTip =
      (invoiceNotScannedOrErrorTip === '' ? '' : `${invoiceNotScannedOrErrorTip}\n`) +
      (invoiceTypeIsNullTip === '' ? '' : `${invoiceTypeIsNullTip}\n`);
    yield put({
      type: 'saveData',
      payload: {
        invoiceInforTip: `${invoiceInforTip}${
          lodash.isEmpty(validateInvoiceInforArr)
            ? ''
            : formatMessageApi({ Label_COM_WarningMessage: 'MSG_000461' })
        }`,
        diagnosisNotTypeIsPrimaryTipArr,
        submitforTip: '',
        submitPaymentforTip: '',
      },
    });

    if (
      !validateInvoiceInforArr.length &&
      invoiceInforTip === '' &&
      diagnosisNotTypeIsPrimaryTipArr.length === 0
    ) {
      const basicInforData = yield select((state: any) =>
        formUtils.cleanValidateData(
          state.IdentifyHospitalBatchController.claimProcessData?.basicInforData
        )
      );
      const claimHospitalBillingDetailsList: any[] = [];
      const { taskDetail } = payload;
      lodash.forEach(invoiceInforSelRows, (item) => {
        const commonData = {
          ...item,
          medicalProvider: basicInforData.medicalProvider,
          status: formUtils.queryValue(item.status),
          identityNo: formUtils.queryValue(item.identityNo),
          firstName: formUtils.queryValue(item.firstName),
          surname: formUtils.queryValue(item.lastName),
          lastName: formUtils.queryValue(item.lastName),
          coverPageNo: formUtils.queryValue(basicInforData.coverPageNo),
        };
        const claimCaseVO = {
          ...CLAIMPROCESSDATAFORHBPROCESS,
          id: uuidv4(),
          insured: {
            ...CLAIMPROCESSDATAFORHBPROCESS.insured,
            identityNo: formUtils.queryValue(item.identityNo),
            firstName: formUtils.queryValue(item.firstName),
            surname: formUtils.queryValue(item.lastName),
            lastName: formUtils.queryValue(item.lastName),
            id: uuidv4(),
          },
          incidentList: [
            {
              ...item.registration?.incidentList[0],
              claimType: ClaimType.OPD,
              orderNum: 1,
              incidentNo: 1,
              incidentDate: item.visitDate,
              subClaimType: item.subClaimType,
              treatmentList: [
                {
                  ...item.registration?.incidentList[0]?.treatmentList[0],
                  treatmentNo: 1,
                  invoiceNo: item.invoiceNo,
                  visitDate: item.visitDate,
                  amount: item.amount,
                  medicalProvider: basicInforData.medicalProvider,
                  icu: 0,
                  dateOfConsultation: item.visitDate,
                  invoiceList: [
                    {
                      invoiceNo: item.invoiceNo,
                      invoiceDate: item.visitDate,
                      expense: item.amount,
                      grossExpense: item.amount,
                      serviceItemList: [
                        {
                          serviceItem: ServiceItem.OPDHB,
                          expense: item.amount,
                          grossExpense: item.amount,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        };
        const submitData = {
          ...commonData,
        };

        if (!lodash.isEmpty(item.registration)) {
          submitData.claimCaseVO = claimCaseVO;
        }
        submitData.submissionChannel = taskDetail?.submissionChannel;
        submitData.submissionDate = taskDetail?.submissionDate;
        claimHospitalBillingDetailsList.push(submitData);
      });
      const response = yield call(claimHospitalBillingBatchControllerService.processInvoice, {
        ...basicInforData,
        claimHospitalBillingDetails: formUtils.cleanValidateData(claimHospitalBillingDetailsList),
        assignee: taskDetail?.assignee,
      });
      if (response.success) {
        yield put({
          type: 'refreshInformation',
          payload: {
            taskId: taskDetail?.taskId,
          },
        });
      }
    }
  } else {
    yield put({
      type: 'saveData',
      payload: {
        invoiceInforTip: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000196' }),
        submitforTip: '',
        submitPaymentforTip: '',
      },
    });
  }

  yield put({
    type: 'showProcessLoading',
    payload: {
      showProcessLoading: false,
    },
  });
}
