import envoyReasonGroupPreviewControllerService from '@/services/envoyReasonGroupPreviewControllerService';
import lodash from 'lodash';

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

  // if (!response?.success) {
  //   yield put({
  //     type: 'clearPreivewModeData',
  //   });
  //   handleMessageModal(response?.promptMessages);
  // } else if (
  //   lodash.isEmpty(response?.resultData?.letters) ||
  //   lodash.every(
  //     response?.resultData?.letters,
  //     (item) => !['email', 'sms', 'doc'].includes(item.letterType)
  //   )
  // ) {
  //   console.log('@@@???', title, response?.resultData?.letters);
  //   yield put({
  //     type: 'clearPreivewModeData',
  //   });
  //   handleWarnMessageModal(
  //     [
  //       {
  //         content: formatMessageApi({
  //           Label_COM_WarningMessage: 'MSG_000788',
  //         }),
  //       },
  //     ],
  //     {
  //       okFn: () => {
  //         previewResolve({ result: true, data: {} });
  //       },
  //       cancelFn: () => {},
  //     }
  //   );
  // } else {
  //   yield put({
  //     type: 'savePreviewModeData',
  //     payload: {
  //       previewResolve,
  //       prevewModeData: response?.resultData,
  //       title,
  //       id: reasonGroup?.id,
  //     },
  //   });
  //   yield put({
  //     type: 'savePreviewSelectLetter',
  //     payload: {
  //       index:
  //         lodash
  //           .get(response?.resultData, 'letters', [])
  //           .findIndex((item) => ['email'].includes(item.letterType)) > -1
  //           ? lodash
  //               .get(response?.resultData, 'letters', [])
  //               .findIndex((item) => ['email'].includes(item.letterType))
  //           : 0,
  //     },
  //   });
  // }
  if (
    response?.success &&
    (!lodash.isEmpty(response?.resultData?.letters) ||
      lodash.some(response?.resultData?.letters, (item) =>
        ['email', 'sms', 'doc'].includes(item.letterType)
      ))
  ) {
    yield put({
      type: 'savePreviewModeData',
      payload: {
        previewResolve,
        prevewModeData: response?.resultData,
        title,
        id: reasonGroup?.id,
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
  return response;
}

export default getPreivewModeData;
