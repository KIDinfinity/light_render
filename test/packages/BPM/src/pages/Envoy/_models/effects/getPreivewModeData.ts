import { handleMessageModal, handleWarnMessageModal } from '@/utils/commonMessage';
import envoyReasonGroupPreviewControllerService from '@/services/envoyReasonGroupPreviewControllerService';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { validateResErrorTypeError, validateResErrorTypeWarn } from '@/utils/utils';

interface IAction {
  payload: {
    show: boolean;
    previewResolve: any;
    reasonGroup: any;
    title: string;
  };
}

function* getPreivewModeData({ payload }: IAction, { call, put }: any) {
  const { show, previewResolve, reasonGroup, title } = payload;

  yield put({
    type: 'changePreivewModeShow',
    payload: {
      show,
    },
  });

  const params = yield put.resolve({
    type: 'getSendEnvoyData',
    payload: {
      reasonGroup,
    },
  });

  // @ts-ignore
  const response = yield call(
    envoyReasonGroupPreviewControllerService.getCorrespondencePreviewData,
    params
  );

  if (!response?.success) {
    yield put({
      type: 'clearPreivewModeData',
    });
    //当通过validateResErrorTypeError校验时不需要弹窗，会重复,validateResErrorTypeWarn也是在公共方法有处理
    if (!validateResErrorTypeError(response) && !validateResErrorTypeWarn(response)) {
      handleMessageModal(response?.promptMessages);
    }
  } else if (
    lodash.isEmpty(response?.resultData?.letters) ||
    lodash.every(
      response?.resultData?.letters,
      (item) => !['email', 'sms', 'doc'].includes(item.letterType)
    )
  ) {
    yield put({
      type: 'clearPreivewModeData',
    });
    handleWarnMessageModal(
      [
        {
          content: formatMessageApi({
            Label_COM_WarningMessage: 'MSG_000788',
          }),
        },
      ],
      {
        okFn: () => {
          previewResolve({ result: true, data: {} });
        },
        cancelFn: () => {},
      }
    );
  } else {
    yield put({
      type: 'savePreviewModeData',
      payload: {
        previewResolve,
        prevewModeData: response?.resultData,
        title,
      },
    });
    yield put({
      type: 'savePreviewSelectLetter',
      payload: {
        index:
          lodash
            .get(response?.resultData, 'letters', [])
            .findIndex((item) => ['email'].includes(item.letterType)) > -1
            ? lodash
                .get(response?.resultData, 'letters', [])
                .findIndex((item) => ['email'].includes(item.letterType))
            : 0,
      },
    });
  }
}

export default getPreivewModeData;
