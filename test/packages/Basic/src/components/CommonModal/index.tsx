import React from 'react';
import lodash from 'lodash';
import { Modal, Button, Icon } from 'antd';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as backIcon } from 'bpm/assets/back.svg';
import { EButtonType } from './EButtonType';
export { EButtonType };
import styles from './index.less';

const iconCustom = {
  [EButtonType.Return]: {
    icon: backIcon,
    className: styles.backIcon,
  },
};

function CommonModal({
  visible = false,
  children,
  onReturn = () => {},
  onConfirm = () => {},
  onCancel = () => {},
  confirmAuth = false,
  returnAuth = false,
  width = 520,
  maskClosable = true,
  closable = true,
  forceRender = true,
  zIndex = 1024,
  className = '',
  bodyStyle = {},
  btnList,
  ...res
}: any) {
  const defBtnList = [
    {
      id: EButtonType.Confirm,
      label: 'venus_claim.button.confirm',
      iconType: 'check-circle',
      show: confirmAuth,
      handler: onConfirm,
      order: 0,
    },
    {
      id: EButtonType.Return,
      label: 'Return',
      iconType: 'return',
      show: returnAuth,
      handler: onReturn,
      order: 1,
    },
  ];

  const btnListTemp = lodash
    .chain(defBtnList)
    // @ts-ignore
    .mergeWith(btnList, (target: any, source: any) => {
      if (source && target && target?.id === source?.id) {
        return { ...target, ...source };
      }

      return source;
    })
    .uniqBy('id')
    .orderBy('order')
    .value();

  return (
    <Modal
      visible={visible}
      centered
      footer={null}
      className={classNames(styles.commonModal, className)}
      onCancel={onCancel}
      width={width}
      maskClosable={maskClosable}
      closable={closable}
      forceRender={forceRender}
      zIndex={zIndex}
      bodyStyle={bodyStyle}
      {...res}
    >
      <div className={styles.container}>
        <div className={styles.buttonGroup}>
          {lodash.map(btnListTemp, (item: any) => {
            const custom = iconCustom[item.iconType];

            return (
              item.show && (
                <Button onClick={item.handler} key={item.id}>
                  <span>
                    {formatMessageApi({ [item.typeCode || 'Label_BPM_Button']: item.label })}
                  </span>
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
        <div className={styles.content}>{children}</div>
      </div>
    </Modal>
  );
}

export default CommonModal;
