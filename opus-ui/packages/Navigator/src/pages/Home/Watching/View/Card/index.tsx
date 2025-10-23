import { HotkeyHomeIds } from '@/components/Hotkey/common/enum/hotkeyIds';
import { Hotkey } from '@/components/Hotkey/home';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import { judgeIsInEnvList } from 'navigator/utils';
import React, { useEffect, useMemo } from 'react';
import CategoryFilter from '../CategoryFilter';
import styles from './index.less';
import CardList from './List';

const Index = ({ handleHotkeyChange, getTaskDetail }: any) => {
  const dispatch = useDispatch();
  // 需要屏蔽的环境：TH Staging、Production/HK SIT、UAT、Production
  const isInTHExcludeEnv = judgeIsInEnvList([
    'omp_th_preProd',
    'omp_th_prod',
    'dcp_dev',
    'dcp_uat',
    'dcp_prod',
  ]);
  const filterList = useSelector((state: any) => state.navigatorHomeWatching.filterList);
  const caseCategory =
    useSelector((state: any) => state.navigatorHomeWatching.filterParams.caseCategory) || '';
  const taskList = useSelector((state: any) => state.task?.taskList);
  const list = taskList?.list;
  const caseCategoryList = useMemo(() => {
    return (
      lodash
        .chain(filterList)
        .map((el: any) => el.caseCategory)
        .uniq()
        .value() || []
    );
  }, [filterList]);

  useEffect(() => {
    const record: any = lodash.head(list);
    if (record) {
      getTaskDetail({
        taskId: record.taskId,
        processInstanceId: record.caseNo || record.procInstId || record.processInstanceId,
      });
    }
  }, [list]);

  return (
    <div>
      {!isInTHExcludeEnv ? (
        <div className={styles.categoryFilter}>
          <CategoryFilter />
        </div>
      ) : !lodash.isEmpty(caseCategoryList) && caseCategoryList.length > 1 ? (
        <div className={styles.cardFilter}>
          <p
            className={classnames(
              styles.title,
              caseCategory === '' ? styles.main : styles.secondary
            )}
            onClick={() => {
              dispatch({
                type: 'navigatorHomeWatching/saveFilterParams',
                payload: {
                  changeValue: { caseCategory: '' },
                },
              });
            }}
          >
            All
          </p>
          {lodash.map(caseCategoryList, (item: any) => (
            <p
              key={item.dictCode}
              className={classnames(
                styles.title,
                caseCategory === item ? styles.main : styles.secondary
              )}
              onClick={() => {
                dispatch({
                  type: 'navigatorHomeWatching/saveFilterParams',
                  payload: {
                    changeValue: { caseCategory: item },
                  },
                });
              }}
            >
              {formatMessageApi({
                Label_BPM_CaseCategory: item,
              })}
            </p>
          ))}
        </div>
      ) : null}

      <Hotkey
        id={[
          HotkeyHomeIds.HomeWatchingCardModule,
          HotkeyHomeIds.HomeWatchingFilterCard,
          HotkeyHomeIds.HomeWatchingCard,
        ]}
      />
      <Hotkey
        id={HotkeyHomeIds.HomeWatchingFilterItemCard}
        next={() => {
          handleHotkeyChange(0);
        }}
        prev={() => {
          handleHotkeyChange(1);
        }}
      />
      <div className={styles.cardBox}>
        <div className={styles.overflowHide}>
          <CardList swiperList={list} />
        </div>
      </div>
    </div>
  );
};

export default () => (
  <CaseTaskDetail.Consumer>
    <Index />
  </CaseTaskDetail.Consumer>
);
