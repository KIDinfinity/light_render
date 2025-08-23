import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import lodash from 'lodash';
import { ReactComponent as cancelledIcon } from 'bpm/assets/process-cancelled.svg';
import { ReactComponent as completedIcon } from 'bpm/assets/process-completed.svg';
import { ReactComponent as errorIcon } from 'bpm/assets/process-error.svg';
import { ReactComponent as pendingIcon } from 'bpm/assets/process-pending.svg';
import { ReactComponent as rejectedIcon } from 'bpm/assets/process-rejected.svg';
import { ReactComponent as skipIcon } from 'bpm/assets/process-skip.svg';
import { ReactComponent as withdrawIcon } from 'bpm/assets/process-withdraw.svg';
import { ReactComponent as splitMiddleIcon } from 'bpm/assets/progressbar-cross.svg';
import ProcessStatus from 'navigator/enum/ProcessStatus';
import styles from './MySteps2.less';
import Step from './Step';

export default class MySteps2 extends PureComponent {
  getIconStatus = (step, current, stepIndex) => {
    const childrenProps = lodash.get(step, 'props.children[0].props', {});
    let iconStatus = '';
    const { processActivityStatus, splitCaseSkip } = lodash.pick(childrenProps, [
      'processActivityStatus',
      'splitCaseSkip',
    ]);
    if (processActivityStatus === null) {
      iconStatus = ProcessStatus.todo;
    } else if (current > stepIndex && !processActivityStatus && splitCaseSkip) {
      iconStatus = 'splitMiddle';
    } else {
      iconStatus = processActivityStatus;
    }

    return iconStatus;
  };

  getLineStatus = ({ isBranchLine, step, current, stepIndex }) => {
    const { activityList } = this.props;
    const childrenProps = lodash.get(step, 'props.children[0].props', {});
    const iconStatus = this.getIconStatus(step, current, stepIndex);
    let lineStatus = '';
    if (isBranchLine || (current > stepIndex && !childrenProps.splitCaseSkip)) {
      lineStatus = 'finished';
    }
    if (
      lodash.includes([ProcessStatus.cancelled], iconStatus) ||
      lodash.includes(
        [ProcessStatus.disabled],
        lodash.get(activityList, `[${stepIndex + 1}].processActivityStatus`)
      )
    ) {
      lineStatus = 'forbid';
    }
    return lineStatus;
  };

  renderProgressIcon = (step, current, stepIndex) => {
    return (
      <div
        className={`
       ${styles.icon}
       ${styles[this.getIconStatus(step, current, stepIndex)]}
     `}
      >
        {lodash.get(step, 'props.children[0].props.processActivityOrder')}
      </div>
    );
  };

  renderIcon = (step, current, stepIndex) => {
    const iconStatus = this.getIconStatus(step, current, stepIndex);
    let currentIcon;
    switch (iconStatus) {
      case ProcessStatus.completed:
        currentIcon = <Icon className={styles.completed} component={completedIcon} />;
        break;
      case ProcessStatus.pending:
        currentIcon = <Icon className={styles.pending} component={pendingIcon} />;
        break;
      case ProcessStatus.withdraw:
        currentIcon = <Icon className={styles.withdraw} component={withdrawIcon} />;
        break;
      case ProcessStatus.error:
        currentIcon = <Icon className={styles.error} component={errorIcon} />;
        break;
      case ProcessStatus.disabled:
      case ProcessStatus.inprogress:
      case ProcessStatus.todo:
        currentIcon = this.renderProgressIcon(step, current, stepIndex);
        break;
      case ProcessStatus.cancelled:
        currentIcon = <Icon className={styles.cancelled} component={cancelledIcon} />;
        break;
      case ProcessStatus.rejected:
        currentIcon = <Icon className={styles.rejected} component={rejectedIcon} />;
        break;
      case ProcessStatus.skip:
        currentIcon = <Icon className={styles.skip} component={skipIcon} />;
        break;
      case 'splitMiddle':
        currentIcon = <Icon className={styles.splitMiddle} component={splitMiddleIcon} />;
        break;
      default:
    }
    return currentIcon;
  };

  render() {
    const { className, children, current } = this.props;
    return (
      <div className={styles.MySteps2 + (className ? ` ${className}` : '')}>
        {className ? (
          <div
            className={`${styles.branchLine} ${styles[this.getLineStatus({ isBranchLine: true })]}`}
          />
        ) : null}
        {lodash.map(children, (step, stepIndex) => (
          <div className={styles.item} key={step.key}>
            <div
              className={`
                  ${styles['step-wrapper']}
                `}
            >
              {className ? (
                <div
                  className={`
                      ${styles.dash}
                      ${styles[this.getLineStatus({ isBranchLine: true })]}
                    `}
                />
              ) : (
                ''
              )}
              {this.renderIcon(step, current, stepIndex)}
              {stepIndex === children.length - 1 ? (
                ''
              ) : (
                <div
                  className={`
                      ${styles.dash}
                      ${styles[this.getLineStatus({ step, current, stepIndex })]}
                    `}
                />
              )}
            </div>
            <div
              className={`
                  ${styles['item-wrapper']}
                  ${current < stepIndex ? styles.unreached : ''}
                  ${current === stepIndex ? styles.current : ''}
                `}
            >
              {step}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

MySteps2.Step = Step;
