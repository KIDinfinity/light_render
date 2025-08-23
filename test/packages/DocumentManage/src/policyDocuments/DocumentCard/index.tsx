import React from 'react';
import { Divider } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

interface IProps {
  id: string;
  fileName: string;
  createDate: string;
  documentType?: string;
  onSelect?: (id: string) => void;
  selected?: boolean;
}

const DocumentCard: React.FC<IProps> = (props) => {
  const onClick = () => {
    props.onSelect?.(props.id);
  };
  return (
    <div
      className={classnames([styles.documentCard], {
        [styles.selected]: props.selected,
      })}
      onClick={onClick}
    >
      <p className={styles.fileName}>{props.fileName}</p>
      <Divider />
      <p>{props.documentType}</p>
      <p>{props.createDate}</p>
    </div>
  );
};

export default DocumentCard;
