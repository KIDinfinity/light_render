import React, { Component } from 'react';
import { Card, Form, Icon, Modal, Table, Button } from 'antd';
import type { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import moment from 'moment';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormLayout from 'basic/components/Form/FormLayout';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import {
  FormItemDatePicker,
  FormItemSelect,
  FormItemInput,
  formUtils,
} from 'basic/components/Form';
import type { IDictionary } from '@/dtos/dicts';
import type { IInsured } from '@/dtos/claim';
import { VLD_000116 } from 'claim/pages/validators/fieldValidators';
import layout from './Layout';
import styles from './InsuredInfo.less';

const FORMID = 'insured';

interface IProps {
  dispatch?: Dispatch<any>;
  insured?: IInsured;
  form?: any;
  dictsOfGender?: IDictionary[];
}

interface IFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  insured?: IInsured;
}

const tableColumns = [
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.phone-no',
    }),
    dataIndex: 'firstName',
    render: (text: string, item: any) => lodash.get(item, 'phoneNo') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.post-code',
    }),
    dataIndex: 'dateOfBirth',

    render: (text: string, item: any) => lodash.get(item, 'postCode') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.address',
    }),
    dataIndex: 'gender',
    render: (text: string, item: any) => lodash.get(item, 'address') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'venus_claim.label.policyNo',
    }),

    dataIndex: 'policyNo',
    render: (text: string, item: any) => lodash.get(item, 'policyNo') || '-',
  },
];

@connect(
  ({ dictionaryController, JPCLMOfClaimRegistrationController, formCommonController }: any) => ({
    dictsOfGender: dictionaryController.Gender,
    insured: lodash.get(JPCLMOfClaimRegistrationController, 'claimProcessData.insured'),
    identityParams: JPCLMOfClaimRegistrationController.identityParams,
    hasGetInsured: JPCLMOfClaimRegistrationController.hasGetInsured,
    insuredList: JPCLMOfClaimRegistrationController.insuredList,
    validating: formCommonController.validating,
  })
)
// @ts-ignore
@Form.create<IFormProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimRegistrationController/saveEntry',
            target: 'saveInsured',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimRegistrationController/saveFormData',
          target: 'saveInsured',
          payload: {
            changedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { insured } = props;
    return formUtils.mapObjectToFields(insured, {
      firstName: (value: string | object) => value,
      dateOfBirthString: (value: string | object) => (value ? moment(value) : null),
      gender: (value: string | object) => value,
      phoneNo: (value: string | object) => value,
      postCode: (value: string | object) => value,
      address: (value: string | object) => value,
    });
  },
})
class InsuredInfo extends Component<IProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasGetInsured: false,
      visible: false,
      selectColumns: {},
    };
  }

  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form } = this.props;

    (dispatch as Dispatch)({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;

    (dispatch as Dispatch)({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  getIdentity = (field: string) => async (value: any) => {
    const { insured, form, identityParams } = this.props;
    const { firstName, dateOfBirthString, gender } = lodash.pick(insured, [
      'firstName',
      'dateOfBirthString',
      'gender',
    ]);
    const { dispatch }: any = this.props;
    const fn = {
      firstName: () => ({
        [field]: form.getFieldValue(field),
      }),
      dateOfBirthString: () => ({
        dateOfBirth: moment(value).format('YYYY-MM-DD'),
      }),
      gender: () => ({
        [field]: value,
      }),
    };
    const temp = (lodash.isFunction(fn?.[field]) && fn?.[field]()) || {};
    const currentValue = lodash.values(temp)?.[0];
    const lastValue =
      field === 'firstName'
        ? identityParams?.firstName
        : field === 'dateOfBirthString'
        ? moment(formUtils.queryValue(dateOfBirthString)).format('YYYY-MM-DD')
        : formUtils.queryValue(gender);
    if (lastValue === currentValue) return;

    const payload = {
      firstName: formUtils.queryValue(firstName),
      dateOfBirth: moment(formUtils.queryValue(dateOfBirthString)).format('YYYY-MM-DD'),
      gender: formUtils.queryValue(gender),
      ...temp,
    };
    dispatch({ type: 'JPCLMOfClaimRegistrationController/clearInsuredCorrelation' });
    if (lodash.every(payload, (item) => item)) {
      const selectColumns = await dispatch({
        type: 'JPCLMOfClaimRegistrationController/getIdentity',
        payload,
      });
      this.setState({
        hasGetInsured: true,
        selectColumns,
      });
    }
  };

  handleInsureNameChoice = (record: any) => {
    const { dispatch } = this.props;
    this.setState({
      selectColumns: record,
    });
    dispatch({ type: 'JPCLMOfClaimRegistrationController/clearPolicyItem' });
    const target = lodash.pick(record, ['address', 'postCode', 'phoneNo', 'insuredId', 'partyId']);
    dispatch({
      type: 'JPCLMOfClaimRegistrationController/saveInsured',
      payload: { changedFields: target },
    });
    dispatch({
      type: 'JPCLMOfClaimRegistrationController/queryListPolicy',
      payload: {
        insuredId: target?.insuredId,
      },
    });
  };

  render() {
    const { form, dictsOfGender, insuredList, dataEditable, insured } = this.props;
    const dataNotEditable = !dataEditable;
    const { hasGetInsured, selectColumns } = this.state;
    return (
      <div className={styles.insured}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.insured-information',
          })}
        >
          {VLD_000116(hasGetInsured, insuredList) && !insured?.insuredId && (
            <ErrorTooltipManual
              manualErrorMessage={VLD_000116(
                hasGetInsured,
                insuredList,
                form.getFieldValue('firstName')
              )}
            />
          )}
          <Form layout="vertical">
            <FormLayout json={layout}>
              <FormItemInput
                form={form}
                disabled={dataNotEditable}
                required={!dataNotEditable}
                onPressEnter={this.getIdentity('firstName')}
                formName="firstName"
                maxLength={30}
                suffix={
                  <Icon
                    type="search"
                    onClick={() => {
                      this.setState({ visible: true });
                    }}
                  />
                }
                onBlur={this.getIdentity('firstName')}
                labelId="app.navigator.task-detail-of-data-capture.label.first-name"
              />
              <FormItemDatePicker
                form={form}
                disabled={dataNotEditable}
                required={!dataNotEditable}
                onChange={this.getIdentity('dateOfBirthString')}
                formName="dateOfBirthString"
                labelId="app.navigator.task-detail-of-data-capture.label.date-of-birth"
              />
              <FormItemSelect
                disabled={dataNotEditable}
                required={!dataNotEditable}
                form={form}
                formName="gender"
                onChange={this.getIdentity('gender')}
                labelId="app.usermanagement.basicInfo.label.gender"
                dicts={dictsOfGender}
              />
              <FormItemInput
                form={form}
                disabled
                formName="phoneNo"
                maxLength={20}
                labelId="app.usermanagement.basicInfo.label.phone-no"
              />
              <FormItemInput
                form={form}
                disabled
                formName="postCode"
                maxLength={20}
                labelId="app.navigator.task-detail-of-data-capture.label.post-code"
              />
              <FormItemInput
                form={form}
                disabled
                formName="address"
                maxLength={240}
                labelId="app.navigator.task-detail-of-data-capture.label.address"
                name="address"
              />
            </FormLayout>
          </Form>
        </Card>
        <Modal
          visible={this.state.visible}
          footer={[
            <div className={styles.modalFooter}>
              <Button
                type="primary"
                onClick={() => {
                  this.setState({ visible: false });
                }}
              >
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.drawer.auditLog.trigger.Submit',
                })}
              </Button>
            </div>,
          ]}
          onCancel={() => {
            this.setState({ visible: false });
          }}
          width="50%"
          bodyStyle={{
            zIndex: 1000,
            height: 500,
            overflowY: 'scroll',
          }}
        >
          <Table
            rowSelection={{
              type: 'radio',
              selectedRowKeys: [selectColumns?.partyId],
              onSelect: this.handleInsureNameChoice,
            }}
            rowKey="clientId"
            pagination={false}
            columns={tableColumns}
            dataSource={insuredList}
          />
        </Modal>
      </div>
    );
  }
}

export default InsuredInfo;
