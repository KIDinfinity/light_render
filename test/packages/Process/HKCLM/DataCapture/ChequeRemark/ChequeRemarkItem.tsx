import type { FunctionComponent } from 'react';
import React from 'react';
import { NAMESPACE } from '../activity.config';

import { connect } from 'dva';
import { Form, Input, Icon } from 'antd';
import lodash from 'lodash';
import { formUtils, FormItemAutoComplete } from 'basic/components/Form';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import Panel from '../_components/Panel';
import styles from './styles.less';

interface ChequeRemarkModal {
  claimNo: string;
  id: string;
  remark: string;
}

export interface IProps extends IFormRegistProps {
  remarkItem: ChequeRemarkModal;
}

const ChequeRemark: FunctionComponent<IProps> = ({
  taskNotEditable,
  form,
  Dropdown_PAY_ChequeRemarkTemplate,
  remarkItem,
  dispatch,
}: any) => {
  const dataSource = lodash.map(Dropdown_PAY_ChequeRemarkTemplate, (item: any) => item.dictName);
  const delChequeRemark = (chequeRemarkId: number) => {
    dispatch({
      type: `${NAMESPACE}/removeChequeRemark`,
      payload: {
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
          <Input
            suffix={<Icon className={styles.chequeRemarkListIcon} type="down" />}
            maxLength={80}
          />
        </FormItemAutoComplete>
      </div>
    </Panel.BackColor>
  );
};

const FormWrap = Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, remarkItem }: any = props;
    if (lodash.isFunction(dispatch) && formUtils.shouldUpdateState(changedFields)) {
      dispatch({
        type: `${NAMESPACE}/saveFormData`,
        target: 'saveChequeRemark',
        payload: { changedFields, chequeRemarkId: remarkItem?.id },
      });
    }
  },
  mapPropsToFields(props) {
    const { remarkItem } = props;
    return formUtils.mapObjectToFields(remarkItem);
  },
})(ChequeRemark);

export default connect(({ claimEditable, dictionaryController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  Dropdown_PAY_ChequeRemarkTemplate: dictionaryController.Dropdown_PAY_ChequeRemarkTemplate,
}))(FormWrap);
