import { useEffect } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { allCategoryInformation } from '@/services/bpmInfoControllerService';
import { NAMESPACE } from '../activity.config';

type Res = {
  success: boolean;
  resultData: {
    categoryCode: string;
    informationList: {
      procActivityKey: string;
      caseCategory: string;
      recordFormatting: string | null;
      creator: string;
      creationDate: string;
      informationDOList: {
        id: string;
        creator: string;
        gmtCreate: string;
        modifier: string;
        gmtModified: string;
        deleted: number;
        transId: string;
        category: string;
        processInstanceId: string;
        effectiveDate: string;
        expiryDate: string;
        content: string;
        requestType: string | null;
        status: string;
        defaultDate: boolean;
        author: string | null;
        taskId: string;
        readStatus: number;
        readFlag: number;
        caseCategory: string;
        reason: string | null;
        reasonType: string | null;
        itemCode: string | null;
        batchOrder: number | null;
        integrationCode: string | null;
        linkToInquiryNo: boolean;
        integrationProcessKey: string | null;
        sendEmail: number;
        informationLinkToList: {
          id: string;
          informationId: string;
          linkToKey: string;
          linkToValue: string;
        }[];
        referenceCode: string | null;
        businessCode: string | null;
        creatorName: string | null;
        infoReasons: {
          id: string;
          creator: string;
          gmtCreate: string;
          modifier: string;
          gmtModified: string;
          deleted: number;
          transId: string;
          caseNo: string;
          taskId: string;
          businessNo: string;
          inquiryBusinessNo: string;
          categoryCode: string | null;
          reasonType: string;
          reasonCode: string;
          reasonTypeOrder: number | null;
          informationId: string;
          typeCode: string;
        }[] | null;
      }[];
    }[];
  }[];
};
export default () => {
  const taskDetail = useSelector((state: any) => state.processTask.getTask, shallowEqual);

  const dispatch = useDispatch();
  useEffect(() => {
    const paramSource = lodash.pick(taskDetail, ['caseNo', 'activityCode', 'inquiryBusinessNo']);
    (async () => {
      if (!lodash.isEmpty(paramSource)) {
        const params = {
          ...paramSource,
          platformCode: 'OPUS',
        };
        const response: Res = await allCategoryInformation(params);
        const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
        if (success) {
          const displayEscalateReason = lodash
            .chain(resultData)
            .find((item: any) => {
              return item.categoryCode === 'EscalateReason';
            })
            .get('informationList', [])
            .some((infoItem: any) => {
              return lodash
                .chain(infoItem)
                .get('informationDOList', [])
                .filter((doItem: any) => doItem.taskId === taskDetail.taskId)
                .some((doItem: any) => {
                  return lodash
                    .chain(doItem)
                    .get('infoReasons', [])
                    .some((reason: any) => reason.reasonCode === 'HIAPV')
                    .value();
                })
                .value();
            })
            .value();

          dispatch({
            type: `${NAMESPACE}/saveDisplayEscalateReason`,
            payload: {
              displayEscalateReason,
            },
          });
        }
      }
    })();
  }, [taskDetail]);
};
