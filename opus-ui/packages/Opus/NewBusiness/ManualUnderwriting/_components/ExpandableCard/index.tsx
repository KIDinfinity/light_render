import { Icon } from 'antd';
import { FormAntCard } from 'basic/components/Form';
import classnames from 'classnames';
import { useSelector } from 'dva';
import lodash from 'lodash';
import React, { useState } from 'react';
import Modal from '../Modal';
import MUErrorBoundary from '../MUErrorBoundary';
import styles from './index.less';
import useGetDisplayEditButton from '../../_hooks/useGetDisplayEditButton';

interface IEditModalProps {
  onAfterConfirm: () => Promise<boolean>;
  onBeforeBack?: () => Promise<void>;
  onBeforeOpen?: () => Promise<void>;
  loading?: boolean;
  children: React.ReactNode;
}

interface IExtendableCardProps {
  title: string;
  icon?: React.ReactNode;
  info?: React.ReactNode;
  contentClassName?: string;
  headerActions?: React.ReactNode;
  children?: React.ReactNode;
  disableExpand?: boolean;
  errorBoundaryName?: string;
  editModalProps?: IEditModalProps;
  extraInfo?: React.ReactNode;
}
const ExpandableCard = ({
  title,
  icon,
  info,
  children,
  contentClassName,
  headerActions,
  disableExpand = false,
  editModalProps,
  errorBoundaryName = 'Card',
  extraInfo,
}: IExtendableCardProps) => {
  const [expendStatus, setExpendStatus] = useState(true); // 各section默认展开
  const [showEditModal, setShowEditModal] = React.useState(false);

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const showEditButton = useGetDisplayEditButton({ editable, editModalProps });

  const TitleRender = (
    <div className={styles.header}>
      {icon && <Icon component={icon} className={styles.headerIcon} />}
      <span className={styles.title}>{title}</span>
      {info && <span className={styles.info}>{info}</span>}
      {extraInfo && extraInfo}
      {(headerActions || editModalProps) && (
        <div className={styles.extraActions}>
          {headerActions}
          {showEditButton && (
            <div
              onClick={async () => {
                if (lodash.isFunction(editModalProps?.onBeforeOpen)) {
                  await editModalProps?.onBeforeOpen();
                }
                setShowEditModal(true);
              }}
              className={styles.edit}
            >
              <Icon
                style={{
                  marginLeft: '10px',
                }}
                type="edit"
              />
              Edit
            </div>
          )}
        </div>
      )}

      {!disableExpand && (
        <span className={styles.collapse}>
          <Icon
            type={!expendStatus ? 'right' : 'down'}
            onClick={() => setExpendStatus(!expendStatus)}
          />
        </span>
      )}
    </div>
  );

  return (
    <div data-id={`NBManualUnderwriting-${title}`}>
      <MUErrorBoundary panelName={errorBoundaryName}>
        <FormAntCard
          title={TitleRender}
          className={classnames(styles.detail, {
            [styles.hidden]: !expendStatus,
          })}
        >
          {expendStatus ? <div className={contentClassName}>{children}</div> : null}
          {editModalProps && editModalProps.children && (
            <Modal
              width="90%"
              show={showEditModal}
              setShow={setShowEditModal}
              onBack={editModalProps?.onBeforeBack}
              onConfirm={editModalProps.onAfterConfirm}
              children={editModalProps.children}
              loading={lodash.isBoolean(editModalProps.loading) ? editModalProps.loading : true}
              confirmLoading={true}
            />
          )}
        </FormAntCard>
      </MUErrorBoundary>
    </div>
  );
};
export default ExpandableCard;
