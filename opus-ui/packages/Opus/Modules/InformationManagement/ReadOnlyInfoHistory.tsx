import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Tabs } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'umi';

import useInfo from './_hook/useInfo';
import { namespace } from './_models';
import InfoHistory from './_component/InfoHistory';
import styles from './index.less';

const { TabPane } = Tabs;

const ReadOnlyInfoHistory = ({ infoGroup }) => {
  const { curCategoryCode } = useSelector((state) => state.infoController);
  const dispatch = useDispatch();

  const curInfoHistory = useInfo({
    infoCategoryCode: curCategoryCode,
  });

  const handleChangeTab = (key) => {
    dispatch({
      type: `${namespace}/setCurGroupCategory`,
      payload: { curCategoryCode: key },
    });
  };
  return (
    <Tabs activeKey={curCategoryCode} onChange={handleChangeTab} className={styles.historyTabs}>
      {infoGroup?.caseCategorylist.map(({ infoCategoryCode }) => (
        <TabPane
          tab={formatMessageApi({
            DropDown_INF_Category: infoCategoryCode,
          })}
          key={infoCategoryCode}
        >
          <InfoHistory
            isShowDropDown={infoGroup.isShowDropDown}
            curInfoHistory={curInfoHistory}
            className={styles.readOnlyInfoHistory}
          />
        </TabPane>
      ))}
    </Tabs>
  );
};

export default ReadOnlyInfoHistory;
