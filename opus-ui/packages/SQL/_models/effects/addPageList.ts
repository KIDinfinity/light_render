import { lowerCase } from 'lodash';
import getUploadList from '../../utils/getUploadList';

export default function* ({ payload ,search}: any, { put }: any): any {
  const { dataSource, fileList, regions } = payload;
  const pageList = yield getUploadList({ dataSource, fileList, regions: regions?.map((el: string) => lowerCase(el))?.join(',') })

  yield put({
    type: 'savePageList',
    payload: {
      pageList
    }
  })

  const needUpload = pageList?.filter((el: any) => el.loading);
  if (needUpload?.length) {
    yield put({
      type: 'spliceUpload',
      payload: {
        needUpload,
        search
      },
    });
  }

}
