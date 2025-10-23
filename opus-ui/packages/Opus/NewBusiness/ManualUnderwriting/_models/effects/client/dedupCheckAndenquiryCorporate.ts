import { dedupCheckAndenquiryCorporate } from '@/services/owbNbProposalControllerService';
import handleMessageModal from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { companyRegistrationNumber } = payload;
  const processData = yield select(({ [NAMESPACE]: model }: any) => {
    return model.processData;
  });
  const applicationNo = processData?.applicationNo;
  const response = yield call(dedupCheckAndenquiryCorporate, {
    companyRegistrationNumber,
    applicationNo,
  });
  if (!!response?.success) {
    yield call(handleMessageModal, formatMessageApi({ Label_COM_Message: 'MSG_001289' }), {
      onOk: () => {
        console.log({ response });
      },
    });
  } else {
    console.log({ response, message: formatMessageApi({ Label_COM_Message: 'MSG_001290' }) });
    yield call(handleMessageModal, formatMessageApi({ Label_COM_Message: 'MSG_001290' }));
  }
}
