import React from 'react';
import { Row, Col } from 'antd';
import classnames from 'classnames';
import useGetLabelByConfig from '../../_hooks/useGetLabelByConfig';
import originStyles from './index.less';
import lodash, { isFunction } from 'lodash';

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
  styleReplacement?: any;
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
  styleReplacement,
}: IFormTableProps) => {
  const labelList = useGetLabelByConfig(sectionConfig);
  const styles = lodash.isPlainObject(styleReplacement) ? styleReplacement : originStyles;

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
          <Row className={classnames(styles.tableHeader)}>
            {labelList.map((item) => (
              <Col key={item.code} span={item.span}>
                {item.label}
              </Col>
            ))}
          </Row>
        )}
        <div className={styles.tableBody}>
          <div className={styles.content}>
            {lodash
              .chain(itemList)
              .filter((i) => !(disableAdd && i?.isLast))
              .map((item, index) => {
                const showDelete = isFunction(disableDeleteItem)
                  ? !disableDeleteItem(item, index)
                  : !disableDeleteItem;

                const showDeleteButton = index === itemList?.length - 1;
                return (
                  <div key={item.id} className={styles.itemWrap}>
                    <div className={styles.formWrap}>{itemRender(item, index)}</div>
                    {showDelete && isFunction(onDeleteItem) && !item?.isLast && (
                      <div className={styles.close} onClick={() => onDeleteItem(item)}>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.00008 0V0.666667H0.666748V2H1.33341V10.6667C1.33341 11.0203 1.47389 11.3594 1.72394 11.6095C1.97399 11.8595 2.31313 12 2.66675 12H9.33341C9.68704 12 10.0262 11.8595 10.2762 11.6095C10.5263 11.3594 10.6667 11.0203 10.6667 10.6667V2H11.3334V0.666667H8.00008V0H4.00008ZM2.66675 2H9.33341V10.6667H2.66675V2ZM4.00008 3.33333V9.33333H5.33341V3.33333H4.00008ZM6.66675 3.33333V9.33333H8.00008V3.33333H6.66675Z"
                            fill="#B3B7BB"
                          />
                        </svg>
                      </div>
                    )}
                    {showDeleteButton && isFunction(addButtonRender) && addButtonRender()}
                  </div>
                );
              })
              .value()}
          </div>
          {extraLine}
        </div>
      </div>
    </div>
  );
};
export default EditableTablePanel;
