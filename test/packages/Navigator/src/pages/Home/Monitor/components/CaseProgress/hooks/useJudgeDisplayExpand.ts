import { useMemo } from 'react';
import ScenarioMode from 'navigator/pages/Home/Monitor/Scenario/Enum/ScenarioMode';
import useGetScenarioMode from 'navigator/pages/Home/Monitor/Scenario/hooks/useGetScenarioMode';

export default () => {
  const mode: ScenarioMode = useGetScenarioMode();
  return useMemo(() => {
    return mode === ScenarioMode.HOME_PAGE;
  }, [mode]);
};
