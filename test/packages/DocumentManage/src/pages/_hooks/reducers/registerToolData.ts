import {produce} from 'immer';
import lodash from 'lodash';
import type { ActionModel, ToolsRenderDataModel } from '../../_dto/model';
import { checkDuplicateToolId, checkNoMeaningfulToolId, checkOrderVal } from '../../_functions';

interface IToolModules {
  toolsRenderData: ToolsRenderDataModel; // | ToolsRenderDataModel[]
}

const updateToolRenderData = (
  toolsRenderData: ToolsRenderDataModel,
  renderDatas: ToolsRenderDataModel[],
  toolKey: string,
  isArray?: boolean
): ToolsRenderDataModel[] => {
  if (
    !lodash.isArray(renderDatas) ||
    !lodash.isPlainObject(toolsRenderData) ||
    !lodash.isString(toolKey)
  )
    return renderDatas;

  const { toolId } = toolsRenderData;
  const tempRenderDatas: ToolsRenderDataModel[] = [...renderDatas];
  // ToolsRenderData不是数组，且tool id未指定，或指定非字符串的情况下自动填充tool id
  if (!isArray && !lodash.isEmpty(toolsRenderData) && (!lodash.isString(toolId) || !toolId)) {
    // eslint-disable-next-line  no-param-reassign
    toolsRenderData.toolId = toolKey;
  }

  // 如果tool data已存在，则合并
  const existIndex = lodash.findIndex(tempRenderDatas, { toolId: toolsRenderData.toolId });
  let existToolData = null;

  if (existIndex > -1) {
    existToolData = tempRenderDatas[existIndex];
    tempRenderDatas[existIndex] = lodash.merge(existToolData, toolsRenderData);
  } else {
    // 不存在则在尾部追加，push tool data
    // eslint-disable-next-line no-unused-expressions
    !lodash.isEmpty(toolsRenderData) && tempRenderDatas.push(toolsRenderData);
  }

  return tempRenderDatas;
};

/**
 * 给tool data进行默认排序
 *
 * 1.优先以tool data的order进行排序
 * 2.分析order的数值和tool data整个数组索引index的关系
 *   1'分离有order值的和没有order值tool data，并将没有order值的order赋值为初始的index值
 *   2'找到order的最大值和最小值
 *   3'若最大值超过tool data数组的最大索引值(array.length-1)，则将其值置为最大索引值
 *   4'若最小值小于tool data数组的最小索引值(array.length-1)，则将其值置为最小索引值
 *   5'中间的order值依次更新为其排序后的index值
 *   6'将没有order值那部分数据从左至右依次插入到其初始的index位置
 *   7'将tool data 重新按 order倒序排序
 * 3.将排序好的数据返回
 *
 * @param renderDatas
 */
const reOrderTools = (renderDatas: ToolsRenderDataModel[]) => {
  // 以下处理排序

  const maxIndex = renderDatas.length - 1;
  // 找到所有指定了order值的tool data
  const hasOrderToolDatas = lodash.filter(renderDatas, (toolData: ToolsRenderDataModel) =>
    lodash.isNumber(toolData.order)
  );
  // 给没有指定order值的tool data赋值初始化的index
  const renderDatasTemp = lodash.map(renderDatas, (toolData: ToolsRenderDataModel, index: number) =>
    !lodash.isNumber(toolData.order) ? lodash.set(toolData, 'order', index) : toolData
  );
  // 找到所有初始化的时候没有指定order值的tool data
  const noOrderToolDatas = lodash
    .chain(renderDatasTemp)
    .differenceWith(hasOrderToolDatas, lodash.isEqual)
    .orderBy('order')
    .value();
  // 给初始化时指定了order值的tool data排序，并将其order值按初始化的maxIndex值逐渐倒序逐渐递减更新
  const reorderedToolDatas = lodash
    .chain(hasOrderToolDatas)
    .orderBy('order', 'desc')
    .map((toolData: ToolsRenderDataModel, index: number) => {
      lodash.set(toolData, 'order', maxIndex - index);

      return toolData;
    })
    .reverse()
    .value();
  // 将noOrderToolDatas从左至右依次插入到reorderedToolDatas中
  lodash.forEach(noOrderToolDatas, (toolData: ToolsRenderDataModel) => {
    const exsist = reorderedToolDatas[toolData.order as number];
    if (exsist) {
      reorderedToolDatas.splice((toolData.order as number) - 1, 0, toolData);
    } else {
      reorderedToolDatas[toolData.order as number] = toolData;
    }
  });

  // 将插入合并后的数据的order值按初始化的maxIndex值逐渐倒序逐渐递减更新，并最终按顺序排序
  return lodash
    .chain(reorderedToolDatas)
    .reverse()
    .map((toolData: ToolsRenderDataModel, index: number) => {
      lodash.set(toolData, 'order', maxIndex - index);

      return toolData;
    })
    .orderBy('order', 'asc')
    .value();
};

/**
 * 注册tools render data数据
 */
export default (state: any, { payload }: ActionModel) => {
  const { toolsModules } = payload;

  // 获取toolsRenderData是数组的tool data
  const renderDatalist = lodash
    .chain(toolsModules)
    .filter((toolModule) => lodash.isArray(toolModule.toolsRenderData))
    .map((toolModule) => toolModule.toolsRenderData)
    .flatten()
    .value();

  // toolsRenderData是数组则tool id必须给定
  const { result, noMeaningful } = checkNoMeaningfulToolId(renderDatalist);

  if (result)
    throw Error(`There is no meaningful tool id at renderDatas:${JSON.stringify(noMeaningful)}`);

  return produce(state, (draftSate: any) => {
    const draft = draftSate;
    let { renderDatas, useOrderOnly } = draft;

    lodash.forEach(toolsModules, (toolModule, toolKey) => {
      const { toolsRenderData }: IToolModules = toolModule;

      if (lodash.isArray(toolsRenderData)) {
        lodash.forEach(toolsRenderData, (toolData: ToolsRenderDataModel) => {
          renderDatas = updateToolRenderData(toolData, renderDatas, toolKey, true);
        });
      } else {
        renderDatas = updateToolRenderData(toolsRenderData, renderDatas, toolKey);
      }
    });

    const { result: dupliResult, duplicatedToolIds } = checkDuplicateToolId(renderDatas);

    if (dupliResult)
      throw Error(
        `Tool data id is duplicated:${JSON.stringify(duplicatedToolIds)} about renderDatas`
      );

    // 当只采用order进行排序时，需要检查tool data 的值是否存在
    if (useOrderOnly) {
      const { result: noOrderResult, noOrderExsistToolIds } = checkOrderVal(renderDatas);
      if (noOrderResult)
        throw Error(
          `Tool data order is not exsist:${JSON.stringify(noOrderExsistToolIds)} about renderDatas`
        );
    }

    /**
     * 1'当只采用order进行排序时（useOrderOnly=true），则忽略tool data数据的初始化顺序，要求所有tool data 设置好order的值
     * 2'当采用默认方式进行排序的时（useOrderOnly=false），
     *   则对设置order的tool data 优先按照order进行排序，
     *   对没有设置order的tool data按照初始化的顺序进行排序
     */
    draft.renderDatas = useOrderOnly
      ? lodash.orderBy(renderDatas, 'order', 'asc')
      : reOrderTools(renderDatas);
  });
};
