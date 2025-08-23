import { ButtonCode } from 'bpm/enum';
import { Action } from '@/components/AuditLog/Enum';
// Submit = 'submit',
//   Save = 'save',
//   UnPend = 'unPend',
//   Pend = 'pend',
//   Split = 'split',
//   Favorite = 'favorite',
//   Withdrawal = 'withdrawal',
//   Reject = 'reject',
//   Image = 'image',
//   Back = 'back',
//   ReturnAppDoc = 'returnAppDoc',
//   GenAppForm = 'genAppForm',
//   Resume = 'resume',
//   TblSearch = 'tblSearch',
//   Urgent = 'urgent',
//   BusinessCheck = 'businessCheck',
//   SlaTime = 'slaTime',
//   NonApplicableSubmit = 'nonApplicableSubmit',
//   AppealCase = 'appeal-case',
//   Upload = 'upload',
//   Template = 'template'

export default {
  ignore: [
    ButtonCode.TblSearch,
    ButtonCode.Image,
    ButtonCode.SlaTime,
    ButtonCode.Favorite,
    ButtonCode.Back,
    ButtonCode.Upload,
    ButtonCode.Template,
    ButtonCode.AppealCase,
  ],
  // diff and log change
  save: [
    ButtonCode.Save,
    ButtonCode.Submit,
    ButtonCode.Split,
    Action.ReAssessment,
    Action.Recalculate,
    ButtonCode.Confirm,
  ],
};
