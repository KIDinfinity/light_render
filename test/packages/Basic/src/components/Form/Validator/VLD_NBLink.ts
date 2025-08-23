/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 * 配置化
 * clientDetail - 匹配的section,这个名字自己定义
 * matching - 匹配的filed,只有命中filed,才走下面逻辑(为了防止不必要的处理)
 * list - 校验的field列表
 */
/**
 * List配置说明
 * domainId - 对应数据
 * fieldId - field名称
 * description - 描述
 * errors - 错误的国际化
 */
const config = {
  clientDetail: {
    matching: ['title', 'gender'],
    list: [
      {
        domainId: 'clientInfo',
        fieldId: 'title',
        description: '标题',
        errors: () => {
          return [
            {
              message: `${formatMessageApi({
                Label_COM_WarningMessage: 'MSG_000636',
              })}`,
              field: 'title',
            },
          ];
        },
      },
    ],
  },
};

/**
 * 联动校验
 * 1.遍历需要匹配的校验的field
 * 2.命中匹配规则
 * 3.添加校验信息
 */
export const VLD_NBLink = (state: any, action: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, id } = action.payload;

    if (lodash.size(changedFields) !== 1) return;

    // policyList->clientInfoList
    if (lodash.includes(config.clientDetail.matching, lodash.keys(changedFields)[0])) {
      lodash.map(config.clientDetail.list, ({ fieldId, errors }: any) => {
        const idx = lodash.findIndex(
          draftState.businessData.policyList[0].clientInfoList,
          (item: any) => item.id === id
        );
        const cleanItem = formUtils.cleanValidateData(
          draftState.businessData.policyList[0].clientInfoList[idx]
        );

        const mapping = {
          M: ['MRS', 'MS'],
          F: ['MR', 'REV'],
        };

        if (
          lodash.isArray(mapping[cleanItem.gender]) &&
          lodash.includes(mapping[cleanItem.gender], cleanItem.title)
        ) {
          draftState.businessData.policyList[0].clientInfoList[idx][fieldId] = {
            value: cleanItem[fieldId],
            name: fieldId,
            errors: errors(),
            validating: false,
          };
        } else {
          draftState.businessData.policyList[0].clientInfoList[idx][fieldId] = cleanItem[fieldId];
        }
      });
    }
  });

export const VLD_NBLink_refactor = (state: any, action: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, id } = action.payload;
    if (lodash.size(changedFields) !== 1) return;

    if (lodash.includes(config.clientDetail.matching, lodash.keys(changedFields)[0])) {
      lodash.map(config.clientDetail.list, ({ fieldId, errors }: any) => {
        const cleanItem = formUtils.cleanValidateData(
          draftState.modalData.entities?.clientMap[id]?.personalInfo
        );

        const mapping = {
          M: ['MRS', 'MS'],
          F: ['MR', 'REV'],
        };

        if (
          lodash.isArray(mapping[cleanItem.gender]) &&
          lodash.includes(mapping[cleanItem.gender], cleanItem.title)
        ) {
          lodash.set(draftState, 'modalData.entities.clientMap[id].personalInfo[fieldId]', {
            value: cleanItem[fieldId],
            name: fieldId,
            errors: errors(),
            validating: false,
          });
        } else {
          lodash.set(
            draftState,
            'modalData.entities.clientMap[id].personalInfo[fieldId]',
            cleanItem[fieldId]
          );
        }
      });
    }
  });
