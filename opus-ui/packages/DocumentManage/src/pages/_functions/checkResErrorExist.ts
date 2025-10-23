import lodash from 'lodash';
import { EErrorResCodes } from '../_dto/enums';

const checkResErrorExist = (resData: any): string[] => {
  if (!lodash.isPlainObject(resData)) return [];
  return lodash
    .chain(resData)
    .entries()
    .map(([key, value]) => {
      if (value === EErrorResCodes.uploadFailed) return key;
      return null;
    })
    .compact()
    .value();
};

export default checkResErrorExist;
