import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { VLD_000324, VLD_000325, VLD_000326 } from '@/utils/validations';
import { isTplArgReg, isEmailReg, notReplaceArgReg } from 'bpm/pages/Envoy/_utils/regExp';

const mapIsRequireFn = {
  sms: VLD_000325,
  email: VLD_000324,
  emailApproval: VLD_000324,
  letter: VLD_000326,
};

const checkChannelData = (errObj: any, channelData: any[], dataInfo: any, isSend: boolean) => {
  const ERR_000001 = formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' });
  const WRN_000041 = formatMessageApi({ Label_COM_WarningMessage: 'WRN_000041' });
  const ERR_000302 = formatMessageApi({ Label_COM_WarningMessage: 'ERR_000302' });
  const { claimNo, destRoleInfo, destRole, dest, ...otherInfo } = dataInfo;
  const currentRoleInfo = lodash.get(destRoleInfo, `${claimNo}_${destRole}`);
  const userInfo =
    (lodash.chain(currentRoleInfo).pickBy(lodash.isObject) as any)
      .find({ fullName: dest })
      .value() || {};
  const arg = {
    ...otherInfo,
    ...userInfo,
  };

  lodash.forEach(channelData, (channelItem: any, channelIdx: number) => {
    const channel = lodash.get(channelItem, 'channel');
    const enable = lodash.get(channelItem, 'enable');
    const info = lodash.get(channelItem, 'content.info');
    errObj[`channelDataList{${channelIdx}}`] = [];
    lodash.forEach(lodash.keys(info), (infoKey: string) => {
      const viewInfoVal = info[infoKey]?.replaceAll('{{', '')?.replaceAll('}}', '');
      errObj[`channelDataList{${channelIdx}}_content_info_${infoKey}`] = [];
      if (enable) {
        if (lodash.isEmpty(viewInfoVal)) {
          if (isSend && mapIsRequireFn[channel](infoKey)) {
            errObj[`channelDataList{${channelIdx}}`].push(ERR_000001);
            errObj[`channelDataList{${channelIdx}}_content_info_${infoKey}`].push(ERR_000001);
          }
          if (!isSend && isTplArgReg.test(info[infoKey]) && lodash.isEmpty(arg[infoKey])) {
            errObj[`channelDataList{${channelIdx}}`].push(WRN_000041);
            errObj[`channelDataList{${channelIdx}}_content_info_${infoKey}`].push(WRN_000041);
          }
        } else if (isSend && infoKey === 'emailAddress' && !isEmailReg.test(viewInfoVal)) {
          errObj[`channelDataList{${channelIdx}}`].push(ERR_000302);
          errObj[`channelDataList{${channelIdx}}_content_info_${infoKey}`].push(ERR_000302);
        } else if (isSend && infoKey === 'cc' && !isEmailReg.test(viewInfoVal)) {
          errObj[`channelDataList{${channelIdx}}`].push(ERR_000302);
          errObj[`channelDataList{${channelIdx}}_content_info_${infoKey}`].push(ERR_000302);
        }
      }
    });

    errObj[`channelDataList{${channelIdx}}_content_content`] = [];
    const content = lodash.get(channelItem, 'content.content.value');
    if (enable && lodash.isString(content)) {
      if (!isSend && content.match(notReplaceArgReg)?.length) {
        errObj[`channelDataList{${channelIdx}}`].push(WRN_000041);
        errObj[`channelDataList{${channelIdx}}_content_content`].push(WRN_000041);
      }
    }
  });
  return errObj;
};

export default checkChannelData;
