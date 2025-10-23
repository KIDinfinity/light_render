import React, { useState, useEffect } from 'react';
import { useDispatch } from 'dva';
import { isEmpty } from 'lodash';
import styles from './index.less';

import Header from './Header';
import { history } from 'umi';
import queryString from 'query-string';
import SearchReport from './SearchReport';
import Content from './Content';
import Filter from './Filter';
import CustomiseFilter from './CustomiseFilter';

const Main = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showCustomiseFilter, setCustomiseFilter] = useState(false);
  const dispatch = useDispatch();
  const query = queryString.parse(history.location.search);
  useEffect(() => {
    dispatch({
      type: 'reportCenterController/getListReports',
    });

    return () => {
      dispatch({
        type: 'reportCenterController/clear',
      });
    };
  }, []);

  useEffect(() => {
    if (!isEmpty(query)) {
      const t = async () => {
        await dispatch({
          type: 'reportCenterController/saveActiveTabInfo',
          payload: {
            activeTabKey: query?.linkedReportCode || '',
          },
        });
        dispatch({
          type: 'reportCenterController/findReportMetadata',
          payload: {
            reportCode: query?.linkedReportCode || '',
            params: query?.searchFields,
          },
        });
      };
      t();
    }
  }, [query]);

  return (
    <div className={styles.report}>
      <Header
        handleCustomise={() => {
          setCustomiseFilter(true);
        }}
        handleFilter={() => {
          setShowFilter(true);
        }}
      />

      <SearchReport />
      <Content />
      <Filter showFilter={showFilter} setShowFilter={setShowFilter} />

      <CustomiseFilter
        showCustomiseFilter={showCustomiseFilter}
        setCustomiseFilter={setCustomiseFilter}
      />
    </div>
  );
};

export default Main;
