import React from 'react';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Input, Select, TreeSelect } from 'antd';
import { filterConfig } from '@/utils/configUtil';
import lodash, { toUpper } from 'lodash';
import { Search } from '@/components/TableSearch/FilterInquire';
import RangePicker from 'basic/components/Form/FormItem/Items/RangePicker';
import { AdvancedInquiryMap } from 'navigator/pages/AdvancedQuery/Enum';
const { user: User } = AdvancedInquiryMap;

@connect(({ advancedQueryController, workspaceUser, advancedQueryAllForm }: any) => ({
  stateOfSearch: advancedQueryController.stateOfSearch,
  searchObj: advancedQueryController.searchObj,
  userOrganization: workspaceUser.userOrganization,
  allOrganization: workspaceUser.allOrganization,
  searchForm: advancedQueryAllForm.searchForm,
}))
class AdvancedQueryOfUserInquiry extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      reportTo: [],
      userTitle: [],
    };
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;

    await dispatch({
      type: 'workspaceUser/getUserOrganization',
      payload: {},
    });

    await dispatch({
      type: 'workspaceUser/getAllOrganization',
      payload: {},
    });

    const response = await dispatch({
      type: 'userGeneralInfoController/findAllUser',
      payload: {},
    });

    const reportTo = [];
    lodash.forEach(response?.resultData, (value) => {
      reportTo.push({
        userId: value.userId,
        userName: value.userName,
      });
    });
    this.setState({
      reportTo,
    });

    const response1 = await dispatch({
      type: 'userGeneralInfoController/findAllTitle',
      payload: {},
    });

    const userTitle = [];
    lodash.forEach(response1?.resultData, (value) => {
      userTitle.push({
        title: value.title,
      });
    });
    this.setState({
      userTitle,
    });
  };

  render() {
    const { form, stateOfSearch, searchObj, config, allOrganization, searchForm } = this.props;
    const { reportTo, userTitle } = this.state;
    const searchProps = {
      ...this.props,
      searchDefault: {
        ...searchObj,
        userId: searchObj?.userId,
      },
    };

    const { params } = searchForm['3'] || stateOfSearch;

    const configParams = [
      {
        fieldName: 'User ID',
        id: 'UserID',
        typeCode: 'Label_COM_General',
        form: () =>
          form.getFieldDecorator(User['User ID'], {
            initialValue: params.userId,
          })(<Input placeholder="" autoComplete="disable-chrome-autofill-mark" />),
      },
      {
        fieldName: 'User Name',
        id: 'UserName',
        typeCode: 'Label_COM_General',
        form: () =>
          form.getFieldDecorator(User['User Name'], {
            initialValue: params.userName,
          })(<Input placeholder="" autoComplete="disable-chrome-autofill-mark" />),
      },
      {
        fieldName: 'Status',
        id: 'app.usermanagement.basicInfo.avatar.status',
        form: () =>
          form.getFieldDecorator(User.Status, {
            initialValue: params.status,
          })(
            <Select
              allowClear
              filterOption={(input, option) =>
                option.props.children.toLowerUser().indexOf(input.toLowerUser()) >= 0
              }
            >
              <Select.Option key="0" value="0">
                Active
              </Select.Option>
              <Select.Option key="1" value="1">
                Terminated
              </Select.Option>
            </Select>
          ),
      },
      {
        fieldName: 'Organization',
        id: 'venus.navigator.label.organization',
        form: () =>
          form.getFieldDecorator(User.Organization, {
            initialValue: params.organizationCode,
          })(
            <TreeSelect
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={allOrganization}
              treeDefaultExpandAll
            />
          ),
      },
      {
        fieldName: 'Employment Date',
        id: 'app.usermanagement.basicInfo.label.skill.employmentDate',
        form: () =>
          form.getFieldDecorator(User['Employment Date'], {
            initialValue: params.employmentDate,
          })(<RangePicker />),
      },
      {
        fieldName: 'Title',
        id: 'form.title.label',
        form: () =>
          form.getFieldDecorator(User.Title, {
            initialValue: params.title,
          })(
            <Select allowClear onChange={this.fnSelectUserCategory}>
              {lodash.map(userTitle, ({ title }) => (
                <Select.Option key={title} value={title}>
                  {title}
                </Select.Option>
              ))}
            </Select>
          ),
      },
      {
        fieldName: 'Report To',
        id: 'app.usermanagement.basicInfo.label.organization.reportTo',
        form: () =>
          form.getFieldDecorator(User['Report To'], {
            initialValue: params.directSupervisor,
          })(
            <Select allowClear onChange={this.fnSelectUserCategory}>
              {lodash.map(reportTo, ({ userId, userName }: any) => (
                <Select.Option key={userId} value={userId}>
                  {userName}
                </Select.Option>
              ))}
            </Select>
          ),
      },
    ];

    const configList = filterConfig(config, configParams);

    return (
      <Search {...searchProps}>
        {lodash.map(configList, (el: any) => {
          const tempParams = configParams.find(
            (ele) => toUpper(ele.fieldName) === toUpper(el.fieldName)
          );
          const typeCode = tempParams?.typeCode || 'Label_BIZ_Claim';
          return (
            <Search.Item
              key={el.fieldName}
              label={formatMessageApi({
                [typeCode]: tempParams.id,
              })}
              simple={!el.hidden}
            >
              {tempParams.form}
            </Search.Item>
          );
        })}
      </Search>
    );
  }
}

export default AdvancedQueryOfUserInquiry;
