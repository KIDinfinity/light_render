import objectToFormData from 'object-to-formdata'
import { upload } from '@/services/ccFileExecutorControllerService';
import handleMessageModal from '@/utils/commonMessage';

// eslint-disable-next-line func-names
export default function* ({ payload }: any, { put, call, all }: any): any {
  const { needUpload, search } = payload;

  function* uploadFile({ id, chunkList, uploadSlice }: any): any {
    const fileData = chunkList[uploadSlice];
    const {
      size,
      sliceNo,
      sliceCount,
      slice,
      regions,
      dataSource,
      fileType,
      fileChecksum,
      sliceChecksum,
    } = fileData;

    // @ts-ignore
    const response: any = yield call(
      upload,
      objectToFormData({
        file: slice,
        size,
        sliceNo,
        sliceCount,
        slice,
        regions,
        dataSource,
        fileType,
        fileChecksum,
        sliceChecksum
      })
    );

    if (response && response.success) {
      const isEndUpload = sliceCount === sliceNo;
      yield put({
        type: 'updatePageList',
        payload: {
          id,
          uploadSlice: sliceNo,
          loading: !isEndUpload
        }
      })
      if (!isEndUpload) {
        yield uploadFile({
          id,
          chunkList,
          uploadSlice: sliceNo
        })
      } else {
        yield put({
          type: 'removePageList',
          payload: { id }
        })
        search?.submit?.()
      }
    } else {
      yield put({
        type: 'saveUploadLoading',
        payload: {
          id,
          loading: false,
        }
      })
      handleMessageModal(response?.promptMessages);
    }
  }

  yield all(needUpload?.map((item: any) => {
    const { id, chunkList, uploadSlice } = item || {};
    return uploadFile({
      id,
      chunkList,
      uploadSlice,
    })
  }))

}
