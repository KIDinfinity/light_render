import moment from 'moment';
import lodash, { toUpper } from 'lodash';
import { filterConfig } from '@/utils/configUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { sorts } from '../TitleMap';

export default (orders: any, config: any, handleHeaderCell: any, saveSort: any) => {
  // const { handleScale } = resizeWindowHook();

  const width = 130;

  const params = [
    {
      fieldName: 'User ID',
      id: 'UserID',
      typeCode: 'Label_COM_General',
      dataIndex: 'user_id',
      width: width * 0.9,
      render: (text, item) => lodash.get(item, 'userId') || '-',
    },
    {
      fieldName: 'User Name',
      id: 'UserName',
      typeCode: 'Label_COM_General',
      dataIndex: 'user_name',
      width: width * 0.9,
      render: (text, item) => lodash.get(item, 'userName') || '-',
    },
    // {
    //   //删减
    //   fieldName:'Last Name',
    //   id: 'app.navigator.task-detail-of-data-capture.label.surname',
    //   dataIndex: 'lastName',
    // },
    {
      fieldName: 'Gender',
      id: 'app.usermanagement.basicInfo.label.gender',
      dataIndex: 'gender',
      width: width * 0.9,
      render: (text) => text || '-',
    },
    {
      fieldName: 'DOB',
      id: 'app.navigator.task-detail-of-data-capture.label.date-of-birth',
      dataIndex: 'birthday',
      width: width * 0.9,
      render(text, item) {
        const birthday = item?.birthday;
        return birthday ? moment(birthday).format('L') : '-';
      },
    },
    {
      fieldName: 'Status',
      id: 'app.usermanagement.basicInfo.avatar.status',
      dataIndex: 'status',
      width: width * 0.9,
      render(text, item) {
        const status = item?.status;
        return formatMessageApi({ Dropdown_USR_UserStatus: status });
      },
    },
    {
      fieldName: 'Employment Date',
      id: 'app.usermanagement.basicInfo.label.skill.employmentDate',
      dataIndex: 'employment_date',
      key: 'employmentDate',
      sorter: true,
      defaultSortOrder: orders?.employment_date?.sortOrder,
      width: width * 0.9,
      render(text, item) {
        const employmentDate = item?.employmentDate;
        return employmentDate ? moment(employmentDate).format('L') : '-';
      },
    },
    {
      // 暂无
      fieldName: 'Title',
      id: 'form.title.label',
      dataIndex: 'title',
      width: 110,
      render: (text) => text || '-',
    },

    {
      fieldName: 'Organization',
      id: 'OrganizationName',
      dataIndex: 'organizationName',
      typeCode: 'Label_COM_General',
      width: width * 0.9,
      render: (text) => text || '-',
    },
    {
      fieldName: 'Report To',
      id: 'app.usermanagement.basicInfo.label.organization.reportTo',
      dataIndex: 'directSupervisor',
      width,
      render: (text) => text || '-',
    },
    {
      fieldName: 'Role Name',
      id: 'RoleName',
      dataIndex: 'groupNames',
      typeCode: 'Label_COM_General',
      width,
      render: (text) => text || '-',
    },
    {
      fieldName: 'Phone No',
      id: 'venus.navigator.label.phone-no',
      dataIndex: 'phoneNo',
      width,
      render: (text) => text || '-',
    },
  ];

  const columns = filterConfig(config, params);

  return lodash.map(columns, (el: any) => {
    const tempParams = params.find((ele) => toUpper(ele.fieldName) === toUpper(el.fieldName));
    const typeCode = tempParams?.typeCode || 'Label_BIZ_Claim';
    let sortOrder = tempParams?.defaultSortOrder || orders?.[tempParams.dataIndex]?.sortOrder;
    if (tempParams?.dataIndex === saveSort.sortName) {
      sortOrder = sorts[saveSort.sortOrder];
    }
    return {
      title: formatMessageApi({
        [typeCode]: tempParams.id,
      }),
      dataIndex: tempParams.dataIndex,
      key: tempParams.key || tempParams.dataIndex,
      sorter: el.sortable,
      sortOrder,
      render: tempParams.render,
      width: tempParams.width,
      onHeaderCell: (column) => ({
        onClick: (e) => handleHeaderCell(column, e), // 点击表头行
      }),
    };
  });
};
