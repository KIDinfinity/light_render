import { useEffect } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { CategoryCode } from '@/utils/constant/information';

const mockRes = {
  success: true,
  type: null,
  warnData: null,
  resultData: [
    {
      categoryCode: 'Auto UW Result',
      informationList: [
        {
          procActivityKey: 'BP_NB_ACT003',
          caseCategory: 'BP_NB_CTG001',
          creator: 'system',
          creationDate: '2021-09-23T23:36:40.000+0000',
          informationDOList: [
            {
              id: '0902aa52-d3b0-4978-a5ff-ac607f153cf1',
              creator: 'system',
              gmtCreate: '2021-09-23T23:36:40.000+0000',
              modifier: '0',
              gmtModified: '2021-09-23T23:36:40.000+0000',
              deleted: 0,
              transId: 'd4ab6b3d-c317-4dd0-bf8a-f29070e5f34b',
              category: 'Auto UW Result',
              processInstanceId: '6870314',
              procActivityKey: 'BP_NB_ACT003',
              effectiveDate: '2021-09-23T16:00:00.000+0000',
              expiryDate: '2998-12-31T16:00:00.000+0000',
              content: 'MISS SKI  Edward  nationality of residence not ph',
              requestType: 'BP_NB_CTG001',
              status: 'P',
              defaultDate: true,
              author: null,
              taskId: '6870340',
              readStatus: 0,
              readFlag: null,
              caseCategory: 'BP_NB_CTG001',
              reason: null,
              reasonType: null,
              itemCode: null,
              batchOrder: null,
              integrationCode: null,
              linkToInquiryNo: false,
              informationLinkToList: [
                {
                  id: '5f7bf130-986d-4ad9-8258-621e36222515',
                  informationId: '0902aa52-d3b0-4978-a5ff-ac607f153cf1',
                  linkToKey: 'case',
                  linkToValue: '6870314',
                },
              ],
              referenceCode: null,
            },
            {
              id: '51b0b4cd-2402-420b-9656-dcfc8585371a',
              creator: 'system',
              gmtCreate: '2021-09-23T23:36:40.000+0000',
              modifier: '0',
              gmtModified: '2021-09-23T23:36:40.000+0000',
              deleted: 0,
              transId: 'd4ab6b3d-c317-4dd0-bf8a-f29070e5f34b',
              category: 'Auto UW Result',
              processInstanceId: '6870314',
              procActivityKey: 'BP_NB_ACT003',
              effectiveDate: '2021-09-23T16:00:00.000+0000',
              expiryDate: '2998-12-31T16:00:00.000+0000',
              content: 'MR Bsa  Edward  nationality of residence not ph',
              requestType: 'BP_NB_CTG001',
              status: 'P',
              defaultDate: true,
              author: null,
              taskId: '6870340',
              readStatus: 0,
              readFlag: null,
              caseCategory: 'BP_NB_CTG001',
              reason: null,
              reasonType: null,
              itemCode: null,
              batchOrder: null,
              integrationCode: null,
              linkToInquiryNo: false,
              informationLinkToList: [
                {
                  id: '471e9059-d2f6-4ed8-994e-496a6f600211',
                  informationId: '51b0b4cd-2402-420b-9656-dcfc8585371a',
                  linkToKey: 'case',
                  linkToValue: '6870314',
                },
              ],
              referenceCode: null,
            },
            {
              id: '5f3ae782-ba11-4fa4-9623-a10a0f686b3c',
              creator: 'system',
              gmtCreate: '2021-09-23T23:36:40.000+0000',
              modifier: '0',
              gmtModified: '2021-09-23T23:36:40.000+0000',
              deleted: 0,
              transId: 'd4ab6b3d-c317-4dd0-bf8a-f29070e5f34b',
              category: 'Auto UW Result',
              processInstanceId: '6870314',
              procActivityKey: 'BP_NB_ACT003',
              effectiveDate: '2021-09-23T16:00:00.000+0000',
              expiryDate: '2998-12-31T16:00:00.000+0000',
              content: 'MISS SKI  Edward  country of residence not ph',
              requestType: 'BP_NB_CTG001',
              status: 'P',
              defaultDate: true,
              author: null,
              taskId: '6870340',
              readStatus: 0,
              readFlag: null,
              caseCategory: 'BP_NB_CTG001',
              reason: null,
              reasonType: null,
              itemCode: null,
              batchOrder: null,
              integrationCode: null,
              linkToInquiryNo: false,
              informationLinkToList: [
                {
                  id: 'b6fbc2ce-975c-4ea1-ae45-ecb1fc0122d4',
                  informationId: '5f3ae782-ba11-4fa4-9623-a10a0f686b3c',
                  linkToKey: 'case',
                  linkToValue: '6870314',
                },
              ],
              referenceCode: null,
            },
            {
              id: '968a588f-e4a4-49f7-a864-24898af8c6c1',
              creator: 'system',
              gmtCreate: '2021-09-23T23:36:40.000+0000',
              modifier: '0',
              gmtModified: '2021-09-23T23:36:40.000+0000',
              deleted: 0,
              transId: 'd4ab6b3d-c317-4dd0-bf8a-f29070e5f34b',
              category: 'Auto UW Result',
              processInstanceId: '6870314',
              procActivityKey: 'BP_NB_ACT003',
              effectiveDate: '2021-09-23T16:00:00.000+0000',
              expiryDate: '2998-12-31T16:00:00.000+0000',
              content: 'MR Bsa  Edward  country of residence not ph',
              requestType: 'BP_NB_CTG001',
              status: 'P',
              defaultDate: true,
              author: null,
              taskId: '6870340',
              readStatus: 0,
              readFlag: null,
              caseCategory: 'BP_NB_CTG001',
              reason: null,
              reasonType: null,
              itemCode: null,
              batchOrder: null,
              integrationCode: null,
              linkToInquiryNo: false,
              informationLinkToList: [
                {
                  id: '04c21edc-f561-4eb9-90c2-3fc5201f18e4',
                  informationId: '968a588f-e4a4-49f7-a864-24898af8c6c1',
                  linkToKey: 'case',
                  linkToValue: '6870314',
                },
              ],
              referenceCode: null,
            },
            {
              id: 'ac4c7a1d-3135-4921-96de-abbe6a16e2ab',
              creator: 'system',
              gmtCreate: '2021-09-23T23:36:40.000+0000',
              modifier: '0',
              gmtModified: '2021-09-23T23:36:40.000+0000',
              deleted: 0,
              transId: 'd4ab6b3d-c317-4dd0-bf8a-f29070e5f34b',
              category: 'Auto UW Result',
              processInstanceId: '6870314',
              procActivityKey: 'BP_NB_ACT003',
              effectiveDate: '2021-09-23T16:00:00.000+0000',
              expiryDate: '2998-12-31T16:00:00.000+0000',
              content: 'Integration failed',
              requestType: 'BP_NB_CTG001',
              status: 'P',
              defaultDate: true,
              author: null,
              taskId: '6870340',
              readStatus: 0,
              readFlag: null,
              caseCategory: 'BP_NB_CTG001',
              reason: null,
              reasonType: null,
              itemCode: null,
              batchOrder: null,
              integrationCode: null,
              linkToInquiryNo: false,
              informationLinkToList: [
                {
                  id: 'd286f8a5-3a4d-48c1-927f-6e1670e4e888',
                  informationId: 'ac4c7a1d-3135-4921-96de-abbe6a16e2ab',
                  linkToKey: 'case',
                  linkToValue: '6870314',
                },
              ],
              referenceCode: null,
            },
          ],
        },
      ],
    },
    {
      categoryCode: 'ExceptionalMessage',
      informationList: [
        {
          procActivityKey: 'BP_NB_ACT003',
          caseCategory: 'BP_NB_CTG001',
          creator: 'system',
          creationDate: '2021-09-23T23:36:40.000+0000',
          informationDOList: [
            {
              id: '92b47dbd-cc4a-4361-b89d-bb5ecf2450cf',
              creator: 'system',
              gmtCreate: '2021-09-23T23:36:40.000+0000',
              modifier: '0',
              gmtModified: '2021-09-23T23:36:40.000+0000',
              deleted: 0,
              transId: 'd4ab6b3d-c317-4dd0-bf8a-f29070e5f34b',
              category: 'ExceptionalMessage',
              processInstanceId: '6870314',
              procActivityKey: 'BP_NB_ACT003',
              effectiveDate: '2021-09-23T16:00:00.000+0000',
              expiryDate: '2998-12-31T16:00:00.000+0000',
              content:
                'IntegrationClient#start(IntegrationRequestVO) timed-out and no fallback available.',
              requestType: null,
              status: 'P',
              defaultDate: true,
              author: null,
              taskId: '6870340',
              readStatus: 0,
              readFlag: null,
              caseCategory: 'BP_NB_CTG001',
              reason: null,
              reasonType: null,
              itemCode: null,
              batchOrder: null,
              integrationCode: null,
              linkToInquiryNo: false,
              informationLinkToList: [
                {
                  id: 'd087279c-8fd2-46b4-9da0-b8707afbfc39',
                  informationId: '92b47dbd-cc4a-4361-b89d-bb5ecf2450cf',
                  linkToKey: 'case',
                  linkToValue: '6870314',
                },
              ],
              referenceCode: null,
            },
          ],
        },
      ],
    },
  ],
  promptMessages: [null],
};
export default () => {
  const dispatch = useDispatch();
  return useEffect(() => {
    const allCategoryHistory = lodash
      .chain(mockRes)
      .get('resultData')
      .map((item: any) => {
        // 由于chat link 过来的information格式不同此处加入额外逻辑
        return {
          ...item,
          informationList: lodash.map(item?.informationList, (informationListItem: any) => {
            return {
              ...informationListItem,
              informationDOList: lodash.map(
                informationListItem?.informationDOList,
                (informationDOListItem: any) => {
                  if (informationDOListItem?.category === CategoryCode.BusinessCheck) {
                    const RegDocType = new RegExp(/(?<=\[)(.*?)(?=\])/g);
                    const documentTypeCode = informationDOListItem?.content?.match(RegDocType)?.[0];
                    const newContent = informationDOListItem?.content?.replace?.(
                      documentTypeCode,
                      formatMessageApi({
                        documentType_i18n: documentTypeCode,
                      })
                    );
                    return {
                      ...informationDOListItem,
                      content: newContent,
                      contentType: 'normal',
                    };
                  }

                  return {
                    ...informationDOListItem,
                    contentType: 'normal',
                  };
                }
              ),
            };
          }),
        };
      })
      .value();
    dispatch({
      type: 'navigatorInformationController/setAllCategoryHistory',
      payload: {
        allCategoryHistory,
      },
    });
  }, []);
};
