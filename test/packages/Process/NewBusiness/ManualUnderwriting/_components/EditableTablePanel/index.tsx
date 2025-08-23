import React from 'react';
import { Row, Col } from 'antd';
import useGetLabelByConfig from '../../_hooks/useGetLabelByConfig';
import styles from './index.less';
import { isFunction } from 'lodash';

interface IFormTableProps {
  title?: React.ReactNode;
  actions?: React.ReactNode;
  extraLine?: React.ReactNode;
  itemList: any[];
  sectionConfig?: any;
  disableHeader?: boolean;
  disableDeleteItem?: (itemData?: any, index?: number) => boolean | boolean;
  disableAdd?: boolean;
  itemRender: (itemData: any, index?: number) => React.ReactNode;
  onDeleteItem?: (itemData: any) => void;
  addButtonRender?: () => React.ReactNode;
  disableOverflow?: boolean;
}

const EditableTablePanel = ({
  itemRender,
  onDeleteItem,
  itemList,
  sectionConfig,
  title,
  actions,
  extraLine,
  disableHeader = false,
  disableDeleteItem,
  disableAdd = false,
  addButtonRender,
  disableOverflow = false,
}: IFormTableProps) => {
  const labelList = useGetLabelByConfig(sectionConfig);

  return (
    <div className={styles.panelContent}>
      {(title || actions) && (
        <div className={styles.panelHeader}>
          <div className={styles.left}>{title}</div>
          <div className={styles.right}>{actions}</div>
        </div>
      )}
      <div className={styles.tableContent}>
        {!disableHeader && (
          <Row className={styles.tableHeader}>
            {labelList.map((item) => (
              <Col key={item.code} span={item.span}>
                {item.label}
              </Col>
            ))}
          </Row>
        )}
        <div className={styles.tableBody}>
          <div className={disableOverflow ? {} : styles.content}>
            {itemList
              .filter((i) => !(disableAdd && i?.isLast))
              .map((item, index) => {
                const showDelete = isFunction(disableDeleteItem)
                  ? !disableDeleteItem(item, index)
                  : !disableDeleteItem;
                return (
                  <div key={item.id} className={styles.itemWrap}>
                    <div className={styles.formWrap}>{itemRender(item, index)}</div>
                    {showDelete && isFunction(onDeleteItem) && !item?.isLast && (
                      <div className={styles.close} onClick={() => onDeleteItem(item)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                        >
                          <path
                            d="M12.8154 2.1151C13.5493 2.82569 14.0969 3.62509 14.4581 4.51332C14.8194 5.40156 15 6.31199 15 7.24464C15 8.17728 14.8194 9.08771 14.4581 9.97595C14.0969 10.8642 13.5493 11.6636 12.8154 12.3742C12.0814 13.0848 11.2557 13.6177 10.3383 13.973C9.42087 14.3283 8.4805 14.5059 7.5172 14.5059C6.5539 14.5059 5.61067 14.3283 4.6875 13.973C3.76434 13.6177 2.93578 13.0848 2.20183 12.3742C1.46789 11.6636 0.917431 10.8642 0.550459 9.97595C0.183486 9.08771 0 8.17728 0 7.24464C0 6.31199 0.183486 5.40156 0.550459 4.51332C0.917431 3.62509 1.46789 2.82569 2.20183 2.1151C2.93578 1.40452 3.76434 0.874352 4.6875 0.524611C5.61067 0.17487 6.5539 0 7.5172 0C8.4805 0 9.42087 0.17487 10.3383 0.524611C11.2557 0.874352 12.0814 1.40452 12.8154 2.1151ZM11.0264 10.5755C11.2672 10.3423 11.3733 10.0759 11.3446 9.77609C11.3159 9.47632 11.1812 9.20985 10.9404 8.97669L9.13417 7.22798L10.9404 5.47928C11.1812 5.24611 11.3159 4.97965 11.3446 4.67987C11.3733 4.38009 11.2672 4.11362 11.0264 3.88046C10.7856 3.6473 10.496 3.53072 10.1577 3.53072C9.81938 3.53072 9.52982 3.6473 9.28899 3.88046L7.4828 5.61251L5.72821 3.91377C5.48739 3.69171 5.21216 3.5668 4.90252 3.53905C4.59289 3.51129 4.31766 3.60844 4.07684 3.8305C3.83601 4.06366 3.7156 4.34678 3.7156 4.67987C3.7156 5.01295 3.83601 5.29608 4.07684 5.52924L5.83142 7.22798L4.07684 8.92672C3.83601 9.15988 3.7156 9.44023 3.7156 9.76777C3.7156 10.0953 3.83601 10.3756 4.07684 10.6088C4.31766 10.842 4.59289 10.9447 4.90252 10.9169C5.21216 10.8892 5.48739 10.7587 5.72821 10.5255L7.4828 8.8268L9.28899 10.5755C9.52982 10.8087 9.81938 10.9252 10.1577 10.9252C10.496 10.9252 10.7856 10.8087 11.0264 10.5755Z"
                            fill="#8A8A8A"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          {isFunction(addButtonRender) && addButtonRender()}
          {extraLine}
        </div>
      </div>
    </div>
  );
};
export default EditableTablePanel;
