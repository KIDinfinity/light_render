import React from 'react';
import { Row, Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import Basic from './Basic';
import TreatmentPayable from './Payable';
import styles from './Item.less';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import { FormAntCard } from 'basic/components/Form';
import EIsAdjustment from 'process/JPCLM/ManualAssessment/_models/enum/isAdjustment';
import { SectionTitle } from './Section';

const TreatmentItem = ({ incidentId, treatmentId }: any) => {
  const dispatch = useDispatch();

  const treatmentItem = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities?.treatmentListMap?.[treatmentId]
  );

  const editable =
    !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable) &&
    treatmentItem?.isAdjustment === EIsAdjustment.Y;

  const taskDetail =
    useSelector(({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment?.taskDetail) || {};

  const handleDelete = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/treatmentDelete',
      payload: {
        incidentId,
        treatmentId,
      },
    });
  };

  const handleTitleClick = (originClaimNo: string) => {
    const { caseCategory, partyId, customerType, businessNo } = taskDetail;

    window.open(
      `/claim/history?businessNo=${businessNo}&caseCategory=${caseCategory}&claimNo=${originClaimNo}&customerType=${customerType}&partyId=${partyId}`,
      '_blank'
    );
  };

  return (
    <div className={styles.treatmentItem}>
      <Row type="flex" gutter={16}>
        <Col span={24}>
          <FormAntCard
            title={
              <>
                <SectionTitle suffix={` No.${treatmentItem.treatmentNo}`} />
                {treatmentItem?.isAdjustment === EIsAdjustment.Y && (
                  <span className={styles.Adjustment}>
                    ADJ{' '}
                    <span
                      className={styles.no}
                      onClick={() => {
                        handleTitleClick(treatmentItem.originClaimNo);
                      }}
                    >
                      NO.{treatmentItem.originClaimNo}
                    </span>
                  </span>
                )}
              </>
            }
            extra={editable && <ButtonOfSmall icon="close" handleClick={handleDelete} />}
            bordered={false}
            style={{ width: '100%' }}
          >
            {/**
                   //@ts-ignore */}

            <TreatmentPayable incidentId={incidentId} treatmentId={treatmentId} />
            <Basic
              incidentId={incidentId}
              treatmentId={treatmentId}
              isAdjustment={treatmentItem?.isAdjustment === EIsAdjustment.Y}
            />
          </FormAntCard>
        </Col>
      </Row>
    </div>
  );
};

export default TreatmentItem;
