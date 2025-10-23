import React from 'react';
import lodash from 'lodash';
import { ReactComponent as Back } from 'basic/components/Questionnaire/icons/back.svg';
import Button from './Button';
import styles from './index.less';

const Actions = () => {
  const actions = [
    {
      icon: <Back />,
      buttonCode: 'back',
    },
  ];
  return (
    <div className={styles.buttonList}>
      {lodash.map(actions, (config: any) => {
        return <Button config={config} key={config.name} />;
      })}
    </div>
  );
};

Actions.displayName = 'Actions';

export default Actions;
