import React from 'react';
import lodash from 'lodash';
import styled from 'styled-components';
import useExpanderController from 'navigator/hooks/useExpanderController';
import classnames from 'classnames';
import styles from './index.less';

const StyledTitle = styled.h1`
  text-align: center;
  font-size: 2.2857rem;
  color: var(--task-header-title-color);
  text-transform: uppercase;
  margin-bottom: 0;
`;

const StyledBig = styled.span`
  font-size: 2.8571rem;
  display: inline-block;
  margin-left: 0.7143rem;
`;

const TaskDetailHeaderTitle = ({ title, description = '', checkRegExp }: any) => {
  const needFormat = checkRegExp.test(title);

  const titles = {
    true: (text: any) =>
      lodash.map(text?.trim()?.split(/\s+/), (word: any, index: number) => (
        <React.Fragment key={`${word}_${index.toString()}`}>
          <StyledBig>{word.slice(0, 1)} </StyledBig>
          {word.slice(1)}
        </React.Fragment>
      )),
    false: (text: any) => text,
  };

  return (
    <StyledTitle>
      <span>{titles[needFormat.toString()](title)}</span>
      {!lodash.isEmpty(description) && <span className={styles.description}>{description}</span>}
    </StyledTitle>
  );
};

const TaskDetailHeader = ({
  title = '',
  taskStatus,
  showTips = true,
  description = '',
  children,
}: any) => {
  const { isSiderToggleOn } = useExpanderController();

  return (
    <div className={styles.fix}>
      <div className={classnames(styles.padding, isSiderToggleOn? styles.compressed : void 0)}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.title}>
              <div className={styles.h1}>
                <div className={styles.text}>
                  <TaskDetailHeaderTitle
                    title={title}
                    description={description}
                    checkRegExp={/[0-9a-z]/i}
                  />

                  {showTips && taskStatus && (
                    <div className={styles.tip}>
                      <span>{taskStatus?.toUpperCase()}</span>
                      <div className={styles.arrow} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.right}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  )

};

export default TaskDetailHeader;
