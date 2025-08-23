import React from 'react';
import { Button } from 'antd';
import { history } from 'umi';
import { tenant, Region } from '@/components/Tenant';
import { SS, SSKey, LS, LSKey } from '@/utils/cache';
import { setLoginPathname } from '@/utils/loginUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useThrottleFn } from 'ahooks';
import { Mode } from '@/layouts/LoginLayout/LoginMode';
import styles from './index.less';

const LoginSSO = ({ setIsAccount }: any) => {
  const ssoRegion = tenant.loginMode()?.ssoConfig?.ssoRegion || [];

  const { run } = useThrottleFn(
    (region: string) => {
      tenant.region({
        [Region.MY]: () => {
          LS.setItem(LSKey.LOGIN_MODE, {
            region: region.toUpperCase(),
            type: Mode.ACCOUNT,
          });
        },
      });
      if (region === Region.HK) {
        setIsAccount(true);
      } else {
        SS.setItem(SSKey.CONFIGS, {
          ...SS.getItem(SSKey.CONFIGS),
          region,
        });
        history.push('/navigator');
      }
    },
    { wait: 500 }
  );
  return (
    <div className={styles.containerSSO}>
      {ssoRegion.map((item: string) => (
        <Button
          className={styles.button}
          shape="round"
          key={item}
          block
          onClick={() => {
            setLoginPathname();
            run(item);
          }}
        >
          {formatMessageApi({ DropDown_COM_Region: item })}
        </Button>
      ))}
    </div>
  );
};

export default LoginSSO;
