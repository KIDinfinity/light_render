import React from 'react';
import { ReactComponent as FXIcon } from 'claim/assets/fx.svg';
import { Icon } from 'antd';
import AtomFxPopover from './AtomFxPopover';
import styles from './AtomFx.less';

export default ((props: any) => {
  const { atomFormulaInfo, formulaFormItemDisabled } = props;

  return (
    <AtomFxPopover {...props}>
      <Icon
        component={FXIcon}
        className={[
          styles.icon,
          formulaFormItemDisabled || atomFormulaInfo.fxHighLight ? styles.light : styles.gray,
        ]}
      />
    </AtomFxPopover>
  );
});
