import React from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import InfoItem from './InfoItem';
import styles from './Info.less';
import InfoLabel from 'bpm/pages/OWBEntrance/Header/InfoLabel';

interface Info {
  key: string;
  value: string;
  title: string;
  render?: Function;
  renderValue?: Function;
}

export default React.memo(
  ({ children, headerInfoConfig = [], className, indicator = {} }: any) => {
    const isShowLabelHead = !!indicator.caseLabelList?.length;
    const topMap = isShowLabelHead ? ['caseNo'] : [];
    const infoTop = lodash.reduce(
      headerInfoConfig,
      (newHeaderInfoConfig: any, item: any) => {
        return lodash.includes(topMap, item?.key)
          ? [...newHeaderInfoConfig, item]
          : newHeaderInfoConfig;
      },
      []
    );
    const infoBottom = lodash.reduce(
      headerInfoConfig,
      (newHeaderInfoConfig: any, item: any) => {
        return lodash.includes(topMap, item?.key)
          ? newHeaderInfoConfig
          : [...newHeaderInfoConfig, item];
      },
      []
    );
    if (React.Children.count(children)) {
      return (
        <div
          className={classnames({
            [styles.wrap]: true,
            [className]: className,
          })}
        >
          <div className={styles.info}>{children}</div>
        </div>
      );
    }
    return (
      <div
        className={classnames({
          [styles.wrap]: true,
          [styles.hasInfoLabel]: isShowLabelHead,
          [className]: className,
        })}
      >
        <div className={classnames(styles.info, infoTop)}>
          {lodash
            ?.chain(infoTop)
            ?.filter((info: Info) => lodash.isPlainObject(info))
            .map((info: Info) => <InfoItem {...info} />)
            .value()}
          <InfoLabel indicator={indicator} />
        </div>
        <div className={styles.info}>
          {lodash
            ?.chain(infoBottom)
            ?.filter((info: Info) => lodash.isPlainObject(info))
            .map((info: Info) => <InfoItem {...info} />)
            .value()}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => lodash.isEqual(prevProps, nextProps)
);
