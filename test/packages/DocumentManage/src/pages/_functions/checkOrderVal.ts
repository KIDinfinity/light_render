import lodash from 'lodash';
import type { ToolsRenderDataModel } from '../_dto/model';

interface IResult {
  result: boolean;
  noOrderExsistToolIds?: string[];
}

/**
 * 检查order是否不存在
 * @param toolsRenderDatas
 */
const checkOrderVal = (toolsRenderDatas: ToolsRenderDataModel[]): IResult => {
  if (!lodash.isArray(toolsRenderDatas) || toolsRenderDatas.length < 1) return { result: false };

  const noOrderExsistTools = lodash.filter(
    toolsRenderDatas,
    (toolData: ToolsRenderDataModel) => !lodash.isNumber(toolData.order)
  );

  return {
    result: lodash.size(noOrderExsistTools) > 0,
    noOrderExsistToolIds: lodash.map(
      noOrderExsistTools,
      (toolData: ToolsRenderDataModel) => toolData.toolId as string
    ),
  };
};

export default checkOrderVal;
