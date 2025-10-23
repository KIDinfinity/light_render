// sso登陆失败重定向到登陆
import { tenant } from '@/components/Tenant';
import { SS, SSKey } from '@/utils/cache';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getLoginPath } from '@/utils/loginUtils';
import lodash from 'lodash';

interface IProps {
  response: any;
  api: string;
  redirectUrl: string;
}

export default ({ response, api, redirectUrl }: IProps) => {
  if (!response?.success && lodash.isObject(response?.resultData)) {
    const content = response?.resultData?.content;
    const userId = response?.resultData?.userId;
    let message = `SSO login failed!(status:200;url:${api};content:${content})`;

    if (content && !lodash.isEmpty(content) && tenant.isJP() && tenant.isID()) {
      const formatMessage = formatMessageApi({
        Label_COM_Message: content,
      });
      message = content === 'MSG_000265' ? `(${userId})${formatMessage}` : formatMessage;
    }

    SS.setItem(SSKey.SSOLOGIN_RESULT, {
      success: false,
      message,
    });

    let redirect = redirectUrl;
    const urlRegion = tenant.getUrlRegion();
    if (urlRegion) {
      redirect = redirect.replace(new RegExp(`/${urlRegion}`, 'i'), '');
    }
    const href = getLoginPath(false, redirect);

    window.location.href = href;
  }
};
