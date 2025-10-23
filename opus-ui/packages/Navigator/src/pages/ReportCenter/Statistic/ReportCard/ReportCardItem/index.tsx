import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import DnDCard from '@/components/DnDCard';
import styles from './index.less';

class ReportCardItem extends Component {
  getEle(statisticItem: any): any {
    return lodash.map(statisticItem, (item: any, index: number) => {
      return (
        <div
          key={String(index)}
          style={{ paddingLeft: `${(item?.currentLevel || 0) * 12}px` }}
        >
          <div className={styles.inventoryItem}>
            <div className={styles.label} title={item.lalelValue}>
              {item.lalelValue}
            </div>
            {!lodash.isArray(item.value) ? (
              <div className={styles.value} title={item.value}>
                {item.value}
              </div>
            ) : (
              ''
            )}
          </div>
          {lodash.isArray(item.value) && this.getEle(item.value)}
        </div>
      );
    });
  }

  handleSort = (sort: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'reportCenterController/saveStatisticList',
      payload: sort,
    });
  };

  private selectReportCard = (item) => {
    const { dispatch, statisticCodeList } = this.props;
    const codeList = lodash.cloneDeep(statisticCodeList);
    if (lodash.includes(statisticCodeList, item.statisticCode)) {
      lodash.remove(codeList, (code) => code === item.statisticCode);
    } else {
      codeList.push(item.statisticCode);
    }
    dispatch({
      type: 'reportCenterController/saveStatisticCodeList',
      payload: { statisticCodeList: codeList },
    });
  };

  render() {
    const { statisticItem = [], item, reportCards, index, statisticCodeList } = this.props;
    const active = lodash.includes(statisticCodeList, item.statisticCode);
    return (
      <div
        className={`${styles.item} ${active ? styles.active : ''}`}
        onClick={() => {
          this.selectReportCard(item);
        }}
      >
        <DnDCard
          key={item.fieldName}
          record={item}
          index={index}
          array={reportCards}
          onSort={(sortList: any) => this.handleSort(sortList)}
          config={{
            sortKey: 'sequence',
          }}
          showBtn={false}
          DndCard={false}
        >
          <div className="reportItemCard">
            {/* <ButtonGroup item={item} /> */}
            <div className={styles.title} title={item.statisticName}>
              {item.statisticName}
            </div>
            <div className={styles.inventory}>{this.getEle(statisticItem)}</div>
          </div>
        </DnDCard>
      </div>
    );
  }
}

export default connect()(ReportCardItem);
