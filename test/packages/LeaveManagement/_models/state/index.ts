import { Mode } from '../../Enum';

export default {
  startTime: '',
  endTime: '',
  beginDate: '',
  endDate: '',
  currentUsers: [],
  selectedUser: [],
  draftTaskId: '',
  modalTaskId: '',
  mode: Mode.Abbreviated,
  showModal: false,
  businessData: {},
  requestInfo: {
    approved: [],
    waiting_for_approval: [],
    rejected: [],
    cancelled: [],
  },
  userLeaveInfo: [
    {
      date: '',
      approved: [],
      waiting_for_approval: [],
    },
  ],
  subordinateList: [],
  calendarDate: '',
  userLeaveRequestTabName: 'personalActive',
};
