import React from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { SectionDafault, Fields } from './Section';
import { Form } from 'antd';
import { connect } from 'dva';
import { OperationTypeEnum, EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const FundCode = ({ form, transactionId }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);
  return editable ? (
    <SectionDafault form={form} editable={editable} section="FundSwitching" tableCollect={() => {}}>
      <Fields.FundCode transactionId={transactionId} isAdd />
    </SectionDafault>
  ) : (
    <></>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }) => ({
  fundSwitchingFundList:
    modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.fundSwitching
      ?.fundSwitchingFundList,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (
        formUtils.shouldUpdateState(changedFields) &&
        lodash.hasIn(changedFields, 'fundCode') &&
        !lodash.isEmpty(formUtils.queryValue(changedFields.fundCode))
      ) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'fundSwitchUpdate',
          payload: {
            changedFields,
            transactionId,
            type: OperationTypeEnum.ADD,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      return formUtils.mapObjectToFields({
        fundCode: '',
      });
    },
  })(FundCode)
);
