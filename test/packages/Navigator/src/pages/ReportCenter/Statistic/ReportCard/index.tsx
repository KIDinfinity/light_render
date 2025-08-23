import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';

import ReportCardItem from './ReportCardItem';
import styles from './index.less';

interface IProps {
  collapseState: boolean;
  batchSumUpStatistic: any;
  reportMetadata: any;
  reportCode: string;
}

class ReportCard extends Component<IProps> {
  get reportCards() {
    const { reportMetadata, reportCode } = this.props;
    return lodash
      .chain(reportMetadata?.[reportCode]?.statisticMetadataList)
      .map((item) => ({
        ...item,
        visible: true,
      }))
      .sortBy('sequence')
      .value();
  }

  render() {
    const { collapseState, batchSumUpStatistic, statisticCodeList } = this.props;
    return collapseState ? (
      <div className={styles.scroll}>
        <div className={styles.reportCard}>
          {lodash.map(this.reportCards, (item: any, index: number) => {
            if (!lodash.isEmpty(batchSumUpStatistic) && !batchSumUpStatistic[item?.statisticCode]) {
              return <></>;
            }

            return (
              <ReportCardItem
                key={`${item.statisticCode}_${index}`}
                statisticItem={batchSumUpStatistic?.[item.statisticCode]}
                item={item}
                reportCards={this.reportCards}
                index={index}
                statisticCodeList={statisticCodeList}
              />
            );
          })}
        </div>
      </div>
    ) : null;
  }
}

export default connect(({ reportCenterController }: any) => ({
  collapseState: reportCenterController.collapseState,
  reportMetadata: reportCenterController.reportMetadata,
  reportCode: reportCenterController.activeTabKey,
  batchSumUpStatistic: reportCenterController.batchSumUpStatistic,
  statisticCodeList: reportCenterController.statisticCodeList,
}))(ReportCard);
