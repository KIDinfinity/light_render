import React from 'react';
import { Button } from 'antd';
import lodash from 'lodash';
import useGetScenarioMode from 'navigator/pages/Home/Monitor/Scenario/hooks/useGetScenarioMode';
import ScenarioMode from 'navigator/pages/Home/Monitor/Scenario/Enum/ScenarioMode';

interface IProps {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
  className?: string;
  iconComponent: React.ReactElement;
}

export default ({ children, iconComponent, ...others }: IProps) => {
  const mode = useGetScenarioMode();
  return (
    <>
      <Button {...others} size={mode === ScenarioMode.COLLAPSE ? 'small' : undefined}>
        {!others?.loading && iconComponent}
        {lodash.includes([ScenarioMode.EXPAND, ScenarioMode.HOME_PAGE], mode) && children}
      </Button>
    </>
  );
};
