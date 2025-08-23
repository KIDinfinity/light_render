import { sendEmail } from '@/services/bpmInfoControllerService';
import { handleMessageModal } from '@/utils/commonMessage';
import { notification } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default function* SendEmail({ payload }: any, { call, put, select }: any) {
  const { informationId, informationListIndex, categoryCode } = payload;
  const allCategoryHistory = yield select(
    (state: any) => state.navigatorInformationController?.allCategoryHistory
  );
  const response = yield call(sendEmail, { informationId });
  if (response.success && response.resultData) {
    yield put({
      type: 'setAllCategoryHistory',
      payload: {
        allCategoryHistory: allCategoryHistory?.map((item) => {
          if (item.categoryCode === categoryCode) {
            return {
              ...item,
              informationList: item?.informationList?.map((informationItem, informationIndex) => {
                if (informationIndex === informationListIndex) {
                  return {
                    ...informationItem,
                    informationDOList: informationItem?.informationDOList?.map((DOItem) => {
                      if (informationId === DOItem.id) {
                        return { ...DOItem, sendEmail: 1 };
                      }
                      return DOItem;
                    }),
                  };
                }
                return informationItem;
              }),
            };
          }
          return item;
        }),
      },
    });
    notification.success({ message: formatMessageApi({ Label_COM_Notification: 'MSG_000750' }) });
  }
  if (!response.success) {
    handleMessageModal(response?.promptMessages);
  }
  if (response.success && !response.resultData) {
    notification.error({ message: 'Send failed. Please try again.' });
  }
}
