import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { FormAntCard } from 'basic/components/Form';
import { useSelector } from 'dva';
import ResizeModal from '@/components/ResizeModal';
import ClaimPayableList from './Payable/List';
import Basic from './Basic';
import DiagnosisList from '../Diagnosis/List';
import TreatmentList from '../Treatment/List';
import ExpandExtra from './ExpandExtra';
import { SectionTitle } from './Section';

const IncidentItem = ({ incidentId, hasTreatment }: any) => {
  const incidentNo = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities?.incidentListMap?.[incidentId]?.incidentNo
  );

  const [visible, setVisible] = useState(false);

  return (
    <Row type="flex" gutter={16}>
      <Col span={12}>
        <FormAntCard
          title={<SectionTitle suffix={` No. ${incidentNo}`} />}
          bordered={false}
          extra={<ExpandExtra {...{ incidentId, hasTreatment }} />}
        >
          <ClaimPayableList incidentId={incidentId} hasTreatment={hasTreatment} />
          <Basic incidentId={incidentId} hasTreatment={hasTreatment} />
          {/**
          //@ts-ignore */}
          <DiagnosisList incidentId={incidentId} hasTreatment={hasTreatment} />
        </FormAntCard>
      </Col>
      <Col span={12}>
        {/**
          //@ts-ignore */}
        <TreatmentList incidentId={incidentId} />
      </Col>
      <ResizeModal visible={visible} setVisible={setVisible}>
        popup
      </ResizeModal>
    </Row>
  );
};

export default IncidentItem;
