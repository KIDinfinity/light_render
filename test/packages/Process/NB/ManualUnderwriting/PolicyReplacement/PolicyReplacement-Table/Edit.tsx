import React from 'react';
import { Icon, Form, Row, Col } from 'antd';
import { useDispatch, connect } from 'dva';
import lodash from 'lodash';
import Ellipsis from '@/components/Ellipsis';
import transFieldsConfig from 'basic/utils/transFieldsConfig';
import EditableTableProvider from 'process/NB/ManualUnderwriting/_components/EditableTable';
import useGetReplacementInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetReplacementInfoList';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import EditItem from './EditItem';
import styles from './index.less';

const RenderTitle = ({ list }: any) => {
  const titleList = lodash.filter(list, (item) => item.label);
  return (
    <Row type="flex" gutter={16}>
      {lodash.map(titleList, (item: any) => {
        return (
          <Col key={item.label} span={item.span}>
            <Ellipsis lines={0} length={18} fullWidthRecognition>
              {item.label}
            </Ellipsis>
          </Col>
        );
      })}
    </Row>
  );
};

const PolicyReplacementTable = ({ config }: any) => {
  const list = transFieldsConfig({ config });
  const dispatch = useDispatch();
  const replacementInfoList = useGetReplacementInfoList();
  const deleteCurrentRow = (record: any) => {
    dispatch({
      type: `${NAMESPACE}/deletePolicyReplacementSelectedRow`,
      payload: {
        selectedRow: record,
      },
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.customTitle}>
        <RenderTitle list={list} />
      </div>
      <EditableTableProvider condition={replacementInfoList && replacementInfoList.length}>
        {lodash.map(replacementInfoList, (item: any, index: any) => {
          return (
            <div className={styles.column}>
              <div className={styles.inputwrap}>
                <EditItem data={item} key={item.id} index={index} />
              </div>
              {index !== 0 && (
                <div className={styles.close} onClick={() => deleteCurrentRow(item)}>
                  <Icon type="close" />
                </div>
              )}
            </div>
          );
        })}
      </EditableTableProvider>
    </div>
  );
};

export default connect()(Form.create<any>({})(PolicyReplacementTable));
