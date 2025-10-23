import React from 'react';
import { useSelector } from 'dva';
import { Layout, Icon } from 'antd';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import GlobalFooter from '@/components/GlobalFooter';

export default () => {
  const isShowHeader = useSelector((state) => state.global.isShowHeader);

  return (
    isShowHeader && (
      <Layout.Footer style={{ padding: 0 }}>
        <GlobalFooter
          copyright={formatMessageApi(
            {
              Label_BIZ_Claim: 'layout.workspace-user-login.copyright',
            },
            '{0}',
            moment().year()
          )}
          icon={<Icon type="copyright" />}
        />
      </Layout.Footer>
    )
  );
};
