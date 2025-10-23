import React from 'react';
import { useSelector } from 'dva';
import { Row, Col } from 'antd';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { ClaimType } from 'claim/enum';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import classnames from 'classnames';
import styles from './index.less';

const MainTitle = ({ treatmentId, havePayable }: any) => {
  const treatmentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap[treatmentId]
  );

  const treatmentTypeOP = formUtils.queryValue(treatmentList?.treatmentType) === ClaimType.OPD;
  const therapiesType = formUtils.queryValue(treatmentList?.therapiesType);

  return (
    <Row type="flex" gutter={0} className={styles.mainTitle}>
      <Col span={10}>
        <div className={classnames(styles.title, styles.card)}>
          {treatmentTypeOP && therapiesType && (
            <ErrorTooltipManual
              manualErrorMessage={formatMessageApi({
                Label_COM_WarningMessage: 'MSG_000517',
              })}
            />
          )}
        </div>
      </Col>
      {
        havePayable && (
          <Col span={14} className={styles.right}>
            <div className={styles.emptyTherapyWrap}/>
          </Col>
        )
      }
    </Row>
  );
};

export default MainTitle;
