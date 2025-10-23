import { v4 as uuidv4 } from 'uuid';
import queryString from 'query-string';
import { tenant } from '@/components/Tenant';
import { safeParseUtil } from '@/utils/utils';
import formDataToJson from './formDataToJson';
import Method from './method';
import getUrlParams from './getUrlParams';
import transferHeaders from './transferHeaders';
/**
 * @options 接口传过来的option
 * swagger生成GET的不带method
 */
export default (option: any, url: string) => {
  let params = !option.method ? getUrlParams(url) : {};
  const isUseBody = [Method.POST, Method.PUT, Method.DELETE].includes(option.method);
  const newOptions = {
    expirys: !!option.expirys,
    credentials: 'include',
    ...option,
    headers: isUseBody
      ? {
          Accept: 'application/json',
          traceId: uuidv4(),
          'Accept-Language': tenant.getRemoteLang(),
          ...option.headers,
        }
      : {},
  };

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
