import { ePageName, eOperation, eTaskDefToPageName, eEventName, eEventOperation, ePageService, eTraceStatus } from './enum';
import { tarckClaimLoad, tarckInquiryLoad, tarckCaseManageLoad, tarckClaimStatus, tarckUnload, tarckInquiryPoint } from './utils';

export { ePageName, eOperation, eTaskDefToPageName, eEventName, eEventOperation, ePageService, eTraceStatus };
export {    tarckClaimLoad, tarckInquiryLoad, tarckCaseManageLoad, tarckClaimStatus, tarckUnload, tarckInquiryPoint };


export default {
  tarckEnum: {
    ePageName, eOperation, eTaskDefToPageName, eEventName, eEventOperation, ePageService, eTraceStatus
  },
  tarckPoint: {
    tarckClaimLoad, tarckInquiryLoad, tarckCaseManageLoad, tarckClaimStatus, tarckUnload, tarckInquiryPoint
  }
}

