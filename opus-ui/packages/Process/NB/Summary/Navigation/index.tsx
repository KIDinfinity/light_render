import React from 'react';
import lodash from 'lodash';
import config from './config';
import styles from './index.less';
import { Icon } from 'antd';
import useHandleNavigationCallback from 'summary/hooks/useHandleNavigationCallback';
import useJudgeDisplayFundSection from 'process/NB/ManualUnderwriting/_hooks/useJudgeDisplayFundSection';

const Navigation = () => {
  const handleNavigation = useHandleNavigationCallback();
  const displayFund = useJudgeDisplayFundSection();

  return (
    <div className={styles.container}>
      {React.useMemo(() => {
        return lodash
          .chain(config)
          .filter((item: any) => {
            if (item?.name === 'fund' && !displayFund) {
              return false;
            }
            return true;
          })
          .map((item: any) => {
            // const SvgIcon = React.lazy(() =>
            //   import(`!@svgr/webpack?modules!process/assets/${item.icon}.svg`)
            // );
            return (
              <div
                className={styles.bar}
                key={item?.name}
                onClick={() => {
                  handleNavigation({ link: item?.link });
                }}
              >
                <React.Suspense fallback={null}>{item.iconComponent && <Icon component={item.iconComponent} className={styles.icon}/>}</React.Suspense>
                {/* <Icon component={SvgIcon} className={styles.icon} /> */}
                <span className={styles.span}>{item.title}</span>
              </div>
            );
          })
          .value();
      }, [displayFund, handleNavigation])}
    </div>
  );
};
Navigation.displayName = 'navigation';

export default Navigation;
