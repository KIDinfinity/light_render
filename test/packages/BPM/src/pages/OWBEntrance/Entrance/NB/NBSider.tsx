import React, { useContext } from 'react';
import SiderUI from 'bpm/pages/OWBEntrance/Sider/Sider';
import context from 'bpm/pages/OWBEntrance/Context/context';
import useGetButtonList from './buttonList.local.config';
// import useDisplayBasicFormListCallback from 'process/NB/hooks/useDisplayBasicFormListCallback';
import { useSelector } from 'dva';

const Sider = ({ taskDetail }: any) => {
  const { dispatch: bpmDispatch } = useContext(context);
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const buttonList = useGetButtonList({ bpmDispatch, taskDetail, editable });
  // const handleDisplayFormList = useDisplayBasicFormListCallback();
  return (
    // 这里会导致校验卡死，所以先注释
    // <div onMouseEnter={handleDisplayFormList}>
    <div>
      <SiderUI buttonList={buttonList} />
    </div>
  );
};

Sider.displayName = 'Sider';

export default Sider;
