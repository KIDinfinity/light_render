import type React from 'react';
import lodash from 'lodash';
import ActionCode from '../Enum/ActionCode';
import ScenarioMode from 'navigator/pages/Home/Monitor/Scenario/Enum/ScenarioMode';
import useGetScenarioMode from 'navigator/pages/Home/Monitor/Scenario/hooks/useGetScenarioMode';

interface IProps {
  children: React.ReactElement;
  actionCode: ActionCode;
}

export default ({ children, actionCode }: IProps) => {
  const mode = useGetScenarioMode();
  const displayButton = lodash
    .chain([
      {
        actionCode: ActionCode.RESUBMIT,
        modes: [ScenarioMode.HOME_PAGE, ScenarioMode.EXPAND, ScenarioMode.COLLAPSE],
      },
      {
        actionCode: ActionCode.RETRY,
        modes: [ScenarioMode.HOME_PAGE, ScenarioMode.EXPAND, ScenarioMode.COLLAPSE],
      },
      {
        actionCode: ActionCode.NEXT_NODE,
        modes: [ScenarioMode.HOME_PAGE],
      },
      {
        actionCode: ActionCode.EXPORT,
        modes: [ScenarioMode.HOME_PAGE],
      },
    ])
    .filter((item: any) => lodash.includes(item.modes, mode))
    .some((item: any) => item?.actionCode === actionCode)
    .value();
  return displayButton ? children : null;
};
