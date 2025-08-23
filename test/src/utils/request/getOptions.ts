import { v4 as uuid4 }  from 'uuid';
import queryString from 'query-string';
import { tenant } from '@/components/Tenant';
import { safeParseUtil } from '@/utils/utils';
import formDataToJson from './formDataToJson';
import Method from './method';
import getUrlParams from './getUrlParams';
import transferHeaders from './transferHeaders';
import { LS, LSKey } from '@/utils/cache';
import { get, lowerCase } from 'lodash';
/**
 * @options 接口传过来的option
 * swagger生成GET的不带method
 */
export default (option: any, url: string) => {
  let params = !option.method ? getUrlParams(url) : {};
  const isUseBody = [Method.POST, Method.PUT, Method.DELETE].includes(option.method);

  const regionHeaders = option?.useRegionHeader
    ? {
        'x-region': tenant.region(),
        'x-tenant': lowerCase(tenant.region()),
        'x-user-id': get(LS.getItem(LSKey.CURRENTUSER), 'userId', ''),
      }
    : {};

  const newOptions = {
    expirys: !!option.expirys,
    credentials: 'include',
    ...option,
    headers: isUseBody
      ? {
          Accept: 'application/json',
          traceId: uuid4(),
          'Accept-Language': tenant.getRemoteLang(),
          ...regionHeaders,
          ...option.headers,
        }
      : {
          ...regionHeaders,
        },
  };
  if (typeof option?.body?.intactAction === 'function') {
    newOptions.intactAction = option?.body?.intactAction;
    delete option?.body?.intactAction;
  }

  delete newOptions.localCache;
  if (isUseBody) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers['Content-Type'] = 'application/json; charset=utf-8';
      if (newOptions.body && typeof newOptions.body === 'object') {
        newOptions.body = JSON.stringify(newOptions.body);
      }
      params = safeParseUtil(newOptions.body);
    } else if (!newOptions?.body?.has('file')) {
      params = formDataToJson(newOptions.body);
      newOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
      newOptions.body = queryString.stringify(params);
    }
  }

  return transferHeaders(newOptions, params);
};
