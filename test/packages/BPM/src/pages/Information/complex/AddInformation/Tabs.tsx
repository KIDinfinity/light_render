import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'dva';
import { Form, Select, Checkbox, Tooltip } from 'antd';
import lodash from 'lodash';
import ErrorTooltip from '@/components/ErrorTooltip';
import classNames from 'classnames';
import HeightAutoSelect from '@/components/HeightAutoSelect';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { IsPOS, IsVanilla } from '../../_utils';

const Tabs = Form.create({
  mapPropsToFields(props) {
    const { item }: any = props;
    return formUtils.mapObjectToFields(item);
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, item }: any = props;
    dispatch({
      type: 'navigatorInformationController/addInformationChange',
      payload: {
        changedFields,
        id: item.id,
      },
    });
  },
})((props) => {
  const { form, policyList, classification, item } = props;
  const { caseCategory } = useSelector((state) => ({
    caseCategory: state?.navigatorInformationController?.caseCategory,
  }));
  const dispatch = useDispatch();
  const { getFieldDecorator } = form;
  const { informationTab } = item;
  const informationTabValue = informationTab.value || informationTab;
  const FORMID = 'addInformation';
  const tabs = ['case', 'insured', 'policy'];
  const objTabs = {
    case: lodash.get(classification, 'caseNo'),
    insured: lodash.get(classification, 'insuredId'),
    policy: lodash.get(classification, 'policyIdList'),
  };

  const setDisabled = (tab: any) => {
    if (!lodash.isEmpty(lodash.get(objTabs, tab))) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    dispatch({
      type: 'navigatorInformationController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
    return () => {
      dispatch({
        type: 'navigatorInformationController/unRegisterForm',
        payload: {
          form,
          formId: FORMID,
        },
      });
    };
  }, []);
  const onChange = (e) => {
    dispatch({
      type: 'navigatorInformationController/setSelectedTabs',
      payload: {
        selectedTabs: e,
      },
    });
  };
  return (
    <>
      <div style={{ marginBottom: '12px' }}>
        <span style={{ marginRight: '12px' }}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.remark.linkto',
          })}
        </span>
        <Form.Item>
          {getFieldDecorator(
            'informationTab',
            {}
          )(
            <Checkbox.Group className={styles.tabBar} onChange={onChange}>
              {lodash.map(tabs, (tab, index) => {
                const tabLabel = formatMessageApi({
                  Label_BIZ_Claim: `app.navigator.drawer.remark.tab.${tab}`,
                });
                return (
                  <Checkbox
                    value={tab}
                    disabled={setDisabled(tab)}
                    className={classNames({
                      channelBtn: true,
                    })}
                    key={`${tab}_${index}`}
                  >
                    <Tooltip title={tabLabel}>{tabLabel}</Tooltip>
                  </Checkbox>
                );
              })}
            </Checkbox.Group>
          )}
        </Form.Item>
      </div>
      {!IsPOS(caseCategory) &&
        !IsVanilla(caseCategory) &&
        policyList?.length &&
        lodash.includes(informationTabValue, 'policy') && (
          <div style={{ marginBottom: '12px' }}>
            <Form.Item
              label={
                <ErrorTooltip
                  form={form}
                  formName="policyIdList"
                  title={formatMessageApi({
                    Label_BIZ_Claim: 'venus.claim.label.policy',
                  })}
                />
              }
              style={{ marginTop: '4px' }}
              className={styles.label}
            >
              {getFieldDecorator('policyIdList', {
                rules: [
                  {
                    required: true,
                    message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
                  },
                ],
              })(
                <HeightAutoSelect mode="multiple" allowClear>
                  {Array.isArray(policyList) &&
                    lodash.map(policyList, (policy: any) => (
                      <Select.Option key={policy} name={policy}>
                        {policy}
                      </Select.Option>
                    ))}
                </HeightAutoSelect>
              )}
            </Form.Item>
          </div>
        )}
    </>
  );
});

export default connect(({ navigatorInformationController }: any) => ({
  policyList: lodash.get(navigatorInformationController, 'classification.policyIdList', []),
  selectedTabs: lodash.get(navigatorInformationController, 'selectedTabs', []),
  classification: lodash.get(navigatorInformationController, 'classification', []),
}))(Tabs);
