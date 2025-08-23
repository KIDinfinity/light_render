import React from 'react';
import { Form, Icon } from 'antd';
import { connect, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import classNames from 'classnames';
import {
  OperationTypeEnum,
  EditSectionCodeEnum,
  StateSectionEnum,
} from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { defaultOptionByRegion } from 'process/GeneralPOS/common/utils';

const Item = ({ form, fundSwitchingFundList, transactionId, id: index, tableCollect }: any) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);
  const item = fundSwitchingFundList?.[index] || {};

  const remove = () => {
    dispatch({
      type: `${NAMESPACE}/fundSwitchUpdate`,
      payload: {
        transactionId,
        index,
        type: OperationTypeEnum.DELETE,
      },
    });
  };

  return (
    <div className={styles.box}>
      <Section form={form} editable={editable} section="FundSwitching" tableCollect={tableCollect}>
        <Fields.FundCode transactionId={transactionId} />
        <Fields.UnitHolding />
        <Fields.AllocationPercentage />
        {/* <Fields.AllocatePct /> */}
        <Fields.SwitchOutPerc />
        <Fields.SwitchOutUnit />
        <Fields.SwitchOutAmount />
        <Fields.SwitchInPerc />
        <Fields.AcknowledgedNonrecommendedFunds transactionId={transactionId} />
        <Fields.FxFormDate />
        <Fields.AcknowledgedFXFunds />
        <Fields.ExceedRiskToleranceLevel />
      </Section>
      {editable && !!item?.isAdd && (
        <div className={classNames(styles.btn)}>
          <div className={styles.icon} onClick={remove}>
            <Icon type="close" />
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace, processTask }: any, { transactionId }: any) => ({
    task: processTask?.getTask,

    fundSwitchingFundList:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.fundSwitching
        ?.fundSwitchingFundList || [],
    switchingOutOption:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.fundSwitching
        ?.switchingOutOption,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, id: index }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'fundSwitchUpdate',
          payload: {
            changedFields,
            transactionId,
            index,
            type: OperationTypeEnum.UPDATE,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { fundSwitchingFundList, task, id: index, switchingOutOption } = props;
      const item = fundSwitchingFundList?.[index] || {};
      const data = {
        ...item,
        switchingOutOption:
          switchingOutOption || defaultOptionByRegion(StateSectionEnum.FUNDSWITCHING),
        allocationPercentage: !lodash.isNil(item?.allocationPercentage)
          ? Number(item?.allocationPercentage) * 100
          : '',
      };

      return formUtils.mapObjectToFields(
        task?.taskStatus === 'completed' ? formUtils.cleanValidateData(data) : data
      );
    },
  })(Item)
);
