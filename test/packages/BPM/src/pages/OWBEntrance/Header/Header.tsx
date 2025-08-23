import React from 'react';
import lodash from 'lodash';
import Title from './Title';
import Info from './Info';
import owbHeaderStyles from './Header.less';
import opusHeaderStyles from './OpusHeader.less';
import isOpus from '@/utils/isOpus';

interface IProps {
  title: string;
  status: string;
  urgent: boolean;
  slaTime: number | boolean;
  headerInfoConfig?: any[];
  headerInfoRender?: any;
  defaultHeader?: any;
  appealFlag?: any;
  overdueTimeRender?: string;
  indicator?: any;
}

export default React.memo(
  ({
    title = '',
    status = '',
    urgent = false,
    slaTime = 0,
    headerInfoConfig,
    headerInfoRender,
    defaultHeader,
    appealFlag,
    overdueTimeRender,
    indicator = {},
  }: IProps) => {
    let info;
    if (React.isValidElement(headerInfoRender)) {
      info = headerInfoRender;
    } else if (lodash.isArray(headerInfoConfig)) {
      info = <Info headerInfoConfig={headerInfoConfig} indicator={indicator} />;
    } else {
      info = defaultHeader;
    }

    const useOpusStyle = isOpus();
    const styles = useOpusStyle ? opusHeaderStyles : owbHeaderStyles;
    return (
      <div className={styles.header} data-role="bpmHeader">
        <div className={styles.content}>
          <Title
            title={title}
            status={status}
            urgent={urgent}
            slaTime={slaTime}
            appealFlag={appealFlag}
            overdueTimeRender={overdueTimeRender}
          />
          {info}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => lodash.isEqual(prevProps, nextProps)
);
