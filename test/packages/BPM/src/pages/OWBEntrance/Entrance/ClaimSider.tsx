import React, { useState, useContext, useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import context from '../Context/context';
import SiderUI from '../Sider/Sider';
import useTimerAction from './_hooks/useTimerAction';
import useSetButtonList from './_hooks/useSetButtonList';
import useFilterHiddenButtons from './_hooks/useFilterHiddenButtons';
import useSetButtonsDisabled from './_hooks/useSetButtonsDisabled';

const C = ({
  taskDetail,
  buttonListFromServer,
  customizationButtonConfig,
  actionConfig,
  commonActionLife,
  contextDispatch,
  businessData = {},
}: any) => {
  const stopTimer = useSelector(
    ({ processTask }: any) => processTask.snapshotModalVisible,
    shallowEqual
  );
  const stopAutoSave = useSelector(
    ({ processTask }: any) => processTask.stopAutoSave,
    shallowEqual
  );
  const [buttonList, setButtonList] = useState([]);
  // set buttonList
  useSetButtonList({
    buttonListFromServer,
    actionConfig,
    taskDetail,
    contextDispatch,
    setButtonList,
    customizationButtonConfig,
    commonActionLife,
  });

  // eslint-disable-next-line consistent-return
  useTimerAction({ buttonList, stopTimer, stopAutoSave });
  const filterHiddenList = useFilterHiddenButtons({
    buttonList,
    taskDetail,
    businessData,
  }); 

  const buttons = useSetButtonsDisabled({
    buttonList: filterHiddenList,
    taskDetail,
  });
  return <SiderUI buttonList={buttons} />;
};

const Sider = ({ businessData }: any) => {
  const { state, dispatch: contextDispatch } = useContext(context);
  const {
    taskDetail,
    buttonList: buttonListFromServer,
    customizationButtonConfig = [],
    actionConfig,
    commonActionLife,
  } = state;

  return useMemo(() => {
    return (
      <C
        taskDetail={taskDetail}
        buttonListFromServer={buttonListFromServer}
        customizationButtonConfig={customizationButtonConfig}
        actionConfig={actionConfig}
        commonActionLife={commonActionLife}
        contextDispatch={contextDispatch}
        businessData={businessData}
      />
    );
  }, [
    taskDetail,
    buttonListFromServer,
    customizationButtonConfig,
    actionConfig,
    commonActionLife,
    businessData,
  ]);
};

Sider.displayName = 'Sider';

export default Sider;
