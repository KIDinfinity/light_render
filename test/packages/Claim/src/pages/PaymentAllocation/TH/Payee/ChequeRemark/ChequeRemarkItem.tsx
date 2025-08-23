import type { FunctionComponent } from 'react';
import React from 'react';
import { connect } from 'dva';
import { Form, Input, Icon } from 'antd';
import lodash from 'lodash';
import { FormItemAutoComplete } from 'basic/components/Form/FormItem';
import { withContextData } from '@/components/_store';
import { formUtils } from 'basic/components/Form';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import FormRegist from '@/components/FormRegistComponent';
import Panel from '../../../_components/Panel';
import type { ChequeRemarkModal } from '../../../_dto/Models';
import { shallowEqual } from '../../../_function';

import styles from './styles.less';

export interface IProps extends IFormRegistProps {
  remarkItem: ChequeRemarkModal;
}

const ChequeRemark: FunctionComponent<IProps> = ({
  taskNotEditable,
  form,
  Dropdown_PAY_ChequeRemarkTemplate,
  remarkItem,
  dispatch,
  withData,
}: any) => {
  const dataSource = lodash.map(Dropdown_PAY_ChequeRemarkTemplate, (item: any) => item.dictName);
  const payeeId = lodash.get(withData, 'payeeItem.id', '');

  const delChequeRemark = (chequeRemarkId: number) => {
    dispatch({
      type: 'paymentAllocation/deleteChequeRemark',
      payload: {
        payeeId,
        chequeRemarkId,
      },
    });
  };

  return (
    <Panel.BackColor
      className={styles.chequeRemarkPanel}
      closable={!taskNotEditable}
      onClose={() => delChequeRemark(remarkItem?.id)}
      style={{ marginLeft: 0, marginRight: 0 }}
    >
      <div className={styles.chequeRemarkWrap}>
        <FormItemAutoComplete
          allowClear
          className={styles.chequeRemark}
          dataSource={dataSource}
          onSearch={() => dataSource}
          form={form}
          disabled={taskNotEditable}
          formName="remark"
        >
          <Input suffix={<Icon className={styles.chequeRemarkListIcon} type="down" />} />
        </FormItemAutoComplete>
      </div>
    </Panel.BackColor>
  );
};

const FormWrap = Form.create<IProps>({
  mapPropsToFields(props) {
    const { remarkItem } = props;
    return formUtils.mapObjectToFields(remarkItem);
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, withData, remarkItem, validating }: any = props;
    const payeeId = lodash.get(withData, 'payeeItem.id', '');

    if (lodash.isFunction(dispatch) && formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'paymentAllocation/saveEntry',
            target: 'saveChequeRemark',
            payload: {
              chequeRemarkId: remarkItem.id,
              payeeId,
              changedFields,
            },
          });
        });
      } else {
        dispatch({
          type: 'paymentAllocation/saveFormData',
          target: 'saveChequeRemark',
          payload: {
            chequeRemarkId: remarkItem.id,
            payeeId,
            changedFields,
          },
        });
      }
    }
  },
})(FormRegist({ nameSpace: 'paymentAllocation' })(React.memo(ChequeRemark, shallowEqual)));

export default connect(({ claimEditable, formCommonController, dictionaryController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  validating: formCommonController.validating,
  Dropdown_PAY_ChequeRemarkTemplate: dictionaryController.Dropdown_PAY_ChequeRemarkTemplate,
}))(withContextData(FormWrap));
