import React from 'react';
import { formUtils } from 'basic/components/Form';
import { SectionDafault, Fields } from './Section';
import { Form } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import {
  OperationTypeEnum,
  StateSectionEnum,
  EditSectionCodeEnum,
} from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { defaultOptionByRegion } from 'process/GeneralPOS/common/utils';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import classNames from 'classnames';
import { tenant } from '@/components/Tenant';

const WithdrawalOptSection = ({ form }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <div
      className={classNames({
        [styles.checkoutBox]: true,
        [styles.mb12]: !tenant.isPH(),
        [styles.withdrawalOptSection]: true,
      })}
    >
      <SectionDafault
        form={form}
        editable={editable}
        section="PartialWithdrawal"
        tableCollect={() => {}}
      >
        <Fields.WithdrawalOpt />
      </SectionDafault>
    </div>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace, processTask }: any, { transactionId }: any) => ({
    withdrawalOpt:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.partialWithdrawal
        ?.withdrawalOpt,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, isNotDataCapture }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'partialWithdrawalUpdate',
          payload: {
            changedFields,
            transactionId,
            type: OperationTypeEnum.COVER,
            isNotDataCapture,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { withdrawalOpt } = props;

      return formUtils.mapObjectToFields({
        withdrawalOpt:
          withdrawalOpt || defaultOptionByRegion(StateSectionEnum.PARTIALWITHDRAWALOPTION),
      });
    },
  })(WithdrawalOptSection)
);
