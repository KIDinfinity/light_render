import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { Tabs } from 'opus/Components/Antd';
import NAMESPACE from 'opus/Pages/PostProcessing/_models/nameSpace';

import { TaskTabs, ModalTabs, FieldType } from 'opus/Enums';
import { getConfigurationItem } from 'packages/Opus/Hooks';
import TaskTable from './TaskTable';

import Filter from 'opus/Components/Filter';

import Header from './Header';

import styles from './index.less';
import Reassign from './Reassign';

const { TabPane } = Tabs;

const Main = () => {
  const dispatch = useDispatch();
  const modalTab = useSelector(({ opusHome }: any) => opusHome?.modalTab, shallowEqual);

  const [myTaskTab, setMyTaskTab] = useState(TaskTabs.todo);

  const { resultConfigs, searchConfigs, categoryCode, configName } = getConfigurationItem({
    modalTabs:
      modalTab === ModalTabs.myTask
        ? ModalTabs.opusMyPostProcessing
        : ModalTabs.opusMyTeamPostProcessing,
  });
  const [selectedRowsByPage, setSelectedRowsByPage] = React.useState<any>({});
  const [showReassignModal, setShowReassignModal] = React.useState(false);

  const { data, total, current, list, filterDatas } =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.[categoryCode]) || {};
  const showFilter =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.showFilter) || false;

  const getTaskData = async ({ extraParams }: any) => {
    await dispatch({
      type: `${NAMESPACE}/saveTaskDataClear`,
    });
    await dispatch({
      type: `${NAMESPACE}/getTaskList`,
      payload: {
        categoryCode,
        extraParams,
      },
    });
  };

  useEffect(() => {
    if (!!categoryCode) {
      dispatch({
        type: `${NAMESPACE}/getOrganizationCode`,
        payload: {
          categoryCode,
        },
      });
    }
  }, [categoryCode]);

  useEffect(() => {
    if (!!showFilter && !lodash.isEmpty(searchConfigs)) {
      searchConfigs.forEach(({ fieldType, fieldCode }: any) => {
        if (String(fieldType) === FieldType.Select) {
          dispatch({
            type: `${NAMESPACE}/getFilterDatas`,
            payload: {
              fieldName: fieldCode,
              categoryCode,
            },
          });
        }
      });
    }
  }, [searchConfigs, showFilter]);

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/saveFilterChoiceClear`,
      payload: {
        categoryCode,
      },
    });
  }, [modalTab]);

  const allSelectedRows = React.useMemo(() => {
    let newList: any[] = [];

    for (const property in selectedRowsByPage) {
      newList = [...newList, ...selectedRowsByPage[property]];
    }

    return newList;
  }, [selectedRowsByPage]);

  const handleRowSelection = (rows: any, currentPage: number) => {
    setSelectedRowsByPage((prev: any) => {
      const updated: any = lodash.clone(prev);
      if (rows?.length) {
        lodash.set(updated, currentPage, rows);
      } else {
        delete updated[currentPage];
      }
      return updated;
    });
  };

  const taskProps = {
    total,
    current,
    list,
    configName,
    myTaskTab,
    categoryCode,
    resultConfigs,
    selectedRowsByPage,
    handleRowSelection,
    getTaskData,
    modalTab,
  };

  const filterData = {
    myTaskTab: modalTab === ModalTabs.myTask,
    showFilter,
    data,
    searchConfigs,
    filterDatas,
    handleClose: () => {
      dispatch({
        type: `${NAMESPACE}/saveFiltershow`,
        payload: {
          showFilter: false,
        },
      });
    },
    handleClear: () => {
      dispatch({
        type: `${NAMESPACE}/saveFilterChoiceClear`,
        payload: {
          categoryCode,
        },
      });
    },
    handleApply: async (filterChoice: any) => {
      await dispatch({
        type: `${NAMESPACE}/saveFilterChoiceUpdate`,
        payload: {
          categoryCode,
          filterChoice,
        },
      });
      await dispatch({
        type: `${NAMESPACE}/getTaskList`,
        payload: {
          categoryCode,
        },
      });
    },
  };

  // handle Reassign button on click
  const handleReassign = () => {
    dispatch({
      type: `${NAMESPACE}/setIncompleteCases`,
      payload: {
        list: allSelectedRows,
      },
    });

    setShowReassignModal(true);
  };

  const onReassignConfirm = async () => {
    setShowReassignModal(false);
    await dispatch({
      type: `${NAMESPACE}/getTaskList`,
      payload: {
        categoryCode,
      },
    });
    setSelectedRowsByPage({});
  };

  return (
    <div className={styles.allCaseWrap}>
      <Header
        handleFilter={() => {
          dispatch({
            type: `${NAMESPACE}/saveFiltershow`,
            payload: {
              showFilter: true,
            },
          });
        }}
        showExport={!lodash.isEmpty(list)}
        categoryCode={categoryCode}
        resultConfigs={resultConfigs}
        setSelectedRowsByPage={setSelectedRowsByPage}
        reassignBtnDisabled={lodash.isEmpty(selectedRowsByPage)}
        handleReassign={handleReassign}
      />
      <Tabs
        defaultActiveKey={myTaskTab}
        onChange={(key: any) => {
          setMyTaskTab(key);
        }}
      >
        <TabPane key={TaskTabs.todo} tab={formatMessageApi({ Dropdown_COM_TaskStatus: 'todo' })}>
          <TaskTable {...taskProps} />
        </TabPane>
      </Tabs>
      <Filter {...filterData} />
      <Reassign
        visible={showReassignModal}
        resultConfigs={resultConfigs}
        onCancel={() => setShowReassignModal(false)}
        onOk={onReassignConfirm}
      />
    </div>
  );
};

export default Main;
