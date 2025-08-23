import lodash from 'lodash';
import loadable from '@loadable/component';

export const config = {
  submit: loadable(async () => (await import('bpm/assets/submit.svg'))?.ReactComponent),
  nonApplicableSubmit: loadable(
    async () => (await import('bpm/assets/submit.svg'))?.ReactComponent
  ),
  favorite: loadable(async () => (await import('bpm/assets/favorite.svg'))?.ReactComponent),
  favorite_active: loadable(async () => (await import('bpm/assets/favorited.svg'))?.ReactComponent),
  split: loadable(async () => (await import('bpm/assets/split-icon.svg'))?.ReactComponent),
  image: loadable(async () => (await import('bpm/assets/camera.svg'))?.ReactComponent),
  reject: loadable(async () => (await import('bpm/assets/close.svg'))?.ReactComponent),
  urgent: loadable(async () => (await import('bpm/assets/lightning.svg'))?.ReactComponent),
  urgent_active: loadable(async () => (await import('bpm/assets/lightned.svg'))?.ReactComponent),
  withdrawal: loadable(async () => (await import('bpm/assets/cancel.svg'))?.ReactComponent),
  slaTime: loadable(async () => (await import('bpm/assets/time.svg'))?.ReactComponent),
  businessCheck: loadable(
    async () => (await import('bpm/assets/business-check.svg'))?.ReactComponent
  ),
  sendAppForm: loadable(async () => (await import('bpm/assets/mail.svg'))?.ReactComponent),
  genAppForm: loadable(async () => (await import('bpm/assets/file-add.svg'))?.ReactComponent),
  returnAppDoc: loadable(async () => (await import('bpm/assets/download.svg'))?.ReactComponent),
  tblSearch: loadable(async () => (await import('bpm/assets/search.svg'))?.ReactComponent),
  pend: loadable(async () => (await import('bpm/assets/pend.svg'))?.ReactComponent),
  withdraw: loadable(async () => (await import('bpm/assets/withdraw.svg'))?.ReactComponent),
  proposalChange: loadable(
    async () => (await import('bpm/assets/proposalChange.svg'))?.ReactComponent
  ),
  save: loadable(async () => (await import('bpm/assets/save.svg'))?.ReactComponent),
  ews: loadable(async () => (await import('bpm/assets/ews.svg'))?.ReactComponent),
  back: loadable(async () => (await import('bpm/assets/back.svg'))?.ReactComponent),
  dedupCheck: loadable(async () => (await import('bpm/assets/dedupCheck.svg'))?.ReactComponent),
  download: loadable(async () => (await import('bpm/assets/download.svg'))?.ReactComponent),
  sent: loadable(async () => (await import('bpm/assets/sent.svg'))?.ReactComponent),
  send: loadable(async () => (await import('bpm/assets/send.svg'))?.ReactComponent),
  search: loadable(async () => (await import('bpm/assets/search.svg'))?.ReactComponent),
  retry: loadable(async () => (await import('bpm/assets/retry.svg'))?.ReactComponent),
  add: loadable(async () => (await import('bpm/assets/add.svg'))?.ReactComponent),
  PMA: loadable(async () => (await import('bpm/assets/PMA.svg'))?.ReactComponent),
  revert: loadable(async () => (await import('bpm/assets/revert.svg'))?.ReactComponent),
  UpdatePolicy: loadable(async () => (await import('bpm/assets/UpdatePolicy.svg'))?.ReactComponent),
  disagree: loadable(async () => (await import('bpm/assets/disagree.svg'))?.ReactComponent),
  ruleResult: loadable(async () => (await import('bpm/assets/ruleResult.svg'))?.ReactComponent),
  discard: loadable(async () => (await import('bpm/assets/discard.svg'))?.ReactComponent),
  agree: loadable(async () => (await import('bpm/assets/agree.svg'))?.ReactComponent),
  eSubmission: loadable(async () => (await import('bpm/assets/eSubmission.svg'))?.ReactComponent),
  appeal: loadable(async () => (await import('bpm/assets/appeal.svg'))?.ReactComponent),
  edit: loadable(async () => (await import('bpm/assets/edit.svg'))?.ReactComponent),
  approval: loadable(async () => (await import('bpm/assets/approval.svg'))?.ReactComponent),
  error: loadable(async () => (await import('bpm/assets/error.svg'))?.ReactComponent),
  approve: loadable(async () => (await import('bpm/assets/approve.svg'))?.ReactComponent),
  assign: loadable(async () => (await import('bpm/assets/assign.svg'))?.ReactComponent),
  exit: loadable(async () => (await import('bpm/assets/exit.svg'))?.ReactComponent),
  sumPage: loadable(async () => (await import('bpm/assets/sumPage.svg'))?.ReactComponent),
  template: loadable(async () => (await import('bpm/assets/template.svg'))?.ReactComponent),
  basic: loadable(async () => (await import('bpm/assets/basic.svg'))?.ReactComponent),
  favorited: loadable(async () => (await import('bpm/assets/favorited.svg'))?.ReactComponent),
  terminatePolicy: loadable(
    async () => (await import('bpm/assets/terminatePolicy.svg'))?.ReactComponent
  ),
  time: loadable(async () => (await import('bpm/assets/time.svg'))?.ReactComponent),
  camera: loadable(async () => (await import('bpm/assets/camera.svg'))?.ReactComponent),
  timer: loadable(async () => (await import('bpm/assets/timer.svg'))?.ReactComponent),
  cancel: loadable(async () => (await import('bpm/assets/cancel.svg'))?.ReactComponent),
  light: loadable(async () => (await import('bpm/assets/light.svg'))?.ReactComponent),
  upload: loadable(async () => (await import('bpm/assets/upload.svg'))?.ReactComponent),
  clock: loadable(async () => (await import('bpm/assets/clock.svg'))?.ReactComponent),
  lightned: loadable(async () => (await import('bpm/assets/lightned.svg'))?.ReactComponent),

  viaEmailAgree: loadable(
    async () => (await import('bpm/assets/viaEmailAgree.svg'))?.ReactComponent
  ),
  close: loadable(async () => (await import('bpm/assets/close.svg'))?.ReactComponent),
  lightning: loadable(async () => (await import('bpm/assets/lightning.svg'))?.ReactComponent),
  questionnaire: loadable(
    async () => (await import('bpm/assets/questionnaire.svg'))?.ReactComponent
  ),
  viaEmailDisagree: loadable(
    async () => (await import('bpm/assets/viaEmailDisagree.svg'))?.ReactComponent
  ),
  mail: loadable(async () => (await import('bpm/assets/mail.svg'))?.ReactComponent),
  confirm: loadable(async () => (await import('bpm/assets/confirm.svg'))?.ReactComponent),
  resume: loadable(async () => (await import('bpm/assets/resume.svg'))?.ReactComponent),
  decline: loadable(async () => (await import('bpm/assets/decline.svg'))?.ReactComponent),
  pending: loadable(async () => (await import('bpm/assets/pending.svg'))?.ReactComponent),
  escalate: loadable(async () => (await import('bpm/assets/escalate.svg'))?.ReactComponent),
  'Re-underwrite': loadable(
    async () => (await import('bpm/assets/InteractionOutlined.svg'))?.ReactComponent
  ),
  'Re-calculate': loadable(
    async () => (await import('bpm/assets/InteractionOutlined.svg'))?.ReactComponent
  ),
};

const getIcon = ({ icon, status }: any) => {
  return lodash.get(config, `${icon}_${status}`) || lodash.get(config, `${icon}`);
};

export default getIcon;
