/**
 * 工具 - 精度配置
 */
import lodash from 'lodash';
import { LS, LSKey, SS, SSKey } from '@/utils/cache';
import { apiQueryAccuracyConfig } from '@/services/miscAccuracyConfigControllerService';

class AccuracyConfigTool {
  /**
   * 获取精度配置
   */
  getListData(): void {
    const accuracyConfig = SS.getItem(SSKey.ACCURACY_CONFIG);
    if (!accuracyConfig) {
      // 添加这个是为了防止401
      const userInfo = LS.getItem(LSKey.CURRENTUSER);
      if (!userInfo && !userInfo?.userId) return;
      apiQueryAccuracyConfig({}).then((response) => {
        if (
          lodash.isPlainObject(response) &&
          response.success &&
          lodash.isArray(response.resultData)
        ) {
          this.setListData(response.resultData);
          return response.resultData;
        }
      });
    }
  }

  /**
   * 设置精度配置
   * @param list - 精度配置列表
   */
  // eslint-disable-next-line class-methods-use-this
  setListData(list: any) {
    SS.setItem(SSKey.ACCURACY_CONFIG, {
      list,
      prefixModel: '',
    });
  }

  /**
   * 获取formItemNumber匹配的对象
   * objectFileName - 对象路径
   * return 匹配的对象
   */
  // eslint-disable-next-line class-methods-use-this
  getAccuaryItem({ objectFieldName, objectFieldValueType }: any) {
    const config = SS.getItem(SSKey.ACCURACY_CONFIG) || {};
    if (!objectFieldName || lodash.isEmpty(objectFieldName)) {
      // eslint-disable-next-line no-console
      // console.warn('objectFileName不能为空!');
      return {};
    }
    let objectItem = {};
    if (config.list && lodash.isArray(config.list) && !lodash.isEmpty(config.list)) {
      objectItem = objectFieldValueType
        ? lodash.chain(config.list).find({ objectFieldValueType, objectFieldName }).value() || {}
        : lodash.chain(config.list).find({ objectFieldName }).value() || {};
    }
    if (lodash.isEmpty(objectItem)) {
      // eslint-disable-next-line no-console
      console.warn(
        `匹配不到objectFileName=${objectFieldName};${
          objectFieldValueType ? `objectFieldValueType=${objectFieldValueType}` : ''
        }请检查session缓存(venus-ui_accuracy_config)是否存在匹配值`
      );
    }
    return objectItem;
  }

  /**
   * 设置ObjectName前缀(不处理流程级别，所以这个方法暂时不需要用到)
   * taskDetail - 流程信息
   */
  // eslint-disable-next-line class-methods-use-this
  getObjectNamePrefix({ taskDetail }: any) {
    let prefixModel = '';
    const accuracyConfig = SS.getItem(SSKey.ACCURACY_CONFIG);

    // 处理流程
    if (taskDetail && lodash.isPlainObject(taskDetail) && !lodash.isEmpty(taskDetail)) {
      const { caseCategory, taskDefKey } = taskDetail;
      prefixModel = `claim.${caseCategory.replace(/\s*/g, '')}.${taskDefKey}`;
    }

    if (accuracyConfig?.prefixModel === prefixModel) return;

    SS.setItem(SSKey.ACCURACY_CONFIG, {
      list: accuracyConfig?.list,
      prefixModel,
    });
  }
}
export default new AccuracyConfigTool();
