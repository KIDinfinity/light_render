import React from 'react';
import lodash from 'lodash';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as backIcon } from 'bpm/assets/new_back.svg';
import { EButtonType } from './EButtonType';
export { EButtonType };
import styles from './index.less';

const iconCustom = {
  [EButtonType.Return]: {
    icon: backIcon,
    className: styles.backIcon,
  },
};

interface IProps {
  saveAuth: boolean;
  confirmAuth: boolean;
  returnAuth: boolean;
  saveDiabled: boolean;
  confirmDiabled: boolean;
  onReturn: Function;
  onConfirm: Function;
  onSave: Function;
  returnDiabled: boolean;
  btnConfigure: any;
}

function ButtonGroup({
  saveAuth = false,
  confirmAuth = false,
  returnAuth = false,
  confirmDiabled = false,
  returnDiabled = false,
  saveDiabled = false,
  onReturn = () => {},
  onSave = () => {},
  onConfirm = () => {},
  btnConfigure,
}: IProps) {
  const defBtn = {
    // [EButtonType.Save]: {
    //   id: EButtonType.Save,
    //   label: 'save',
    //   iconType: 'save',
    //   show: saveAuth,
    //   disabled: saveDiabled,
    //   handler: onSave,
    //   order: 0,
    // },
    [EButtonType.Return]: {
      id: EButtonType.Return,
      label: 'cancel',
      type: 'default',
      // iconType: 'return',
      disabled: returnDiabled,
      show: returnAuth,
      handler: onReturn,
      order: 1,
    },
    [EButtonType.Confirm]: {
      id: EButtonType.Confirm,
      label: 'Confirm',
      type: 'primary',
      // iconType: 'check-circle',
      show: confirmAuth,
      disabled: confirmDiabled,
      handler: onConfirm,
      order: 2,
    },
  };

  const btnList = lodash.chain(defBtn).merge(btnConfigure).values().orderBy('order').value();
  return (
    <div className={styles.buttonGroup}>
      {lodash.map(btnList, (item: any) => {
        return (
          item.show && (
            <Button
              type={item?.type}
              className={styles.button}
              onClick={item.handler}
              key={item.id}
              disabled={item.disabled}
            >
              <span>{formatMessageApi({ [item.typeCode || 'Label_COM_Opus']: item.label })}</span>
            </Button>
          )
        );
      })}
    </div>
  );
}

export default ButtonGroup;
