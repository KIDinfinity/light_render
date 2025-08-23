import React from 'react';
import { Collapse, Icon } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormAntCard } from 'basic/components/Form';
import { filterRelationTreatment } from 'claim/pages/HongKong/FurtherClaim/functions';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { VLD_000567 } from 'claim/pages/HongKong/FurtherClaim/validator';
import TreatmentInfo from './TreatmentInfo';
import TableSerial from './TableSerial';

import styles from './styles.less';

const { Panel }: any = Collapse;

const TreatmentSerial = ({
  treatmentList,
  claimProcessData,
  claimEntities,
  serialTreatments,
  namespace,
  taskNotEditable,
  isVld000568,
  dataSource,
  isRegisterMcs,
}: any) => {
  const claimData = { claimProcessData, claimEntities, serialTreatments };

  return (
    <>
      {lodash.map(treatmentList, (treatment: any) => {
        const validResult = { result: false, message: '' };

        if (!isVld000568) {
          validResult.result = VLD_000567(claimData, treatment?.id);
          validResult.message = formatMessageApi(
            { Label_COM_Message: 'MSG_000488' },
            treatment?.treatmentNo
          );
        }

        return (
          <div className={styles.treatmentSerial} key={treatment?.id}>
            <div className={styles.treatmentSerialHeader}>
              {`${formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
              })} ${treatment?.treatmentNo}`}
              {!taskNotEditable && !isRegisterMcs && validResult.result && (
                <ErrorTooltipManual isWarning manualErrorMessage={validResult.message} />
              )}
            </div>
            <FormAntCard>
              <div className={styles.content}>
                <TreatmentInfo treatment={treatment} namespace={namespace} />
              </div>
              <Collapse
                expandIcon={(props: any) => {
                  const { isActive } = props;
                  return isActive ? <Icon type="up" /> : <Icon type="down" />;
                }}
                defaultActiveKey={['1']}
                bordered={false}
                className={styles.collapse}
              >
                <Panel
                  header={formatMessageApi({ Label_BIZ_Claim: 'SerialTreatmentList' })}
                  key={'1'}
                  showArrow
                  forceRender
                >
                  {!lodash.isEmpty(dataSource) && (
                    <TableSerial
                      namespace={namespace}
                      treatmentId={treatment.id}
                      dataSource={filterRelationTreatment(dataSource, treatment?.id)}
                    />
                  )}
                </Panel>
              </Collapse>
            </FormAntCard>
          </div>
        );
      })}
    </>
  );
};

export default connect((state: any, { namespace }: any) => ({
  claimProcessData: lodash.get(state, `${namespace}.claimProcessData`),
  claimEntities: lodash.get(state, `${namespace}.claimEntities`),
  serialTreatments: lodash.get(state, `${namespace}.serialTreatments`),
  taskNotEditable: state.claimEditable.taskNotEditable,
  isRegisterMcs: lodash.get(state, `${namespace}.isRegisterMcs`),
}))(TreatmentSerial);
