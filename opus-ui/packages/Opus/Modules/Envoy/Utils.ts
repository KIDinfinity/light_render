import { formatMessageApi, hasFormatMessageHTMLFn } from '@/utils/dictFormatMessage';

const getReasonText = (item: any): string => {
  return hasFormatMessageHTMLFn({
    Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${item?.groupCode}`,
  })
    ? formatMessageApi({
        Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${item?.groupCode}`,
      })
    : item?.name;
};

export { getReasonText };
