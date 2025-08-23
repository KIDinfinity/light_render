import React from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { Button, Card, Form, Select } from 'antd';
import ErrorTooltip from '@/components/ErrorTooltip';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CaseCategory from 'enum/CaseCategory';
import { CREATEINTERFACE } from '@/utils/claimConstant';
import { eOperationType } from '@/enum/eOperationType';
import styles from './SmartCircleRuleSetup.less';

// @ts-ignore
@connect(({ user, loading }) => ({
  userId: lodash.get(user, 'currentUser.userId'),
  submitting: loading.effects['workspaceCases/smartCreate'],
}))
@Form.create()
class CaseRuleSetupForm extends React.Component {
  state = {
    currentCaseCategory: '',
    caseCategoryOptions: [],
    CaseCategoryCompanyMap: [],
    currentEntity: null,
  };

  componentDidMount() {
    this.findCaseCategoryDictionaries();
  }

  findCaseCategoryDictionaries = async () => {
    const { dispatch } = this.props;
    const [caseCategoryOptions, CaseCategoryCompanyMap] = await Promise.all([
      dispatch({
        type: 'workspaceCases/findCaseCategoryDictionaries',
      }),
      dispatch({
        type: 'workspaceCases/getCaseCategoryCompanyMap',
      }),
    ]);

    this.setState({
      caseCategoryOptions,
      CaseCategoryCompanyMap,
    });
  };

  onChangeCompany = () => {
    const { currentCaseCategory, caseCategoryOptions, currentEntity, CaseCategoryCompanyMap } =
      this.state;
    const companyCodes =
      CaseCategoryCompanyMap.filter(
        (companyMap) => companyMap.caseCategory === currentCaseCategory
      ).map((companyMap) => companyMap.companyCode) || [];
    if (!companyCodes.includes(currentEntity)) {
      if (companyCodes.length === 1) this.setState({ currentEntity: companyCodes[0] });
      else this.setState({ currentEntity: null });
    }
  };

  handleClick = async (ev) => {
    if (ev) ev.preventDefault();

    const { dispatch, userId } = this.props;
    const { currentCaseCategory, currentEntity } = this.state;
    const createParams: any = {
      ...CREATEINTERFACE,
      operationType: eOperationType.manualCreate,
      createLocation: '01',
      caseCategory: currentCaseCategory,
      activityVariables: {
        applicant: userId,
      },
      companyCode: currentEntity,
      submissionDate: moment().format(),
    };

    if (currentCaseCategory === CaseCategory.BP_DC_CTG002) {
      createParams.submissionDate = '';
    }
    if (currentCaseCategory === CaseCategory.BP_NB_CTG004) {
      const extraParams = await dispatch({
        type: `workspaceCases/parpareDataForNB`,
      });

      createParams.businessNo = extraParams.businessNo;
      createParams.policyNo = extraParams.policyNo;
      createParams.inquiryBusinessNo = extraParams.inquiryBusinessNo;
    }

    dispatch({
      type: 'workspaceCases/smartCreate',
      payload: {
        createParams: {
          ...createParams,
        },
      },
    });
    dispatch({
      type: 'workspaceAI/saveMachineKey',
      payload: { machineKey: '' },
    });
  };

  onCancel = () => {
    const { dispatch } = this.props;
    // 取消创建case
    dispatch({ type: 'workspaceCases/smartCancel' });
    // 清除create case
    dispatch({
      type: 'workspaceAI/changeState',
      payload: { showDialog: false, dialog1: false, dialog2: false },
    });
    dispatch({
      type: 'workspaceAI/saveSearchValue',
      payload: { searchValue: '' },
    });
    dispatch({
      type: 'workspaceAI/saveMachineKey',
      payload: { machineKey: '' },
    });
  };

  render() {
    const { form } = this.props;
    const { currentCaseCategory, caseCategoryOptions, CaseCategoryCompanyMap, currentEntity } =
      this.state;

    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;
    const companyCodes =
      CaseCategoryCompanyMap.filter(
        (companyMap) => companyMap.caseCategory === currentCaseCategory
      )?.map((companyMap) => companyMap.companyCode) || [];
    const showEntitySelection = companyCodes?.length > 1;

    return (
      <Card className={styles.SmartCircleRuleSetup} bordered={false} style={{ marginTop: '20px' }}>
        <div className={styles.title}>Create a Case</div>
        <Form onSubmit={this.handleClick}>
          <Form.Item
            label={<ErrorTooltip form={form} formName="caseCategory" title="Case Category" />}
          >
            {getFieldDecorator('caseCategory', {
              rules: [{ required: true }],
            })(
              <Select
                style={{ width: '100%' }}
                placeholder="Select Category"
                onSelect={(value) =>
                  this.setState({ currentCaseCategory: value }, this.onChangeCompany)
                }
                disabled={submitting}
              >
                {lodash.map(caseCategoryOptions, (item: any) => (
                  <Select.Option title={item?.dictName} key={item?.dictCode} value={item?.dictCode}>
                    {item?.dictName}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          {!!showEntitySelection && (
            <Form.Item
              label={<ErrorTooltip form={form} formName="entity" title="Entity" />}
              required
            >
              <Select
                style={{ width: '100%' }}
                placeholder="Select Entity"
                onSelect={(value) => this.setState({ currentEntity: value })}
                disabled={submitting}
                value={currentEntity}
              >
                {lodash.map(companyCodes, (code) => (
                  <Select.Option key={code} value={code}>
                    {formatMessageApi({
                      Label_BPM_Entity: code,
                    })}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <div className={styles.buttonGroup}>
            <Button
              disabled={
                lodash.isEmpty(currentCaseCategory) || (showEntitySelection && !currentEntity)
              }
              type="primary"
              htmlType="submit"
              loading={submitting}
            >
              {formatMessageApi({
                Label_BIZ_Claim: 'form.submit',
              })}
            </Button>
            &emsp;
            <Button onClick={this.onCancel}>
              {formatMessageApi({
                Label_BPM_Button: 'app.navigator.taskDetail.inquireForm.button.cancel',
              })}
            </Button>
          </div>
        </Form>
      </Card>
    );
  }
}

export default CaseRuleSetupForm;
