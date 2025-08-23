import { query } from '@/services/owbQuestionnaireCaseQuestionnaireControllerService';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';

export default function* getAllQuestionConfig({ payload }: any, { select, put, call }: any) {
  const { inquiryBusinessNo, policyInfo, caseCategory } = payload;
  yield put({
    type: 'saveQuestionnaireKey',
    payload: { questionnaireKey: 'clientId' },
  });

  const result = yield call(query, {
    caseCategory,
    inquiryBusinessNo,
  });

  if (result.success && result?.resultData) {
    const newList = result?.resultData?.map((item) => {
      const clientId = item?.clientInfo?.clientId;
      const clientType = lodash
        .uniq(
          policyInfo?.policyClientRoleList?.reduce((r, c) => {
            if (c?.clientId === clientId) {
              r.push(c?.customerRole);
            }
            return r;
          }, [])
        )
        .join(',');
      const info =
        lodash.find(policyInfo.clientInfoList, (clientItem) => clientItem.clientId === clientId) ||
        {};

      return {
        questionnaireList: item?.questionnaireList?.map((questionnaireItem) => ({
          ...questionnaireItem,
          clientType,
        })),
        clientInfo: {
          ...item?.clientInfo,
          ...info,
          clientName: [
            tenant.isPH() ? info?.title : '',
            info.firstName,
            info.middleName,
            info.surname,
          ]
            .filter((item) => item)
            .join(' '),
        },
      };
    });

    yield put({
      type: 'saveAllQuestionConfig',
      payload: { customerQuestionnaireList: newList },
    });

    yield put({
      type: 'saveMaps',
    });

    yield put({
      type: 'initSelect',
      payload: {
        selectClient: result?.resultData?.[0]?.clientInfo?.clientId,
        selectQuestionnaire: result?.resultData?.[0]?.questionnaireList?.[0]?.questionnaireCode,
      },
    });
  }
}
