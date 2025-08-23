import lodash from 'lodash';
import * as FlattenJS from 'flattenjs';
import { safeParseUtil } from '@/utils/utils';
import { tplArgReg, argCtnReg } from 'bpm/pages/Envoy/_utils/regExp';

const objToJson = (data: any) => {
  if (lodash.isString(data)) {
    return data;
  }
  return JSON.stringify(data);
};

const jsonToObj = (data: any) => {
  if (lodash.isString(data)) {
    return safeParseUtil(data);
  }
  return data;
};

const transferToObj = (ctn: any) => {
  lodash.set(ctn, 'attachment', jsonToObj(lodash.get(ctn, 'attachment')));
  lodash.set(ctn, 'policy', jsonToObj(lodash.get(ctn, 'policy')));
  lodash.forEach(ctn?.channelDataList, (channel: any) => {
    lodash.set(channel, 'content', jsonToObj(channel?.content));
  });
  return ctn;
};

const argToVal = (channelData: any[]) => {
  const newChannelData = lodash.cloneDeep(channelData);
  newChannelData?.forEach((item: any) => {
    // eslint-disable-next-line no-param-reassign
    item.content = item?.content?.replace(tplArgReg, (val) => {
      const argCtn = val.match(argCtnReg);
      return lodash.isArray(argCtn) ? argCtn[0] : '';
    });
  });
  return newChannelData;
};
const transferToJson = (ctn: any) => {
  lodash.set(ctn, 'displayConfig', objToJson(lodash.get(ctn, 'displayConfig')));
  lodash.set(ctn, 'attachment', objToJson(lodash.get(ctn, 'attachment')));
  lodash.set(ctn, 'policy', objToJson(lodash.get(ctn, 'policy')));
  lodash.forEach(ctn?.channelDataList, (channel: any) => {
    const content = lodash.get(channel, 'content.content.value');
    lodash.set(channel, 'content.content', content);
    lodash.set(channel, 'content', objToJson(channel?.content));
  });
  return ctn;
};

const getFieldName = (name: string) => {
  if (!lodash.isString(name)) {
    return name;
  }
  return name?.replaceAll('{', '[')?.replaceAll('}', ']')?.replaceAll('_', '.');
};

const setFieldName = (name: string) => {
  if (!lodash.isString(name)) {
    return name;
  }
  return name?.replaceAll('[', '{')?.replaceAll(']', '}')?.replaceAll('.', '_');
};

const mapCtnToFields = (ctn: any) => {
  const cloneCtn = lodash.cloneDeep(ctn);
  const transferObj = lodash.pick(cloneCtn, [
    'attachment',
    'channelDataList',
    'define',
    'letterCode',
    'delayLetter',
    'dispatchDate',
    'policy',
    'remark',
    'payment',
    'pendingMemoList',
  ]);
  let mapObj = {};
  lodash.forEach(lodash.keys(transferObj), (item: string) => {
    const policyObj = {};
    switch (item) {
      case 'channelDataList':
        mapObj = {
          ...mapObj,
          ...FlattenJS.convert({
            [item]: lodash.map(transferObj[item], (data: any) => {
              const info = lodash.get(data, 'content.info');
              lodash.forEach(lodash.keys(info), (infoItem: string) => {
                // eslint-disable-next-line prefer-destructuring
                info[infoItem] = info[infoItem]?.replaceAll('{{', '')?.replaceAll('}}', '');
              });
              lodash.set(data, 'content.info', info);
              return data;
            }),
          }),
        };
        break;
      case 'policy':
        lodash.forEach(transferObj[item], (policyItem, idx) => {
          lodash.forEach(lodash.keys(policyItem), (targetKey) => {
            policyObj[`${item}{${idx}}_${targetKey}`] = policyItem[targetKey];
          });
        });
        mapObj = {
          ...mapObj,
          ...policyObj,
        };
        break;
      default:
        mapObj = {
          ...mapObj,
          ...FlattenJS.convert({ [item]: transferObj[item] }),
        };
    }
  });
  const newMapObj = {};
  lodash.forEach(lodash.keys(mapObj), (item: any) => {
    newMapObj[setFieldName(item)] = mapObj[item];
  });
  return newMapObj;
};

export { transferToObj, argToVal, transferToJson, getFieldName, mapCtnToFields };
