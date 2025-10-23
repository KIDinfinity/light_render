import React from 'react';
import lodash from 'lodash';
import styles from './index.less';
import { Card } from 'antd';
import CaseInfo from './CaseInfo';
import Flow from './Flow';
import classnames from 'classnames';
import { TransionCaseCategory } from 'phowb/pages/BatchCreateProcess/Enums';

interface IProps {
  process: any[];
}
const ProcessCard = ({ process }: IProps) => {
  return (
    <div className={styles.processCard}>
      <Card>
        {
          process.map((p,i)=>(
            <>
              { i === 0 && <h2
                  className={classnames(styles.title, {
                    [styles.minor]: p?.caseCategory === TransionCaseCategory.Minor,
                    [styles.major]: p?.caseCategory === TransionCaseCategory.Major,
                  })}
                >
                  {p?.transactionTypeName}
                </h2>
              }
              <CaseInfo item={lodash.pick(p, ['slaDuration', 'caseCategory'])} />
              <Flow process={p} />
            </>
          ))
        }
      </Card>
    </div>
  );
};

export default ProcessCard;
