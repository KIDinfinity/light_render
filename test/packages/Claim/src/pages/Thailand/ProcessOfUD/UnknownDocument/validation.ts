import lodash from 'lodash';

export const validateResume = (decisionEl: string, selectRowKeys: string[]) => {
  const decision = lodash.get(decisionEl, 'value') || decisionEl;
  const isResume = !!(decision && lodash.toLower(decision) === 'resume');
  return !!(isResume && selectRowKeys.length === 0);
};
