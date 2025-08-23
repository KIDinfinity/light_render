import React, { useState } from 'react';
import classnames from 'classnames';
import { useSelector } from 'dva';
import Form from './Form';
import ButtonBar from './ButtonBar';
import styles from './index.less';

export default ({
  lock,
  showSearch,
  setShowSearch,
  dashboardCode,
  swiper,
  SearchRef,
  ChartRef,
  setChartWidth,
}: any) => {
  const [form, setForm] = useState(null);

  const { dashboardSearchFieldList, searchDatas } =
    useSelector((state: any) => state.dashboardController?.chartListMap?.[dashboardCode]) || {};

  const onMouseEnter = () => {
    setShowSearch(true);
  };

  const onMouseLeave = () => {
    !lock && showSearch && setShowSearch(false);
  };

  return (
    <div
      className={classnames({
        [styles.search]: true,
        [styles.showSearch]: showSearch,
      })}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ButtonBar
        lock={lock}
        swiper={swiper}
        dashboardCode={dashboardCode}
        dashboardSearchFieldList={dashboardSearchFieldList}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        form={form}
        SearchRef={SearchRef}
        setChartWidth={setChartWidth}
        ChartRef={ChartRef}
      />
      <Form
        dashboardCode={dashboardCode}
        searchDatas={searchDatas}
        dashboardSearchFieldList={dashboardSearchFieldList}
        setForm={setForm}
      />
    </div>
  );
};
