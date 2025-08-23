import lodash from 'lodash';
import documentOcrControllerService from '@/services/documentOcrControllerService';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import {v4 as uuidv4 } from 'uuid';

export default function* getOcrResultDetail({ payload }: any, { call, select, put }: any) {
  const { caseNo } = payload;
  const response = yield call(documentOcrControllerService.getOcrResultDetail, {
    caseNo,
  });

  const claimTypeList = yield select(
    ({ dictionaryController }: any) => dictionaryController.Dropdown_COM_ClaimType
  );

  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response?.resultData)) {
    // TODO:时间转换
    const renderData = ({ datas, key }: any) => {
      if (!datas || lodash.isEmpty(datas)) return [];
      switch (key) {
        case 'exceptionMessageList':
          return {
            title: 'Exceptional Message',
            childrenList: datas,
            headers: [
              {
                title: 'Exceptional/ Error msg',
                dataIndex: 'exceptionMsg',
                key: 'exceptionMsg',
              },
              {
                title: 'Doc name / Receipt Page',
                dataIndex: 'docNameReceiptPage',
                key: 'docNameReceiptPage',
              },
              {
                title: 'Action',
                dataIndex: 'actionMsg',
                key: 'actionMsg',
              },
              {
                title: 'STP',
                dataIndex: 'failStp',
                key: 'stp',
              },
            ],
          };

        case 'reportBasicInformation':
          const list = datas.reportBasicInformationItemList || [];
          const maps = {
            ['Claim type']: 'claimType',
            ['Claim case #']: 'claimCase',
            ['OCR date / time']: 'ocrDate',
            ['Submission Channel']: 'submissionChannel',
            ['Receipt #']: 'receipt',
            ['Receipt Date']: 'receiptDate',
            ['Patient Name']: 'patientName',
            ['Hospital Name']: 'hospitalName',
            ['Doctor name']: 'doctorName',
            ['Admission date']: 'admissionDate',
            ['Discharge date']: 'dischargeDate',
            ['Receipt Currency']: 'receiptCurrency',
            ['Total receipt page']: 'totalReceiptPage',
            ['Grand Total']: 'grandTotal',
            ['ICU']: 'icu',
            ['Room type']: 'roomType',
          };

          return {
            title: 'Basic Information',
            childrenList: lodash
              .chain(lodash.keys(maps))
              .map((key: any) => ({
                fieldName: key,
                ...lodash.reduce(
                  list,
                  (obj, el: any, idx: number) => {
                    let newValue = null;

                    switch (maps[key]) {
                      case 'claimType':
                        newValue = lodash
                          .chain(claimTypeList)
                          .find((item: any) => item.dictCode === el[maps[key]])
                          .get('dictName')
                          .value();
                        break;
                      case 'submissionChannel':
                        newValue = formatMessageApi({
                          Dropdown_COM_SubmissionChannel: el[maps[key]],
                        });
                        break;

                      default:
                        break;
                    }

                    return {
                      ...obj,
                      [`receipt0${Number(idx + 1)}`]: newValue || el[maps[key]],
                    };
                  },
                  {}
                ),
              }))
              .value(),
            headers: [
              {
                title: 'Field Name',
                dataIndex: 'fieldName',
                key: 'fieldName',
              },
              ...lodash.map(list, (el: any, idx: number) => ({
                title: `Receipt #${Number(idx + 1)}`,
                dataIndex: `receipt0${Number(idx + 1)}`,
                key: `receipt0${Number(idx + 1)}`,
              })),
            ],
          };

        case 'reportChargesParticulars':
          return {
            title: 'Charges Particulars',
            childrenList: [
              ...datas.reportChargesParticularsItemList,
              {
                chiName: 'Total',
                amount: datas.sumAmount,
              },
            ],
            headers: [
              {
                title: 'Receipt # ',
                dataIndex: 'receipt',
                key: 'receipt',
              },
              {
                title: 'Hospital Name',
                dataIndex: 'hospitalName',
                key: 'hospitalName',
              },
              {
                title: 'Doc name / Receipt Page (PDF)',
                dataIndex: 'docNameReceiptPage',
                key: 'docNameReceiptPage',
              },
              {
                title: 'From Date',
                dataIndex: 'fromDate',
                key: 'fromDate',
              },
              {
                title: 'To Date',
                dataIndex: 'toDate',
                key: 'toDate',
              },
              {
                title: 'OCR Service Item',
                dataIndex: 'ocrServiceItem',
                key: 'ocrServiceItem',
              },

              {
                title: 'Chi Name',
                dataIndex: 'chiName',
                key: 'chiName',
              },
              {
                title: 'Amount (OCR)',
                dataIndex: 'amount',
                key: 'amount',
              },
              {
                title: 'Subtotal (OCR)',
                dataIndex: 'subtotal',
                key: 'subtotal',
              },
              {
                title: 'OCR Y/N',
                dataIndex: 'ocrFlag',
                key: 'ocrFlag',
              },
              {
                title: 'Mapped RCS',
                dataIndex: 'mappedRCS',
                key: 'mappedRCS',
              },
              {
                title: 'RCS service item',
                dataIndex: 'rcsServiceItem',
                key: 'rcsServiceItem',
              },
            ],
          };
        case 'reportSubtotal':
          return {
            title: 'Subtotal',
            childrenList: [
              ...datas.reportSubtotalItemList,
              {
                date: 'Total',
                subtotalOcr: datas.sumSubtotalOcr,
                subtotalAggregate: datas.sumSubtotalAggregate,
              },
            ],
            headers: [
              {
                title: 'Receipt # ',
                dataIndex: 'receipt',
                key: 'receipt',
              },
              {
                title: 'Hospital Name',
                dataIndex: 'hospitalName',
                key: 'hospitalName',
              },
              {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
              },
              {
                title: 'Subtotal (OCR)',
                dataIndex: 'subtotalOcr',
                key: 'subtotalOcr',
              },
              {
                title: 'Subtotal (aggregrated)',
                dataIndex: 'subtotalAggregate',
                key: 'subtotalAggregate',
              },
              {
                title: 'OCR vs aggregrated',
                dataIndex: 'ocrVsAggregated',
                key: 'ocrVsAggregated',
              },
            ],
          };
        case 'reportGrandTotal':
          return {
            key,
            title: 'Grand Total (per receipt)',
            childrenList: [
              ...datas.reportGrandTotalItemList,
              {
                receiptDate: 'Total',
                totalAmountOcr: datas.sumTotalAmountOcr,
                totalAmountAggregate: datas.sumTotalAmountAggregate,
              },
            ],

            headers: [
              {
                title: 'Receipt # ',
                dataIndex: 'receipt',
                key: 'receipt',
              },
              {
                title: 'Hospital Name',
                dataIndex: 'hospitalName',
                key: 'hospitalName',
              },
              {
                title: 'Receipt date',
                dataIndex: 'receiptDate',
                key: 'receiptDate',
              },
              {
                title: 'Total amount (OCR) ',
                dataIndex: 'totalAmountOcr',
                key: 'totalAmountOcr',
              },
              {
                title: 'Total Amount (aggregrate)',
                dataIndex: 'totalAmountAggregate',
                key: 'totalAmountAggregate',
              },
              {
                title: 'OCR vs Aggregrated',
                dataIndex: 'ocrVsAggregated',
                key: 'ocrVsAggregated',
              },
            ],
          };
        case 'reportCombined':
          return {
            title: 'Combined',
            subTitle: '*Summary (aggregrated) (by Receipt charged benefit',
            childrenList: [
              ...datas.reportCombinedItemList,
              {
                serviceItemReceipt: 'Total',
                subtotal: datas.sumSubtotal,
              },
            ],
            headers: [
              {
                title: 'Receipt # ',
                dataIndex: 'receipt',
                key: 'receipt',
              },
              {
                title: 'Hospital Name',
                dataIndex: 'hospitalName',
                key: 'hospitalName',
              },
              {
                title: 'Service item (receipt)',
                dataIndex: 'serviceItemReceipt',
                key: 'serviceItemReceipt',
              },
              {
                title: 'Subtotal (aggregrated)',
                dataIndex: 'subtotal',
                key: 'subtotal',
              },
              {
                title: 'Days/Unit',
                dataIndex: 'daysUnit',
                key: 'daysUnit',
              },
              {
                title: 'Service item (RCS)',
                dataIndex: 'serviceItemRcs',
                key: 'serviceItemRcs',
              },
            ],
          };

        default:
          break;
      }
    };

    const keys = [
      'reportBasicInformation',
      'reportChargesParticulars',
      'reportSubtotal',
      'reportGrandTotal',
      'reportCombined',
      'exceptionMessageList',
    ];
    const list =
      lodash
        .chain(response?.resultData || [])
        .map((el: any) => ({
          id: uuidv4(),
          ...el,
          list: lodash.reduce(
            keys,
            (arr: any, key: any) => {
              return !!el?.reportData?.[key]
                ? [
                    ...arr,
                    {
                      key,
                      ...renderData({ datas: el?.reportData[key], key }),
                    },
                  ]
                : arr;
            },
            []
          ),
        }))
        .orderBy('callOcrTime', ['desc'])
        .value() || [];

    yield put({
      type: 'saveDatas',
      payload: {
        datas: list,
      },
    });
  }
}
