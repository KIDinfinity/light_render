import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import Scenario from 'navigator/pages/Home/Monitor/Scenario';
import ScenarioMode from 'navigator/pages/Home/Monitor/Scenario/Enum/ScenarioMode';
import Slider from 'navigator/pages/Home/Monitor/Slider';
import useExpanderController from 'navigator/hooks/useExpanderController';

const Auth = ({ children, localTaskDetail, remoteTaskDetail }: any) => {
  const dispatch = useDispatch();
  const taskDetail = localTaskDetail || remoteTaskDetail;
  const updateToolsPermissions = (detail: any) => {
    dispatch({
      type: 'authController/saveToolsPermissions',
      payload: { taskDetail: detail },
    });
  };

  useEffect(() => {
    updateToolsPermissions(taskDetail || null);
  }, [taskDetail, dispatch]);

  return (
    <>
      {React.cloneElement(children, {
        taskDetail: localTaskDetail || remoteTaskDetail,
      })}
    </>
  );
};

const AuthWrapper = () => {
  const { isExpanderSwitchOn } = useExpanderController();

  const scenarioMode = isExpanderSwitchOn ? ScenarioMode.EXPAND : ScenarioMode.COLLAPSE;

  return (
    <CaseTaskDetail.Pending.Consumer>
      <Auth>
        <Scenario mode={scenarioMode}>
          <Slider />
        </Scenario>
      </Auth>
    </CaseTaskDetail.Pending.Consumer>
  );
};

export default AuthWrapper;
