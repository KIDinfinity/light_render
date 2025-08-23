import React from 'react';
import Context from './Context';
import type ScenarioMode from 'navigator/pages/Home/Monitor/Scenario/Enum/ScenarioMode';

const { Provider } = Context;

interface IProps {
  children: React.ReactElement;
  mode: ScenarioMode;
}

interface IProviderValues {
  mode: ScenarioMode;
}

export default ({ children, mode }: IProps) => {
  return <Provider value={{ mode } as IProviderValues}>{children}</Provider>;
};
