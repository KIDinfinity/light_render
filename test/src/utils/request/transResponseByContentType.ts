import { chain } from 'lodash';
import downloadFileFromBlob from './downloadFileFromBlob';
/**
 * 根据response headers content-type 对response 做预处理
 * */
export default async (response: any) => {
  if (/integration\/v2\/test\//.test(response.url)) {
    const response2 = response.clone();
    let flag = false;
    let resData;
    await response.json().then(
      (res: any) => {
        flag = true;
        resData = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
    if (flag) {
      return resData;
    }
    return response2.blob().then((blob: any) => {
      return blob.text();
    });
  }

  const contentType = chain(response.headers.get('Content-Type')).split(';').get(0).value();
  switch (contentType) {
    case 'application/octet-stream':
      return response.blob().then((blob: any) => {
        downloadFileFromBlob({ blob, headers: response.headers });
        return blob;
      });
    case 'application/json':
      return response.json();
    default:
      return response;
  }
};
