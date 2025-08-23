import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils, FormLayoutContext } from 'basic/components/Form';
import OutpatientItem from './Item';
import AddField from './AddField';
import styles from './List.less';

const OutpatientList = ({
  treatmentPayableItemId,
  curTreatmentPayableList,
  treatmentId,
  incidentId,
  layoutName,
  cardStyle,
}: any) => {
  const opTreatmentPayableListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities.opTreatmentPayableListMap
  );

  const opTreatmentPayableList = lodash
    .chain(opTreatmentPayableListMap)
    .filter((item: any) => item.treatmentPayableId === treatmentPayableItemId)
    .orderBy(
      (item: any) => {
        return formUtils.queryValue(item.dateOfConsultation);
      },
      ['asc']
    )
    .map('id')
    .value();

  return (
    <>
      {!lodash.isEmpty(opTreatmentPayableList) && (
        <div className={styles.OutpatientList}>
          <Row className={styles.titleWrap}>
            <Col span={8}>
              {formatMessageApi({
                Label_BIZ_Claim: 'outpatientDate',
              })}
            </Col>
            <Col span={8}>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.payable-days',
              })}
            </Col>
            <Col span={8}>
              {formatMessageApi({
                Label_BIZ_Claim: 'payableAmount',
              })}
            </Col>
          </Row>
          <FormLayoutContext.ExpandProvider>
            <FormLayoutContext.ExpandIcon className={styles.expandIcon} />
            {lodash.map(opTreatmentPayableList, (item: any) => (
              <OutpatientItem
                key={item}
                layoutName={layoutName}
                incidentId={incidentId}
                treatmentId={treatmentId}
                opTreatmentPayableId={item}
                treatmentPayableId={treatmentPayableItemId}
                curTreatmentPayableList={curTreatmentPayableList}
                cardStyle={cardStyle}
              />
            ))}
          </FormLayoutContext.ExpandProvider>
        </div>
      )}
      <AddField
        treatmentId={treatmentId}
        treatmentPayableId={treatmentPayableItemId}
        incidentId={incidentId}
      />
    </>
  );
};

export default OutpatientList;
