import React from 'react';
import lodash from 'lodash';
import { Button, Icon } from 'antd';
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
    [EButtonType.Save]: {
      id: EButtonType.Save,
      label: 'save',
      iconType: 'save',
      show: saveAuth,
      disabled: saveDiabled,
      handler: onSave,
      order: 0,
    },
    [EButtonType.Confirm]: {
      id: EButtonType.Confirm,
      label: 'venus_claim.button.confirm',
      iconType: 'check-circle',
      show: confirmAuth,
      disabled: confirmDiabled,
      handler: onConfirm,
      order: 1,
    },
    [EButtonType.Return]: {
      id: EButtonType.Return,
      label: 'Return',
      iconType: 'return',
      disabled: returnDiabled,
      show: returnAuth,
      handler: onReturn,
      order: 2,
    },
  };

  const btnList = lodash.chain(defBtn).merge(btnConfigure).values().orderBy('order').value();
  return (
    <div className={styles.buttonGroup}>
      {lodash.map(btnList, (item: any) => {
        const custom = iconCustom[item.iconType];

        return (
          item.show && (
            <Button onClick={item.handler} key={item.id} disabled={item.disabled}>
              <span>{formatMessageApi({ [item.typeCode || 'Label_BPM_Button']: item.label })}</span>
              {!lodash.isEmpty(custom) ? (
                <Icon component={custom.icon} className={custom.className} />
              ) : (
                <Icon type={item.iconType} />
              )}
            </Button>
          )
        );
      })}
    </div>
  );
}

export default ButtonGroup;
