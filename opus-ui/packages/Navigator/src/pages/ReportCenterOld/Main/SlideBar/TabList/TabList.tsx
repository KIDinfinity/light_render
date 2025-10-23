import React from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Form, Input, Select, InputNumber } from 'antd';
import { tenant } from '@/components/Tenant';
import { EFieldType, ReportId, FieldCode } from 'navigator/pages/ReportCenterOld/enum';
import RangePicker from 'basic/components/Form/FormItem/Items/RangePicker';
import { FormItemSelectPlus } from 'basic/components/Form';
import FormItem from '../FormItem/FormItem';
import styles from './tabList.less';

interface ITabListField {
  fieldName: string;
  fieldType: number;
  hidden?: boolean;
  sequence?: number;
}

const { Option }: any = Select;

@connect(({ configController, reportCenterOldController }) => ({
  configuration: configController.configuration,
  reportList: reportCenterOldController.reportList,
  activeTabKey: reportCenterOldController.activeTabKey,
  reportData: reportCenterOldController.reportData,
  caseCategory: reportCenterOldController.caseCategory,
  APDAClaimType: reportCenterOldController.APDAClaimType,
}))
@Form.create()
class TabList extends React.Component {
  componentDidMount = () => {
    const { dispatch, form } = this.props;
    dispatch({
      type: 'reportCenterOldController/findDictionaryByTypeCodes',
    });
    dispatch({
      type: 'reportCenterOldController/saveForm',
      payload: {
        form,
      },
    });
  };

  switchTabFn = async (reportId: string, reportDisplayName: string) => {
    const { dispatch, activeTabKey } = this.props;
    await dispatch({
      type: 'reportCenterOldController/saveSwitchTabLoading',
      payload: {
        switchTabLoading: true,
      },
    });
    if (activeTabKey !== reportId) {
      await dispatch({
        type: 'reportCenterOldController/saveActiveTabInfo',
        payload: {
          activeTabKey: reportId,
          reportDisplayName,
        },
      });
    }
    await dispatch({
      type: 'reportCenterOldController/saveSwitchTabLoading',
      payload: {
        switchTabLoading: false,
      },
    });
  };

  getCurrentConfig = (reportId: string) => {
    const { configuration } = this.props;

    const config = configuration && configuration?.[lodash.toLower(reportId)];
    return (
      config && {
        ...config,
        inquiryField: config?.inquiryField || [],
      }
    );
  };

  fieldRenderFn = (reportId: string, field: ITabListField) => {
    const { form, caseCategory, APDAClaimType } = this.props;
    const { getFieldDecorator } = form;
    const { fieldCode, fieldName, fieldType } = field || {};
    const component: any = {
      text: () => <Input />,
      date: () => <RangePicker />,
      // 临时方案
      dropDownList: () => {
        const dictList =
          reportId === ReportId.MonthlyClaimDetailReportOnline && fieldCode === FieldCode.claimType
            ? APDAClaimType
            : caseCategory;

        return (
          <Select mode="multiple" allowClear>
            {lodash.map(dictList, (item: any, idx: number) => (
              <Option key={idx} value={item.dictCode}>
                {item.dictName}
              </Option>
            ))}
          </Select>
        );
      },
      number: () => <InputNumber />,
    };

    const SelectPlus =
      reportId === ReportId.MonthlyClaimDetailReportOnline && fieldCode === FieldCode.providerCode;

    return SelectPlus ? (
      <FormItem label={fieldName}>
        <FormItemSelectPlus
          form={form}
          formName={`${reportId}_${fieldCode}`}
          searchName="medicalProvider"
          dropdownCode="claim_dict005"
          otherParams={{
            status: 'A',
            regionCode: tenant.region(),
          }}
          optionShowType="both"
        />
      </FormItem>
    ) : component[EFieldType[fieldType]] ? (
      <FormItem label={fieldName}>
        {getFieldDecorator(`${reportId}_${fieldCode}`)(component[EFieldType[fieldType]]())}
      </FormItem>
    ) : null;
  };

  render() {
    const { reportList, activeTabKey } = this.props;

    return (
      <div className={styles.tabList}>
        {lodash.map(reportList, (tab: any, idx: number) => (
          <div className={`listItem${tab?.reportId === activeTabKey ? ' active' : ''}`} key={idx}>
            <div
              className="itemTitle"
              onClick={() => this.switchTabFn(tab?.reportId, tab?.reportDisplayName)}
            >
              <div className="text">{tab?.reportDisplayName}</div>
            </div>
            {this.getCurrentConfig(tab?.reportId) ? (
              <div className="filter">
                <Form>
                  {lodash.map(
                    this.getCurrentConfig(tab?.reportId)?.inquiryField || [],
                    (field: any) => this.fieldRenderFn(tab?.reportId, field)
                  )}
                </Form>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
}

export default TabList;
