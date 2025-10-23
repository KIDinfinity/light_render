import React, { useMemo } from 'react';
import { Icon, Row, Col } from 'antd';
import lodash from 'lodash';
import classNames from 'classnames';
import useGetLabelByConfig from 'process/NB/ManualUnderwriting/_hooks/useGetLabelByConfig';
import styles from './index.less';
import { ReactComponent as SuccessIcon } from '@/assets/success.svg';
import { ReactComponent as FailedIcon } from '@/assets/fail.svg';

// 这个用的是原本NB的组件
interface Iprops {
  children: React.ReactNode;
  handleAdd?: Function;
  handleDelete?: Function;
  config?: any;
  titleClassName?: string;
  displayStatus?: boolean;
  status?: string;
  name?: string;
  showOnly?: boolean;
}

const EditableTable = ({
  children,
  handleDelete,
  config,
  titleClassName,
  displayStatus = false,
  showOnly,
}: Iprops) => {
  const isShow = useMemo(() => {
    // 没传config时，无条件显示。
    if (lodash.isUndefined(config)) {
      return true;
    }
    const result = lodash.find(config, (item: any) => {
      const visible = lodash.get(item, 'field-props.visible');
      return visible === 'Y';
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
          {React.Children.map(children, (child: any, index) => {
            return !lodash.isEmpty(child?.props) || !showOnly ? (
              <div className={styles.column} key={index}>
                <div className={styles.main}>{child}</div>
                <div className={styles.button}>
                  <div className={styles.delete} onClick={() => handleDelete(child.props)}>
                    {index !== children?.[0]?.length &&
                      !showOnly &&
                      !lodash.includes(
                        ['ready', 'failed', 'success', 'cancelled'],
                        child?.props?.status
                      ) && <Icon type="close-circle" />}
                  </div>

                  {displayStatus && child?.props?.status === 'success' && <SuccessIcon />}
                  {displayStatus && child?.props?.status === 'failed' && <FailedIcon />}
                </div>
              </div>
            ) : null;
          })}
        </div>
      )}
    </>
  );
};

export default EditableTable;
