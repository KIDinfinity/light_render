import React from 'react';
import lodash from 'lodash';
import { Row, Col } from 'opus/Components/Antd';
import {
  formatMessageApiTypeCodeLabel_CLM_Opus as t,
  formatMessageApi,
} from '@/utils/dictFormatMessage';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { eBenefitSubCategory } from 'claim/enum/BenefitSubCategory';
import ListItem from './ListItem';

import styles from './index.less';
const ReimbursementHeader = (
  <Row className={styles.titleWrap}>
    <Col span="1">{t('')}</Col>
    <Col span="4">{t('treatmentNo')}</Col>
    <Col span="7">{t('therapyNoType')}</Col>
    <Col span="4">{t('payableAmount')}</Col>
  </Row>
);
const List = ({
  benefitItemData,
}: {
  benefitItemData: {
    benefitCategory?: eBenefitCategory;
    benefitSubCategory?: eBenefitSubCategory;
    listMap?: any[];
  };
}) => {
  const mapTitle = {
    [eBenefitCategory.Life]: (
      <Row className={styles.titleWrap}>
        <Col span="1">{t('')}</Col>
        <Col span="4">{t('incidentNo')}</Col>
        <Col span="6">{t('payableAmount')}</Col>
      </Row>
    ),
    [eBenefitCategory.MIC]: (
      <Row className={styles.titleWrap}>
        <Col span="1">{t('')}</Col>
        <Col span="4">{t('incidentNo')}</Col>
        <Col span="6">{t('payableAmount')}</Col>
      </Row>
    ),
    [eBenefitCategory.Cashless]:
      benefitItemData?.benefitSubCategory === eBenefitSubCategory.OP ? (
        <Row className={styles.titleWrap}>
          <Col span="1">{t('')}</Col>
          <Col span="4">
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.treatment-no',
            })}
          </Col>
          <Col span="8">{formatMessageApi({ Label_BIZ_Claim: 'outpatientDate' })}</Col>
          <Col span="5">{t('payableDays')}</Col>
          <Col span="6">{t('payableAmount')}</Col>
        </Row>
      ) : (
        <Row className={styles.titleWrap}>
          <Col span="1">{t('')}</Col>
          <Col span="4">
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.treatment-no',
            })}
          </Col>
          <Col span="8">{formatMessageApi({ Label_BIZ_Claim: 'HospitalisationPeriod' })}</Col>
          <Col span="6">{t('payableAmount')}</Col>
          <Col span="5">{t('payableDays')}</Col>
        </Row>
      ),
    [eBenefitCategory.Aipa]: <></>,
    [eBenefitCategory.Reimbursement]: ReimbursementHeader,
    [eBenefitCategory.S]: (
      <Row className={styles.titleWrap}>
        <Col span="1">{t('')}</Col>
        <Col span="3">
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.treatment-no',
          })}
        </Col>
        <Col span="4">
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.date-of-operation',
          })}
        </Col>
        <Col span="7">
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.procedure-name',
          })}
        </Col>
        <Col span="4">{t('payableAmount')}</Col>
        <Col span="5">{formatMessageApi({ Label_CLM_Opus: 'reimbursementPercentage' })}</Col>
      </Row>
    ),
    [eBenefitCategory.Crisis]: <></>,
    [eBenefitCategory.T]: ReimbursementHeader,
    [eBenefitCategory.CIC]: ReimbursementHeader,
  } as Record<eBenefitCategory, any>;

  return (
    <div className={styles.service}>
      {benefitItemData?.benefitCategory && mapTitle?.[benefitItemData?.benefitCategory]}
      {lodash.compact(lodash.values(benefitItemData?.listMap)).map((item: any, index: number) => (
        <div key={item?.id}>
          <ListItem
            listMapItemId={item?.id}
            chooise={item.chooise}
            data={lodash.values(item?.childrenMap)?.[0]}
            index={index}
            benefitItemData={benefitItemData}
          />
        </div>
      ))}
    </div>
  );
};

export default List;
