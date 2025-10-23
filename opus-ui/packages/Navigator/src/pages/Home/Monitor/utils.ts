import { notification } from 'antd';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { LS, LSKey } from '@/utils/cache';

const copy = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);

  // 选择并复制文本
  textarea.select();

  if (document.execCommand('copy')) {
    document.execCommand('copy');
  }
  document.body.removeChild(textarea);
  notification.success({ message: 'Copy Success' });
};

const filterEmptyValue = (obj) => {
  let data = obj;
  try {
    data = Object.fromEntries(
      Object.entries(obj || {}).filter(
        ([key, value]) => !lodash.isEmpty(value) || lodash.isBoolean(value)
      )
    );
  } catch (error) {}
  return data;
};

const value2Arr = (obj) => {
  try {
    return Object.fromEntries(
      Object.entries(obj || {}).map(([key, value]) => {
        return typeof value === 'string'
          ? [key, (value as string).split(',').filter((i) => !!i)]
          : [key, value];
      })
    );
  } catch (error) {
    return obj;
  }
};

const monitorParams = (monitorItemCode, newParams) => {
  const currentUser = LS.getItem(LSKey.CURRENTUSER);
  const userId = lodash.get(currentUser, 'userId', '');
  return [
    {
      regionCode: tenant.region(),
      apiCode: null,
      asyncCall: null,
      monitorItemCode: monitorItemCode,
      realTime: false,
      requestData: newParams,
      asyncQuery: { url: null, asyncTraceId: null },
    },
    {
      headers: {
        'x-region': tenant.region(),
        'x-tenant': lodash.lowerCase(tenant.region()),
        'x-user-id': userId,
      },
    },
  ];
};
export { copy, filterEmptyValue, monitorParams, value2Arr };
