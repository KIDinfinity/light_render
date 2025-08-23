import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import { FormItemRadioGroup } from 'basic/components/Form/FormSection';

interface IProps {
  dispatch: Dispatch<any>;
  form: any;
  taskNotEditable?: boolean;
  usTaxDeclarations: object;
  validating: boolean;
}

class Options extends Component<IProps> {
  render() {
    const { form, taskNotEditable, Dropdown_POS_WDOption }: any = this.props;
    return (
      <FormItemRadioGroup
        // @ts-ignore
        form={form}
        labelId={formatMessageApi({
          Label_BIZ_POS: 'WDOpt',
        })}
        formName="withdrawalOption"
        dicts={Dropdown_POS_WDOption}
        disabled={taskNotEditable}
      />
    );
  }
}

export default connect(({ dictionaryController, phowbDataCaptureController }: any) => ({
  Dropdown_POS_WDOption: dictionaryController.Dropdown_POS_WDOption,
  withdrawalOption:
    phowbDataCaptureController.claimProcessData.posDataDetail.partialWithdrawal?.withdrawalOption,
}))(
  Form.create({
    onFieldsChange(props: IProps, changedFields: any) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'phowbDataCaptureController/saveEntry',
              target: 'updateWithdrawalOption',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'phowbDataCaptureController/saveFormData',
            target: 'updateWithdrawalOption',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { withdrawalOption }: any = props;
      return formUtils.mapObjectToFields({ withdrawalOption }, {});
    },
  })(Options)
);
