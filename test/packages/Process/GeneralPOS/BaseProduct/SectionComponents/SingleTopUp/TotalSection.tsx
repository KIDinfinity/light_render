import React from 'react';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';
import { SectionDafault, Fields } from './Section';
import { Form } from 'antd';
import { connect } from 'dva';
import { StateSectionEnum } from 'process/GeneralPOS/common/Enum';

const FundSwitch = ({ form, transactionId }: any) => {
  return (
    <div>
      <div>
        <SectionDafault
          form={form}
          layout="horizontal"
          editable={false}
          section="SingleTopUp"
          tableCollect={() => {}}
        >
          <Fields.Total transactionId={transactionId} />
        </SectionDafault>
      </div>
    </div>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace, formCommonController }: any, { transactionId }: any) => ({
    totalTopupAmount:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.singleTopup?.totalTopupAmount,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'extraFieldUpdate',
          payload: {
            changedFields,
            section: StateSectionEnum.SINGLETOPUPFUNDLIST,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { totalTopupAmount } = props;
      return formUtils.mapObjectToFields({
        totalTopupAmount: Number(totalTopupAmount).toFixed(2),
      });
    },
  })(FundSwitch)
);
