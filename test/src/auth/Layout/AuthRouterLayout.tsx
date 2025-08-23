import React, { useState, useEffect } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import classNames from 'classnames';
import { UrlCodeEnum } from '../Constant';
import NoPermission from '../Exceptions/NoPermission';
import { getAuth } from '../Utils';
import styles from './AuthRouterLayout.less';

const autoUrls = [
  {
    url: '/configuration',
    authorityCode: UrlCodeEnum.Configuration,
  },
  {
    url: '/integration',
    authorityCode: UrlCodeEnum.Integration,
  },
  {
    url: '/swagger',
    authorityCode: UrlCodeEnum.Swagger,
  },
  {
    url: '/manuallyWorkflowControl',
    authorityCode: UrlCodeEnum.ManuallyWorkflow,
  },
  {
    url: '/dashboard',
    authorityCode: UrlCodeEnum.Dashboard,
  },
];
const whiteList = ['/navigator/configuration'];

export default ({ children, isReady }: any) => {
  const [hasAuto, setHasAuto] = useState(true);
  const commonAuthorityList = useSelector((state: any) => state.authController.commonAuthorityList);
  useEffect(() => {
    if (
      lodash
        .chain(whiteList)
        .find((el: any) => window.location.pathname.toLowerCase().includes(el))
        .value()
    ) {
      setHasAuto(true);
      return;
    }
    const autoItem: any =
      lodash
        .chain(autoUrls)
        .find((el: any) => window.location.pathname.toLowerCase().includes(el?.url.toLowerCase()))
        .value() || {};

    if (
      !lodash.isEmpty(autoItem) &&
      !getAuth(commonAuthorityList, {
        authorityCode: autoItem?.authorityCode,
      })
    ) {
      setHasAuto(false);
    } else {
      setHasAuto(true);
    }
  }, [commonAuthorityList, window.location.pathname.toLowerCase()]);
  return hasAuto || !isReady ? (
    children
  ) : (
    <div className={styles.layout}>
      <div className={classNames(styles.container, 'ant-layout')}>
        <div className={styles.main}>
          <NoPermission />
        </div>
      </div>
    </div>
  );
};
