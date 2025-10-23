import { useMemo } from 'react';
import ScenarioMode from 'navigator/pages/Home/Monitor/Scenario/Enum/ScenarioMode';
import useGetScenarioMode from 'navigator/pages/Home/Monitor/Scenario/hooks/useGetScenarioMode';

export default () => {
  const mode: ScenarioMode = useGetScenarioMode();
  return useMemo(() => {
    const mapping = {
      [ScenarioMode.HOME_PAGE]: 4,
      [ScenarioMode.EXPAND]: 3,
      [ScenarioMode.COLLAPSE]: 24,
    };
    return {
      span: mapping[mode],
    };
  }, [mode]);
};
