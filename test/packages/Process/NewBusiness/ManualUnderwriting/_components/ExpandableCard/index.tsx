import React, { useState } from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import lodash from 'lodash';
import { useSelector } from 'dva';

import styles from './index.less';

import { FormAntCard } from 'basic/components/Form';
import Modal from '../Modal';
import MUErrorBoundary from '../MUErrorBoundary';

interface IEditModalProps {
  onAfterConfirm: () => Promise<boolean>;
  onBeforeBack?: () => Promise<void>;
  onBeforeOpen?: () => Promise<void>;
  loading?: boolean;
  children: React.ReactNode;
}

interface IExtendableCardProps {
  title: string;
  info?: React.ReactNode;
  contentClassName?: string;
  headerActions?: React.ReactNode;
  children?: React.ReactNode;
  disableExpand?: boolean;
  errorBoundaryName?: string;
  editModalProps?: IEditModalProps;
}
const ExpandableCard = ({
  title,
  info,
  children,
  contentClassName,
  headerActions,
  disableExpand = false,
  editModalProps,
  errorBoundaryName = 'Card',
}: IExtendableCardProps) => {
  const [hover, setHover] = useState(false);
  const [expendStatus, setExpendStatus] = useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const TitleRender = (
    <div className={styles.header}>
      {!disableExpand && (
        <span className={styles.actions}>
          <Icon
            type={!expendStatus ? 'right' : 'down'}
            onClick={() => setExpendStatus(!expendStatus)}
          />
        </span>
      )}
      <span className={styles.title}>{title}</span>
      {info && <span className={styles.info}>{info}</span>}
      {(headerActions || editModalProps) && (
        <div className={styles.extraActions}>
          {headerActions}
          {!!hover && editModalProps && !!editable && !!editModalProps?.children && (
            <Icon
              style={{
                marginLeft: '10px',
              }}
              type="edit"
              onClick={async () => {
                if (lodash.isFunction(editModalProps?.onBeforeOpen)) {
                  await editModalProps?.onBeforeOpen();
                }
                setShowEditModal(true);
              }}
            />
          )}
        </div>
      )}
    </div>
  );

  return (
    <div
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      data-id={`NBManualUnderwriting-${title}`}
    >
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
