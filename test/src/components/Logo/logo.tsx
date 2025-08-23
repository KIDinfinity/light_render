/* eslint-disable no-nested-ternary */
import React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import { tenant } from '@/components/Tenant';
import { LSKey } from '@/utils/cache';
import fwdLogoDark from '../../assets/public/fwd-logo-dark.png';
import sitLogoLight from '../../assets/public/sit-logo-light.png';
import sitLogoDark from '../../assets/public/sit-logo-dark.png';
import uatLogoLight from '../../assets/public/uat-logo-light.png';
import uatLogoDark from '../../assets/public/uat-logo-dark.png';
import styles from './logo.less';
import homeLogolight from '../../assets/en-US/logo-fwd-new.png';
import homeLogowhite from '../../assets/en-US/logo-fwd-white.png';
import homeLogo from '../../assets/en-US/logo-fwd.png';
import { ReactComponent as LoginLogo } from '../../assets/public/login-logo.svg';
import PageEnum from './Enum/pageEnum';
import { LS } from '@/utils/cache';

// type - 路由分类(必传);
// sideOpen - 侧边栏是否打开(非必传);
// theme - 主题(非必传);
// handleClick - 点击事件(非必传);
interface ISProps {
  type: string;
  sideOpen?: boolean;
  handleClick?: any;
  thLogin: boolean;
}

export default ({ type, sideOpen = false, thLogin = false }: ISProps) => {
  const theme = LS.getItem(LSKey.THEME, false);
  const activeProfile = tenant.activeProfile();
  const isSIT = activeProfile === 'SIT';
  const isUAT = activeProfile === 'UAT';
  const detailDarkPage = isSIT ? sitLogoDark : isUAT ? uatLogoDark : fwdLogoDark;
  const detailLightPage = isSIT ? sitLogoLight : isUAT ? uatLogoLight : homeLogolight;
  const renderImg = () => {
    switch (type) {
      case PageEnum.LoginPage:
        return thLogin ? (
          <div className={styles.thLoginLogo}>
            <img src={fwdLogoDark} alt="" />
          </div>
        ) : (
          <Icon component={LoginLogo} className={styles.loginLogo} />
        );
      case PageEnum.HomePage:
        return (
          <div className={styles.homePageWrap}>
            <img
              alt="logo"
              src={theme === 'dark' ? homeLogolight : theme === 'news' ? homeLogowhite : homeLogo}
            />
          </div>
        );
      case PageEnum.TaskPage:
        return sideOpen ? (
          <div
            className={classnames({
              [styles.layoutCompress]: !isSIT && !isUAT,
              [styles.layoutCompressSitLogo]: isSIT,
              [styles.layoutCompressUatLogo]: isUAT,
            })}
          />
        ) : (
          <div
            className={classnames({
              [styles.layoutLogo]: !isSIT && !isUAT,
              [styles.layoutUatLogo]: isUAT,
              [styles.layoutSitLogo]: isSIT,
            })}
          />
        );
      case PageEnum.NavigatorPage:
        return sideOpen ? (
          <div
            className={classnames({
              [styles.header]: !isSIT && !isUAT,
              [styles.uatHeader]: isSIT,
              [styles.sitHeader]: isUAT,
            })}
          />
        ) : (
          <div
            className={classnames({
              [styles.header]: !isSIT && !isUAT,
              [styles.uatHeader]: isUAT,
              [styles.sitHeader]: isSIT,
            })}
          />
        );
      case PageEnum.ReportCenterPage:
        return <div className={styles.reportCenterLogo} />;
      case PageEnum.DetailPage:
        return <img src={theme === 'dark' ? detailLightPage : detailDarkPage} alt="" />;
      default:
        return null;
    }
  };
  return <>{renderImg()}</>;
};
