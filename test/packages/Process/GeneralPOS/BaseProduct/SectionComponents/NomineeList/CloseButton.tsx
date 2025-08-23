import React from 'react';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import styles from './index.less';
import { Icon } from 'antd';

const CloseButton = ({ handleClose, className }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.CommonNominee);

  return (
    <>
      {editable && (
        <div className={className}>
          <div className={styles.icon} onClick={handleClose}>
            <Icon type="close" />
          </div>
        </div>
      )}
    </>
  );
};

export default CloseButton;
