import React from 'react';
import { useSelector } from 'dva';
import { Layout, Icon } from 'antd';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import GlobalFooter from '@/components/GlobalFooter';
import { TableVersion } from 'navigator/enum/HomeTableVersion';

export default ({ className }: { className?: string }) => {
  const isShowHeader = useSelector((state) => state.global.isShowHeader);
  const tableVersion = useSelector((state: any) => state.navigatorHomeWatching.homeTableVersion);

  return (
    isShowHeader && (
      <Layout.Footer className={className}>
        {tableVersion !== TableVersion.V2 && (
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
        )}
      </Layout.Footer>
    )
  );
};
