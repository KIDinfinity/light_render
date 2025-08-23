import lodash from 'lodash';
import { tplArgReg, argCtnReg } from 'bpm/pages/Envoy/_utils/regExp';
import replaceTemplateParams from 'bpm/pages/Envoy/_utils/replaceTemplateParams';
import getTemplateByRoleAndChannel from './getTemplateByRoleAndChannel';

export default function getTheReplacedWithTpl(data: any, curRoleInfo: any, config: any) {
  const newData = lodash.cloneDeep(data);
  const { channelDataList, startTime, period, dest, destRole, destRoleOpt } = lodash.pick(newData, [
    'channelDataList',
    'startTime',
    'period',
    'dest',
    'destRole',
    'destRoleOpt',
  ]);

  const role = destRole || destRoleOpt[0];
  const fullName = dest || lodash.get(curRoleInfo, '[0].fullName', '');

  newData.destRole = role;
  newData.dest = fullName;
  const userInfo =
    (lodash.chain(curRoleInfo).pickBy(lodash.isObject) as any)
      .find({ fullName: newData.dest })
      .value() || {};
  const arg = {
    startTime,
    period,
    ...userInfo,
  };
  for (let channelIdx = 0; channelIdx < channelDataList?.length; channelIdx += 1) {
    const content = lodash.get(channelDataList, `[${channelIdx}].content`, '');
    const channel = lodash.get(channelDataList, `[${channelIdx}].channel`, '');
    const template = getTemplateByRoleAndChannel({
      config,
      role,
      channel,
    });
    if (content) {
      const { info, content: detail } = content;
      lodash.mapKeys(info, (tplVal, tplKey) => {
        if (!lodash.isEmpty(tplVal)) {
          let argVal = '{{}}';
          if (lodash.isString(arg[tplKey])) {
            argVal = `{{${arg[tplKey]}}}`;
          }
          const templateItem = lodash.get(template, `info.${tplKey}`);
          if (templateItem) {
            info[tplKey] = replaceTemplateParams({
              template: templateItem,
              values: arg,
            });
          } else {
            info[tplKey] = tplVal.replace(tplArgReg, argVal);
          }
        }
      });
      lodash.set(content, 'info', info);
      const detailObj = lodash.isPlainObject(detail)
        ? detail
        : {
            value: detail,
            argMapObj: {},
          };
      if (lodash.isString(detailObj?.value)) {
        const temporaryArgMapObj = {};
        detailObj.value = detailObj?.value.replace(tplArgReg, (matchVal: string) => {
          const argCtn = matchVal?.match(argCtnReg);
          let argKey = lodash.isArray(argCtn) ? argCtn[0] : '';
          if (detailObj.argMapObj[argKey]) {
            argKey = detailObj.argMapObj[argKey];
          }
          let viewVal;
          if (argKey === 'remainingDays') {
            viewVal = arg.period;
          } else if (argKey === 'expireDate') {
            const startDay = new Date();
            const expireDate = new Date(
              startDay.getTime() + arg.period * (24 * 60 * 60 * 1000) // 经过多少毫秒
            );
            viewVal = expireDate.toLocaleDateString();
          } else {
            viewVal = arg[argKey] || `${argKey}`;
          }
          temporaryArgMapObj[viewVal] = argKey;
          return `{{${viewVal}}}`;
        });
        detailObj.argMapObj = temporaryArgMapObj;
      }
      lodash.set(content, 'content', detailObj);
      lodash.set(channelDataList, `[${channelIdx}].content`, content);
    }
  }
  newData.channelDataList = channelDataList;

  return newData;
}
