import React from 'react';
import styles from './index.less';
import CommonHeader from './CommonHeader';
import classNames from 'classnames';
import useGetScenarioMode from 'navigator/pages/Home/Monitor/Scenario/hooks/useGetScenarioMode';
import ScenarioMode from 'navigator/pages/Home/Monitor/Scenario/Enum/ScenarioMode';

export default function CommonBox({
  title,
  children,
  click = () => {},
  displayExpand = true,
  extraHeaderClassName,
  extraBodyClassName,
}: {
  title: string;
  children: React.ReactNode;
  click: () => void;
  displayExpand: boolean;
  extraHeaderClassName?: string;
  extraBodyClassName?: string;
}) {
  const mode = useGetScenarioMode();
  return (
    <>
      <CommonHeader
        extraClassName={extraHeaderClassName}
        title={title}
        click={click}
        displayExpand={displayExpand}
      />
      <div
        className={classNames(styles.commonBox, {
          [styles.homePage]: mode === ScenarioMode.HOME_PAGE,
        })}
      >
        {children}
      </div>
    </>
  );
}
