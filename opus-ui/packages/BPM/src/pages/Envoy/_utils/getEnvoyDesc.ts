import { formatMessageApi, hasFormatMessageHTMLFn } from '@/utils/dictFormatMessage';
export default (code): string => {
  if (!code) {
    return '';
  }
  return hasFormatMessageHTMLFn({
    Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${code}`,
  })
    ? formatMessageApi({
        Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${code}`,
      })
    : '';
};
