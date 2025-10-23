import React from 'react';
import { Icon } from 'antd';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import GlobalFooter2 from '@/components/GlobalFooter2';

const links = [
  {
    key: 'help',
    title: formatMessageApi({ Label_BIZ_Claim: 'layout.workspace-user-login.link.help' }),
    href: '',
  },
  {
    key: 'privacy',
    title: formatMessageApi({ Label_BIZ_Claim: 'layout.workspace-user-login.link.privacy' }),
    href: '',
  },
  {
    key: 'terms',
    title: formatMessageApi({ Label_BIZ_Claim: 'layout.workspace-user-login.link.terms' }),
    href: '',
  },
];

const CopyRight = () => {
  return (
    <GlobalFooter2
      // @ts-ignore
      links={links}
      copyright={formatMessageApi(
        {
          Label_BIZ_Claim: 'layout.workspace-user-login.copyright',
        },
        '{0}',
        moment().year()
      )}
      icon={<Icon type="copyright" />}
    />
  )
}

export default CopyRight;
