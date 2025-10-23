import lodash from 'lodash';
import { LS, LSKey } from '@/utils/cache';

export function getAuthority(str: string) {
  const authority: string | string[] = str || LS.getItem(LSKey.AUTHORITY);
  if (lodash.isString(authority)) {
    return [authority];
  }

  return authority;
}

export function setAuthority(authority: string | string[]) {
  let proAuthority: string[] = [];
  if (lodash.isArray(authority)) {
    proAuthority = authority as string[];
  } else if (lodash.isString(authority)) {
    proAuthority = [authority as string];
  }
  proAuthority = lodash.uniq(lodash.compact(proAuthority));

  return LS.setItem(LSKey.AUTHORITY, proAuthority);
}
