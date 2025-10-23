import Config from '../config';

export default function* ({ payload }: any, { put }: any) {
  const { functionCode } = payload;
  if(Config(functionCode)?.resetPreview){
    yield put.resolve({
      type: Config(functionCode)?.resetPreview,
    });
  }

}
