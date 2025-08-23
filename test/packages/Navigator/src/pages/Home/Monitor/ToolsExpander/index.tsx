import React from 'react';
import ExceptionalCase from 'navigator/pages/Home/Monitor/components/ExceptionalCase';
import Scenario from 'navigator/pages/Home/Monitor/Scenario';
import ScenarioMode from 'navigator/pages/Home/Monitor/Scenario/Enum/ScenarioMode';
import Title from 'navigator/pages/Home/Monitor/Title';

export default () => {
  return (
    <>
      <Scenario mode={ScenarioMode.EXPAND}>
        <Title />
        <ExceptionalCase />
      </Scenario>
    </>
  );
};
