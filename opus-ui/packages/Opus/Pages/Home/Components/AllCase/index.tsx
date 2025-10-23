import { formatMessageApi } from '@/utils/dictFormatMessage';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { Tabs } from 'opus/Components/Antd';
import Filter from 'opus/Components/Filter';
import { TaskTabs, ModalTabs, FieldType } from 'packages/Opus/Enums';
import { getConfigurationItem } from 'packages/Opus/Hooks';
import { NAMESPACE } from 'packages/Opus/Pages/Home/activity.config';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Reassign from '../Reassign';
import Header from './Header';
import styles from './index.less';
import TaskTable from './TaskTable';
import delay from '@/utils/delay';

const { TabPane } = Tabs;

let prevAbortController: AbortController | null = null;

const Main = ({ tabKey: modalTabs }: any) => {
  const dispatch = useDispatch();

  const containerRef = useRef(null);

  const [showReassignModal, setShowReassignModal] = useState(false);
  const [myTaskTab, setMyTaskTab] = useState(TaskTabs.todo);
  const [selectedRowsByPage, setSelectedRowsByPage] = useState<any>({});

  const { resultConfigs, searchConfigs, categoryCode, configName } = getConfigurationItem({
    modalTabs,
    myTaskTab,
  });

  const {
    showFilter,
    data,
    filterDatas,
    total,
    current,
    list,
    sorterParamsForfilterChoice,
    totalWealth,
    totalNonWealth,
    filterChoice,
  } = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.taskData) || {};
  const organizationCode =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.organizationCode) || '';
  const duration =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.duration) || '';
  const taskDurationType =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.taskDurationType) || '';

  const exportLoading = useSelector(
    (state: any) => state.loading.effects[`${NAMESPACE}/getExport`]
  );

  const allSelectedRows = useMemo(() => {
    let list: any[] = [];

    for (const property in selectedRowsByPage) {
      list = [...list, ...selectedRowsByPage[property]];
    }

    return list;
  }, [selectedRowsByPage]);

  const handleRowSelection = (rows: any, currentPage: number) => {
    const updated = lodash.cloneDeep(selectedRowsByPage);

    if (rows?.length) {
      updated[currentPage] = rows;
    } else {
      delete updated[currentPage];
    }

    setSelectedRowsByPage(updated);
  };

  const getTaskData = async () => {
    const preController = prevAbortController;
    const abortController = new AbortController();
    if (prevAbortController) {
      prevAbortController.abort();
    }
    prevAbortController = abortController;
    await delay(10);
    await dispatch({
      type: `${NAMESPACE}/saveTaskDataClear`,
    });
    if (preController) {
      await dispatch({
        type: `${NAMESPACE}/initTaskData`,
        payload: {
          categoryCode,
        },
        signal: abortController.signal,
      });
    } else {
      await dispatch({
        type: `${NAMESPACE}/updateTaskData`,
        payload: {
          categoryCode,
        },
        signal: abortController.signal,
      });
    }
    await dispatch({
      type: `${NAMESPACE}/searchConfigs`,
      payload: {
        categoryCode,
      },
    });
  };

  const saveSorterInfofun = (SorterdInfoForApply: any) => {
    dispatch({
      type: `${NAMESPACE}/saveSortedInfoForApply`,
      payload: SorterdInfoForApply,
    });
  };

  useEffect(() => {
    if (!!categoryCode || !organizationCode) {
      getTaskData();
    }
  }, [categoryCode, organizationCode]);

  useEffect(() => {
    if (!lodash.isEmpty(searchConfigs)) {
      searchConfigs.forEach(({ fieldType, fieldCode }: any) => {
        if (String(fieldType) === FieldType.Select) {
          dispatch({
            type: `${NAMESPACE}/getFilterDatas`,
            payload: {
              fieldName: fieldCode,
              categoryCode,
              modalTabs,
            },
          });
        }
      });
    }
  }, [searchConfigs, organizationCode]);

  const taskProps = {
    total,
    current,
    list,
    configName,
    myTaskTab,
    modalTabs,
    categoryCode,
    resultConfigs,
    selectedRowsByPage,
    handleRowSelection,
    saveSorterInfofun,
  };

  const filterData = {
    showFilter,
    data,
    searchConfigs,
    filterDatas,
    myTaskTab,
    filterChoice,
    handleApply: async (filterChoice: any) => {
      // await dispatch({
      //   type: `${NAMESPACE}/saveFilterChoice`,
      //   payload: {
      //     filterChoice,
      //   },
      // });

      dispatch({
        type: `${NAMESPACE}/getTaskList`,
        payload: {
          categoryCode,
          extraParams: {
            ...sorterParamsForfilterChoice,
            params: { ...filterChoice },
          },
        },
      });
    },
    handleClose: () => {
      dispatch({
        type: `${NAMESPACE}/saveFiltershow`,
        payload: {
          show: false,
        },
      });
    },
    setFilterChoice: (value: any) => {
      dispatch({
        type: `${NAMESPACE}/saveFilterChoice`,
        payload: {
          filterChoice: value,
        },
      });
    },
  };
  const HNWRender =
    typeof totalWealth === 'number' || typeof totalNonWealth === 'number' ? (
      <div className={styles.HNWRow}>
        <span>
          {formatMessageApi({ Dropdown_COM_wealthType: 'WEALTH' })}:{' '}
          <span className={styles.number}>{totalWealth || 0}</span>
        </span>
        <span>
          {formatMessageApi({ Dropdown_COM_wealthType: 'NONWEALTH' })}:{' '}
          <span className={styles.number}>{totalNonWealth || 0}</span>
        </span>
      </div>
    ) : null;

  return (
    <div className={styles.allCaseWrap} ref={containerRef}>
      <Header
        containerRef={containerRef}
        showReassign={modalTabs === ModalTabs.myTeamTask}
        exportLoading={exportLoading}
        handleRessign={async () => {
          await dispatch({
            type: `${NAMESPACE}/setIncompleteCases`,
            payload: {
              list: allSelectedRows,
            },
          });

          setShowReassignModal(true);
        }}
        // handleExport={() => {
        //   dispatch({
        //     type: `${NAMESPACE}/getExport`,
        //     payload: {
        //       categoryCode,
        //     },
        //   });
        // }}
        handleFilter={() => {
          // TODO:需要有个滚动条

          dispatch({
            type: `${NAMESPACE}/saveFiltershow`,
            payload: {
              show: true,
            },
          });
        }}
        reassignBtnDisabled={lodash.isEmpty(selectedRowsByPage)}
      />

      <Tabs
        defaultActiveKey={myTaskTab}
        onChange={(key) => {
          setMyTaskTab(key);
          dispatch({
            type: `${NAMESPACE}/saveFilterChoice`,
            payload: { filterChoice: {} },
          });
          // filterData.handleApply({});
          // handleChangeTab(key);
        }}
        className={classNames(styles.tabs, { [styles.withFilter]: showFilter })}
        tabBarExtraContent={HNWRender}
      >
        <TabPane tab={formatMessageApi({ Dropdown_COM_TaskStatus: 'todo' })} key={TaskTabs.todo}>
          <TaskTable {...taskProps} />
        </TabPane>
        <TabPane
          tab={formatMessageApi({ Dropdown_COM_TaskStatus: 'pending' })}
          key={TaskTabs.pending}
        >
          <TaskTable {...taskProps} />
        </TabPane>
      </Tabs>

      <Reassign
        visible={showReassignModal}
        resultConfigs={resultConfigs}
        onCancel={() => setShowReassignModal(false)}
        onOk={async () => {
          setShowReassignModal(false);
          await dispatch({
            type: `${NAMESPACE}/getTaskList`,
            payload: {
              categoryCode,
            },
          });
          setSelectedRowsByPage({});
        }}
      />
      <Filter {...filterData} />
    </div>
  );
};

export default Main;
