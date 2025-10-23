import { saveInformation } from '@/services/navigatorInformationControllerV2Service';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import InformationCategory from 'opus/NewBusiness/Enum/InformationCategory';

export default function* ({ payload }: any, { call, put, select }: any) {
  const userId = yield select((state) => state.user.currentUser.userId);
  const businessData = yield select((state: any) => state.processTask.getTask);

  const categoryReasons = yield select(
    (state: any) => state.newBusinessManualUnderwriting.categoryReasons || [{}]
  );
  const formData = yield select(
    (state: any) => state.newBusinessManualUnderwriting?.informationForm
  );
  const formInfo = formUtils.cleanValidateData(formData);

  const submitData = {
    author: userId,
    procActivityKey: businessData?.activityKey,
    category: 'QAFail',
    effectiveDate: Date.now(),
    expiryDate: 32503564800000,
    content: `<p><i>${formInfo?.comment || ''}</i></p>`,
    informationLinkToList: [
      {
        linkToKey: 'case',
        linkToValue: businessData?.caseNo,
      },
    ],
    infoReasons: [
      {
        categoryCode: InformationCategory.QAFail,
        modifier: userId,
        reasonCode: formInfo?.reason,
        reasonType: categoryReasons[0]?.fieldName,
        reasonTypeOrder: categoryReasons[0]?.reasonTypeOrder,
        ...lodash.pick(businessData, [
          'businessNo',
          'caseCategory',
          'caseNo',
          'businessCode',
          'inquiryBusinessNo',
          'processInstanceId',
          'taskId',
        ]),
      },
      {
        categoryCode: categoryReasons[1]?.fieldName,
        modifier: userId,
        reasonCode: formInfo?.error,
        reasonType: categoryReasons[1]?.fieldName,
        reasonTypeOrder: categoryReasons[1]?.reasonTypeOrder,
        ...lodash.pick(businessData, [
          'businessNo',
          'caseCategory',
          'caseNo',
          'businessCode',
          'inquiryBusinessNo',
          'processInstanceId',
          'taskId',
        ]),
      },
    ],
    status: 'P',
    defaultDate: 1,
    reason: formInfo?.reason,
    ...lodash.pick(businessData, [
      'businessCode',
      'processInstanceId',
      'taskId',
      'caseNo',
      'caseCategory',
    ]),
  };

  const response = yield call(saveInformation, { ...submitData });

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success) {
    return {
      success,
      resultData,
    };
  }
}
