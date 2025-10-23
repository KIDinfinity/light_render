import React from 'react';
import { connect, useSelector, useDispatch } from 'dva';
import { Icon, Row, Col } from 'antd';
import { formatMessageApiTypeCodeLabel_CLM_Opus as t } from '@/utils/dictFormatMessage';
import changeProcedureType from '../../_models/functions/changeProcedureType';
import { FormLayoutContext } from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { ReactComponent as AddIcon } from 'opus/Modules/Envoy/Assets/add.svg';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';

const TherapyWrapper = ({
  children,
  deleteCallback,
  payableJSX,
  hideDelete,
  ...otherProps
}: any) => {
  const {
    treatmentId,
    index,
    claimNo,
    isAdjustment = false,
    item,
    hideAdjustmentNo = false,
  } = otherProps;
  const dispatch = useDispatch();

  const taskDetail =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.taskDetail) || {};

  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const onAdd = () => {
    changeProcedureType({
      dispatch,
      treatmentId,
      claimNo,
    });
  };

  const handleTitleClick = (originClaimNo: string) => {
    if (!originClaimNo) return;

    const { caseCategory, partyId, customerType, businessNo } = taskDetail;

    window.open(
      `/opus/case/history?businessNo=${businessNo}&caseCategory=${caseCategory}&claimNo=${originClaimNo}&customerType=${customerType}&partyId=${partyId}`,
      '_blank'
    );
  };

  const suffix =
    isAdjustment && !hideAdjustmentNo ? (
      <>
        {` ${t('no')}.${t('adjustment')}(${t('businessNo')}.:`}
        <span
          className={styles.no}
          onClick={() => {
            handleTitleClick(item?.originClaimNo);
          }}
        >
          {item?.originClaimNo || ''}
        </span>
        {')'}
      </>
    ) : (
      ` ${t('no')}. ${index + 1}`
    );

  return (
    <Row type="flex" gutter={0}>
      <Col span={10}>
        <FormLayoutContext.ExpandProvider>
          <div className={styles.card}>
            <div className={styles.therapyItem}>
              <div className={styles.titleRow}>
                {formatMessageApi({
                  Label_BIZ_Claim: 'Therapies',
                })}
                {suffix}
                <div className={styles.gap} />
                {editable && !isAdjustment && <Icon component={AddIcon} onClick={onAdd} />}
                {editable && !hideDelete && <DeleteButton handleDelete={deleteCallback} />}
                <FormLayoutContext.ExpandIcon className={styles.icon} />
              </div>
              <div className={styles.innerCard}>{React.cloneElement(children, otherProps)}</div>
            </div>
          </div>
        </FormLayoutContext.ExpandProvider>
      </Col>
      <Col span={14} className={styles.right}>
        {payableJSX}
      </Col>
    </Row>
  );
};

export default connect(
  ({ formCommonController, opusClaimAssessment }: any, { treatmentId }: any) => ({
    validating: formCommonController.validating,
    procedureList:
      opusClaimAssessment.claimEntities?.treatmentListMap?.[treatmentId]?.procedureList,
    claimNo: opusClaimAssessment.claimProcessData?.claimNo,
  })
)(TherapyWrapper);
