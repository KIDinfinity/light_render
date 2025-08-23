import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'dva';
import { Row, Col, Icon } from 'antd';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { ClaimType } from 'claim/enum';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';

const MainTitle = ({ treatmentId, procedureExpand, arrowCallBack }: any) => {
  const treatmentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap[treatmentId]
  );

  const treatmentTypeOP = formUtils.queryValue(treatmentList?.treatmentType) === ClaimType.OPD;
  const therapiesType = formUtils.queryValue(treatmentList?.therapiesType);

  return (
    <Row type="flex" gutter={0} className={styles.mainTitle}>
      <Col span={10} className={styles.left}>
        <div className={styles.title}>
          {formatMessageApi({
            Label_BIZ_Claim: 'Therapies',
          })}
          {treatmentTypeOP && therapiesType && (
            <ErrorTooltipManual
              manualErrorMessage={formatMessageApi({
                Label_COM_WarningMessage: 'MSG_000517',
              })}
            />
          )}
        </div>
        <div className={classNames(styles.showHideButton, 'venus-ui-expand-button')}>
          <Icon
            type={procedureExpand ? 'up' : 'down'}
            onClick={() => {
              arrowCallBack();
            }}
          />
        </div>
      </Col>
      <Col span={14} className={styles.right}>
        <></>
      </Col>
    </Row>
  );
};

export default MainTitle;
