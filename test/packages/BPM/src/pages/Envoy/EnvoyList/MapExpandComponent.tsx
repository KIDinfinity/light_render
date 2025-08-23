import DateProcess from 'bpm/pages/Envoy/modules/DateProcess/DateProcess';
import EnvoyTo from 'bpm/pages/Envoy/modules/EnvoyTo/EnvoyTo';
import DispatchDate from 'bpm/pages/Envoy/modules/DispatchDate/DispatchDate';
import Subcase from 'bpm/pages/Envoy/modules/Subcase/Subcase';
import ChannelExpand from 'bpm/pages/Envoy/modules/Channel/ChannelExpand';
import ChannelInfo from 'bpm/pages/Envoy/modules/ChannelInfo/ChannelInfo';
import ChannelTpl from 'bpm/pages/Envoy/modules/ChannelTpl/ChannelTpl';
import Documents from 'bpm/pages/Envoy/modules/Documents/Documents';
import AttachDocument from 'bpm/pages/Envoy/modules/AttachDocument/AttachDocument';
import Policy from 'bpm/pages/Envoy/modules/Policy/Policy';
import PolicyNo from 'bpm/pages/Envoy/modules/PolicyNo/PolicyNo';
import Attachment from 'bpm/pages/Envoy/modules/Attachment/Attachment';
import Payment from 'bpm/pages/Envoy/modules/Payment/Payment';
import Remark from 'bpm/pages/Envoy/modules/Remark/Remark';
import DelayLetter from 'bpm/pages/Envoy/modules/DelayLetter/DelayLetter';
import Define from 'bpm/pages/Envoy/modules/Define/Define';
import Letter from 'bpm/pages/Envoy/modules/Letter/Letter';
import ExpandPendingMemo from 'bpm/pages/Envoy/modules/PendingMemo/ExpandPendingMemo';
import FreeFields from 'bpm/pages/Envoy/modules/FreeFields/FreeFields';

const MapComponent = {
  dateProcess: DateProcess,
  envoyTo: EnvoyTo,
  dispatchDate: DispatchDate,
  channelContent: ChannelExpand,
  channelInfo: ChannelInfo,
  channelTpl: ChannelTpl,
  documents: Documents,
  attachDocument: AttachDocument,
  subcase: Subcase,
  policyNo: PolicyNo,
  policy: Policy,
  attachment: Attachment,
  payment: Payment,
  remark: Remark,
  delayLetter: DelayLetter,
  define: Define,
  letterType: Letter,
  pendingMemo: ExpandPendingMemo,
  freeField: FreeFields,
};

export default MapComponent;
