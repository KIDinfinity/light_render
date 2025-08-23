import { formatMessageApi } from '@/utils/dictFormatMessage';

export default (functionCode: string, functionName: string) => {
  const label = `configurationcenter.menu.${functionCode}`;
  const formatFunction = formatMessageApi({ Label_BIZ_Claim: label });
  return formatFunction !== label ? formatFunction : functionName;
};
