// @ts-nocheck
import { HotkeyProvider } from '@/components/Hotkey/login/view';
import Logo from '@/components/Logo/logo';
import { Region, tenant } from '@/components/Tenant';
import { LS, LSKey, SS, SSKey } from '@/utils/cache';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import isOpus from '@/utils/isOpus';
import classnames from 'classnames';
import lodash from 'lodash';
import { parse } from 'qs';
import React, { useEffect, useMemo, useState } from 'react';
import Title from '../components/Title';
import CopyRight from './CopyRight';
import styles from './index.less';
import LoginContent from './LoginContent';
import LoginMode, { Mode } from './LoginMode';
import LoginSSO from './LoginSSO';
import isSupportCenter from '@/utils/isSupportCenter';

const LoginLayout = ({ children }: any) => {
  const [ready, setReady] = useState(false);
  const config = useMemo(() => SS.getItem(SSKey.CONFIGS), []);
  const configMode = useMemo(() => LS.getItem(LSKey.LOGIN_MODE), []);
  const [loginMode, setLoginMode] = useState('');
  const [isAccount, setIsAccount] = useState(false);
  const isOpenSso = config?.loginMode?.ssoConfig?.isOpenSso;

  const toggleMode = () => {
    if (!ready) {
      setReady(true);
    }

    setLoginMode(loginMode === Mode.ACCOUNT ? Mode.SSO : Mode.ACCOUNT);
    setIsAccount(loginMode === Mode.ACCOUNT);
  };

  useEffect(() => {
    const params = parse(window.location.href.split('?')[1]);
    const model = lodash.has(params, 'model')
      ? Mode.ACCOUNT
      : configMode?.type || (isOpenSso ? Mode.SSO : Mode.ACCOUNT);
    setLoginMode(model);
    setIsAccount(model === Mode.ACCOUNT);
  }, [configMode, isOpenSso]);

  const showOpus = isOpus();
  const showSupportCenter = isSupportCenter();

  // for TH Opus or support center
  if (showOpus || showSupportCenter) {
    return <div>{children}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.main}>
          <LoginMode toggleMode={toggleMode} />
          <div
            className={classnames({
              [styles.loginContainer]: true,
              [styles.ready]: ready,
              [styles.account]: isAccount,
              [styles.sso]: !isAccount,
            })}
          >
            <Title />
            <div className={styles.logo}>
              <Logo type="0" thLogin={tenant.region() === Region.TH} />
              <div className={styles.credentials}>
                {tenant.region() !== Region.TH &&
                  formatMessageApi({ Label_BIZ_Claim: 'app.login.tab-login-credentials' })}
              </div>
            </div>
            <div className={styles.contentBox}>
              <HotkeyProvider>
                <LoginContent isAccount={isAccount} ready={ready} mode={Mode.ACCOUNT}>
                  {children}
                </LoginContent>
                <LoginContent isAccount={isAccount} ready={ready} mode={Mode.SSO}>
                  <LoginSSO setIsAccount={setIsAccount} />
                </LoginContent>
              </HotkeyProvider>
              <div className={styles.copyright}>
                <CopyRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
