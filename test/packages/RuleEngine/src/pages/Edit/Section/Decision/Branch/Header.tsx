import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormLayout, FormItemInput } from 'basic/components/Form/FormSection';
import { ButtonType, AddType } from '../../../Enum';
import styles from './index.less';

const ButtonList = [
  { key: ButtonType.NEW, labelId: 'venus_claim.ruleEngine.label.newCondition' },
  {
    key: ButtonType.SEARCH,
    disabled: true,
    labelId: 'venus_claim.ruleEngine.label.button.existingCondition',
  },
  { key: ButtonType.ADD, labelId: 'venus_claim.ruleEngine.label.button.addToLibrary' },
];

interface IProps {
  form: any;
  dispatch: Dispatch;
  taskNotEditable: boolean;
}

class BranchHeader extends Component<IProps> {
  registeForm = () => {
    const { dispatch, form, branchItem } = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: `FormDecisionData_Branch_${branchItem.id}_hender`,
      },
    });
  };

  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, branchItem } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: `FormDecisionData_Branch_${branchItem.id}_hender`,
      },
    });
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  handleBtn = async (key: any) => {
    const { dispatch, branchItem } = this.props;
    switch (key) {
      case ButtonType.NEW:
        dispatch({
          type: 'ruleEngineController/addDecisionCondition',
          payload: {
            id: branchItem.id,
          },
        });
        break;
      case ButtonType.SEARCH:
        await dispatch({
          type: 'ruleEngineController/getSearchQuery',
          payload: {
            activeCode: AddType.RuleSetConditions,
            params: {
              currentBranchVOId: branchItem.id,
            },
          },
        });
        break;
      case ButtonType.ADD:
        dispatch({
          type: 'ruleEngineController/addDecisionConditionToLibrary',
          payload: {
            id: branchItem.id,
          },
        });

        break;

      default:
        break;
    }
  };

  render() {
    const { form, taskNotEditable }: any = this.props;
    return (
      <div className={styles.headerWrap}>
        <div className={styles.headerLeft}>
          <FormLayout
            layConf={{
              branchName: 8,
              branchDescription: 16,
            }}
            isMargin={false}
            isPadding={false}
          >
            <FormItemInput
              form={form}
              name="branchName"
              formName="branchName"
              labelId="Branch Name"
              disabled={taskNotEditable}
              required
            />
            <FormItemInput
              form={form}
              name="branchDescription"
              formName="branchDescription"
              labelId="Branch Description"
              disabled={taskNotEditable}
            />
          </FormLayout>
        </div>
        <div className={styles.headerRight}>
          {lodash.map(ButtonList, (item: any) => {
            return (
              <Button
                key={item.key}
                shape="round"
                icon="plus"
                disabled={taskNotEditable}
                onClick={() => {
                  this.handleBtn(item.key);
                }}
              >
                {formatMessageApi({
                  Label_BIZ_Claim: item.labelId,
                })}
              </Button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(({ formCommonController }: any) => {
  return {
    validating: formCommonController.validating,
  };
})(
  Form.create({
    onFieldsChange(props: IProps, changedFields: any) {
      const { dispatch, branchItem }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: 'ruleEngineController/updateDecisionBranchEditData',
          payload: {
            changedFields,
            id: branchItem.id,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { branchItem } = props;

      return formUtils.mapObjectToFields(branchItem);
    },
  })(BranchHeader)
);
