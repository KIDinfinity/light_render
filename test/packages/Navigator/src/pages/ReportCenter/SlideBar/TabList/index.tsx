import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { TypeEnum } from '@/enum/GolbalAuthority';
import TabItem from './TabItems';
import styles from './index.less';
import { Input, Icon } from 'antd';

const TabList = (props: any) => {
  const [reportList, setReportList]: any[] = useState([]);
  const [filterList, setFilterList]: any[] = useState([]);
  const { reportListMap, commonAuthorityList } = props;

  useEffect(() => {
    const reportListFilter = lodash.filter(reportListMap, (item) => {
      return lodash.find(
        commonAuthorityList,
        (commonItem) =>
          commonItem.authorityCode === item.reportCode &&
          commonItem.type === TypeEnum.Comm &&
          commonItem.result &&
          item.visible
      );
    });
    const initialReportList = lodash.sortBy(reportListFilter, (o: object) => o.sequence);
    setReportList(initialReportList);
    setFilterList(initialReportList);
  }, [reportListMap, commonAuthorityList]);
  const handleChange = (e: any) => {
    const filterReportListMap = lodash.filter(reportList, (item) =>
      lodash.includes(lodash.toUpper(item.reportName), lodash.toUpper(e.target.value))
    );
    setFilterList(filterReportListMap);
  };

  const renderList = useMemo(
    () =>
      lodash.map(filterList, (tab: any, index) => (
        <TabItem
          reportCode={tab?.reportCode}
          key={tab?.reportCode}
          item={tab}
          index={index}
          reportList={filterList}
        />
      )),
    [filterList]
  );

  return (
    <>
      <div className={styles.sreachWrap}>
        <Input onChange={handleChange} placeholder="search ..." prefix={<Icon type="search" />} />
      </div>
      <div className={styles.tabList}>{renderList}</div>
    </>
  );
};

export default connect(({ reportCenterController, authController }: any) => ({
  reportListMap: reportCenterController.reportListMap,
  commonAuthorityList: authController.commonAuthorityList,
}))(TabList);
