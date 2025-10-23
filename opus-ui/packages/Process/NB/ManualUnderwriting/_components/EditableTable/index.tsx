import React, { useMemo } from 'react';
import { Icon, Row, Col } from 'antd';
import lodash from 'lodash';
import classNames from 'classnames';
import useGetLabelByConfig from 'process/NB/ManualUnderwriting/_hooks/useGetLabelByConfig';
import styles from './index.less';
import { ReactComponent as SuccessIcon } from '@/assets/success.svg';
import { ReactComponent as FailedIcon } from '@/assets/fail.svg';

interface Iprops {
  children: React.ReactNode;
  handleAdd?: Function;
  handleDelete?: Function;
  config?: any;
  titleClassName?: string;
  displayStatus?: boolean;
  status?: string;
  name?: string;
}

const EditableTable = ({
  children,
  handleAdd,
  handleDelete,
  config,
  titleClassName,
  displayStatus = false,
}: Iprops) => {
  const isShow = useMemo(() => {
    // 没传config时，无条件显示。
    if (lodash.isUndefined(config)) {
      return true;
    }
    const result = lodash.find(config, (item: any) => {
      const visible = lodash.get(item, 'field-props.visible');
      return visible === 'Y' || visible === 'C';
    });
    if (result) {
      return true;
    }
    return false;
  }, [config]);

  const tableLabel = useGetLabelByConfig({ tableConfig: config });
  return (
    <>
      {isShow && (
        <div className={styles.editableContainer}>
          <Row
            className={classNames(styles.tableTitle, {
              [titleClassName]: titleClassName,
            })}
          >
            {lodash.map(tableLabel, (item, index) => {
              return (
                <Col span={item.span || 4} key={index}>
                  {item.label}
                </Col>
              );
            })}
          </Row>
          {React.Children.map(children, (child, index) => {
            const isFirstRecordShowDeleteButton = child?.key ? !(child?.key === '0') : true;
            const isCurrentRecordShowAddButton = index === children?.length - 1;
            const displayAddButton = (() => {
              if (!lodash.isFunction(handleAdd)) {
                return false;
              }
              return true;
            })();
            const displayDeleteButton = (() => {
              if (!lodash.isFunction(handleDelete)) {
                return false;
              }
              if (
                lodash.includes(['ready', 'failed', 'success', 'cancelled'], child?.props?.status)
              ) {
                return false;
              }
              if (child?.props?.['data-hiddenDeleteButton'] === true) {
                return false;
              }
              return true;
            })();
            return (
              <div className={styles.column} key={index}>
                <div className={styles.main}>{child}</div>
                <div className={styles.button}>
                  {displayAddButton && isCurrentRecordShowAddButton && (
                    <div className={styles.add} onClick={() => handleAdd(child.props)}>
                      <Icon type="plus" />
                    </div>
                  )}
                  {isFirstRecordShowDeleteButton && displayDeleteButton && (
                    <div className={styles.delete} onClick={() => handleDelete(child.props)}>
                      <Icon type="close" />
                    </div>
                  )}
                  {displayStatus && child?.props?.status === 'success' && <SuccessIcon />}
                  {displayStatus && child?.props?.status === 'failed' && <FailedIcon />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default EditableTable;
