import moment from 'moment';

export default {
  leaveTableData: {},
  leaveTableParams: {
    leaveRange: [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
    currentPage: 1,
    pageSize: 10,
  },
  organizationMemberList: [],
  addLeaveForm: {
    teamMember: '',
    leaveType: '',
    Length: '',
    leaveStartDate: null,
    leaveEndDate: null,
    dailyQuantity: '0',
  },
  editLeaveForm: {
    teamMember: '',
    leaveType: '',
    Length: '',
    leaveStartDate: null,
    leaveEndDate: null,
    dailyQuantity: '0',
  },
};
