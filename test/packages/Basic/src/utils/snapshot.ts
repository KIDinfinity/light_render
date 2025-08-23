// TODO:这个已经没用待测试没问题后删除
import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { Validator } from 'jsonschema';
import { findReasonInfo } from '@/services/navigatorEnvoyControllerService';
import { snapshot } from '@/services/navigatorTaskInfoControllerService';
import { requestHandleType } from 'bpm/enum/requestHandleType';

const validator = new Validator();

/**
 * snapshot 工具类
 *
 * 包含以下方法
 * isReasonableData - 判断 save 数据是否合理
 * getSnapshotForSave - 获取用户 save 时要保存到快照到数据
 * saveSnashot - 存储 snapshot 数据
 * validateInformationSnapshot -
 */

class Snashot {
  /**
   * 判定数据是否合理
   * @param {Object} dataForSubmit 核心数据
   * @param {String} result  拼装后数据
   * @param {String} optionType 操作类型
   * @returns true || false 不合理 存储错误 snapshotData
   */

  isReasonableData = ({ dataForSubmit, result, optionType }: any) => {
    if (lodash.isEmpty(dataForSubmit) || !lodash.isPlainObject(dataForSubmit)) {
      snapshot({
        ...result,
        snapshotDataList: lodash.map(result.snapshotDataList, (item: any) => {
          return optionType
            ? { ...item, dataType: `${item?.dataType}_error${optionType}` }
            : { ...item, dataType: `${item?.dataType}_error` };
        }),
      });
      return false;
    }
    return true;
  };

  /**
   * 获取用户 save 时要保存到快照到数据
   * @param {Object} taskDetail 为了获取 taskId 和 processInstanceId
   * @param {Object} dataForSubmit 核心数据
   * @param {String} optionType 操作类型
   * @param {Object} extra 拼接 submit 数据  { ...dataForSubmit, ...extra }
   * @param {Object} dataSchema
   * @returns Symbol('break') || 正确的submit 数据
   */
  getSnapshotForSave = async ({
    dataForSubmit,
    optionType,
    taskDetail,
    dataType = 'mainPage',
    extra = {},
    dataSchema,
    snapshotDataListType = 'default',
  }: any) => {
    const { taskId, processInstanceId } = lodash.pick(taskDetail, ['taskId', 'processInstanceId']);

    // 类型配置
    const snapshotDataListTypeConfig = {
      loadPending: async () => {
        return {
          processInstanceId,
          taskId,
          snapshotDataList: [
            {
              taskId,
              dataType: 'mainPage',
              dataValue: JSON.stringify({ ...dataForSubmit, ...extra }),
            },
            {
              taskId,
              dataType: 'pending',
              dataValue: JSON.stringify(
                lodash.get(
                  await findReasonInfo(
                    objectToFormData({
                      caseNo: processInstanceId,
                      taskId,
                    })
                  ),
                  'resultData',
                  {}
                )
              ),
            },
          ],
        };
      },
      default: () => {
        if (lodash.isPlainObject(dataSchema)) {
          const validateResult = validator.validate(dataForSubmit, dataSchema);

          const errors = lodash.get(validateResult, 'errors', []);
          // todo: 这里能接日志系统就可以发现一些问题
          // eslint-disable-next-line no-console

          if (errors.length) {
            return requestHandleType.continue;
          }
        }
        return {
          processInstanceId,
          taskId,
          snapshotDataList: [
            {
              taskId,
              dataType,
              dataValue: JSON.stringify({ ...dataForSubmit, ...extra }),
            },
          ],
        };
      },
    };

    if (lodash.isFunction(snapshotDataListTypeConfig[snapshotDataListType])) {
      const result = snapshotDataListTypeConfig[snapshotDataListType]();
      if (!this.isReasonableData({ dataForSubmit, result, optionType })) {
        return requestHandleType.break;
      }
      return result;
    }
    return requestHandleType.break;
  };

  /**
   * 存储 snapshot 数据
   * @param {Object} taskDetail 为了获取bpm 的 taskId 和 processInstanceId
   * @param {String} optionType 操作类型
   * @param {String} dataType 数据类型
   * @param {Object} dataForSubmit 核心数据
   * @param {Object} dataSchema
   * @returns Symbol('break') || 存储 snapshot 数据后接口返回结果
   */
  saveSnashot = async ({
    taskDetail,
    dataSchema,
    dataType,
    dataForSubmit,
    optionType,
    extra,
  }: any) => {
    this.getSnapshotForSave({
      taskDetail,
      dataForSubmit,
      dataSchema,
      optionType,
      dataType,
      extra,
    }).then((saveSnapshotData) => {
      return saveSnapshotData === requestHandleType.break
        ? saveSnapshotData
        : snapshot(saveSnapshotData);
    });
  };

  /**
   *
   * @param param {Object} data 快照数据
   * @return {boolean}
   */
  validateInformationSnapshot = ({ data }: any) => {
    const schema = {
      type: 'array',
      items: {
        properties: {
          effectiveDate: {
            type: 'string',
          },
          expiryDate: {
            type: 'string',
          },
          content: {
            type: 'string',
          },
        },
        required: ['content', 'expiryDate', 'effectiveDate'],
      },
    };
    const result = validator.validate(data, schema, {});
    const validateErrors = lodash.get(result, 'errors', []);

    return !validateErrors.length;
  };
}

export default Snashot;
