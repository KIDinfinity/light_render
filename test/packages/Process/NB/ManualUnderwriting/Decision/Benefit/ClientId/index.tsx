import React from 'react';
import { Col, Row } from 'antd';
import lodash from 'lodash';
import useGetPlaninfotableEditable from 'process/NB/ManualUnderwriting/_hooks/useGetPlaninfotableEditable';
import ClientNameSection from './ClientNameSection';
import AddClient from './AddClient';
import DeleteClient from './DeleteClient';
import styles from './index.less';
import useJudgeWaiveProductDisplay from 'process/NB/ManualUnderwriting/_hooks/useJudgeWaiveProductDisplay';

const ClientId = ({ layout, data, id, disabled }: any) => {
  const editable = useGetPlaninfotableEditable();
  const notManualRemove = lodash.get(data, 'notManualRemove') === 'Y';
  const hasWaiveproduct = useJudgeWaiveProductDisplay();
  if (hasWaiveproduct) layout.span = 3;

  return (
    <Col {...layout}>
      {lodash
        .chain(data)
        .get('coverageInsuredList', [])
        .map((insured: any, index: number) => {
          return (
            <Row key={insured?.id} className={styles.container}>
              <Col span={20}>
                <ClientNameSection data={insured} item={data} id={id} disabled={disabled} />
              </Col>

              {!disabled && editable && !notManualRemove && index === 0 && (
                <Col span={2}>
                  <AddClient item={data} />
                </Col>
              )}
              {editable && !notManualRemove && index !== 0 && (
                <Col span={2}>
                  {' '}
                  <DeleteClient coverage={data} insured={insured} />{' '}
                </Col>
              )}
            </Row>
          );
        })
        .value()}
    </Col>
  );
};

ClientId.displayName = 'clientId';

export default ClientId;
