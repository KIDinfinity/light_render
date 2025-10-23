import React from 'react';
import { Icon } from 'antd';
import { ReactComponent as DeleteIcon } from 'opus/Assets/icon-delete.svg';
import { ReactComponent as WarningIcon } from 'opus/Assets/icon-warning-circle.svg';
import { ReactComponent as SuccessIcon } from 'opus/Assets/icon-success-circle.svg';
import styles from './index.less';
import { Modal } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { CustomIconComponentProps } from 'plugins/ant-design/lib/icon';
import type { ModalFuncProps } from 'plugins/ant-design/lib/modal';
import { history } from 'umi';
import { handleSuccessMessageModal, handleWarnMessageModal } from '@/utils/commonMessage';

interface DeleteButtonProps {
  /**
   * Disable the button
   */
  disabled?: boolean;
  /**
   * onDelete callback
   * @returns null | boolean
   */
  handleDelete: () => void | Promise<void | boolean>;
  /**
   * onClosed callback
   * @returns null | boolean
   */
  handleClosed?: () => void | Promise<void | boolean>;
  /**
   * loading indicator
   */
  loading?: boolean;
  /**
   * delete successful indicator
   */
  succeed?: boolean;
  /**
   * display icon, default: trash bin icon
   */
  icon?: React.ComponentType<CustomIconComponentProps | React.SVGProps<SVGSVGElement>> | undefined;
  /**
   * icon button className
   */
  className?: string;
  /**
   * icon button styles
   */
  style?: React.CSSProperties;
  /**
   * delete confirm modal styles
   */
  modalSettings?: DeleteConfirmModalProps | undefined;

  type?: string;

  show?: boolean;
}

interface DeleteConfirmModalProps extends ModalFuncProps {
  /**
   * onConfirm callback
   */
  onConfirm?: () => Promise<void | boolean> | void;
  /**
   * onCancel callback
   */
  onCancel?: () => Promise<void | boolean> | void;
  /**
   * confirm button text
   */
  okText?: string;
  /**
   * confirm button type
   */
  okType?: 'danger' | 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | undefined;
  /**
   * cancel button text
   */
  cancelText?: string;
  /**
   * loading indicator
   */
  loading?: boolean;
  /**
   * delete successful indicator
   */
  succeed?: boolean;
  /**
   * modal content text
   */
  content?: string;

  /**
   * custom success text display
   */
  customSuccessMsgs?: string;
  customTitleIcon?:
    | React.ComponentType<CustomIconComponentProps | React.SVGProps<SVGSVGElement>>
    | undefined;
}

/**
 * Delete confirmation modal
 */
export const showDeleteConfirmModal = async ({
  onConfirm,
  onCancel,
  okText = formatMessageApi({ Label_BPM_Button: 'Confirm' }),
  cancelText = formatMessageApi({ Label_COM_Opus: 'cancel' }),
  okType = 'primary',
  loading,
  content,
  ...args
}: DeleteConfirmModalProps) => {
  handleWarnMessageModal(
    [{ content: content ?? formatMessageApi({ Label_COM_Message: 'MSG_001169' }) }],
    {
      title: args?.customTitleIcon ? (
        <div className={styles.title}>
          <Icon component={args?.customTitleIcon} />
          <span>{formatMessageApi({ Label_COM_Opus: 'confirmation' })}</span>
        </div>
      ) : (
        formatMessageApi({ Label_COM_Opus: 'confirmation' })
      ),
      icon: <Icon component={WarningIcon} />,
      okText,
      okType,
      cancelText,
      okFn: async () => {
        const response = onConfirm ? await onConfirm() : undefined;
        if (response && response?.success === false) {
          return false;
        }
        return handleSuccessMessageModal(
          <div>
            <div className={styles.divider} />
            <span>
              {args?.customSuccessMsgs || formatMessageApi({ Label_COM_Message: 'MSG_001170' })}
            </span>
          </div>,
          {
            onOk: () => Promise.resolve(),
            okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
            cancelButtonProps: { hidden: true },
            icon: <Icon component={SuccessIcon} />,
            title: formatMessageApi({ Label_COM_Opus: 'Success' }),
            className: styles.modal,
            centered: true,
          }
        );
      },
      okButtonProps: {
        loading,
      },
      cancelFn: onCancel,
      className: styles.modal,
      centered: true,
      ...args,
    }
  );
};

/**
 * Delete icon button, pressed will pop-up delete confirmation button
 */
export const DeleteButton = ({
  disabled,
  handleDelete,
  handleClosed,
  loading,
  icon = DeleteIcon,
  className = styles.deleteIcon,
  style,
  modalSettings,
  type,
  show = true,
}: DeleteButtonProps) => {
  React.useEffect(() => {
    history.listen(() => {
      Modal.destroyAll();
    });
  }, [history]);

  const deleteCallback = () => {
    if (disabled) return;
    showDeleteConfirmModal({
      loading,
      onConfirm: async () => {
        if (!!handleDelete) {
          return await handleDelete();
        }
      },
      onCancel: async () => {
        if (!!handleClosed) {
          await handleClosed();
        }
      },
      ...modalSettings,
    });
  };

  return (
    <>
      {show && (
        <div className={className}>
          <Icon
            component={type ? undefined : icon}
            type={type}
            className={styles.deleteIcon}
            onClick={deleteCallback}
            style={style}
          />
        </div>
      )}
    </>
  );
};
