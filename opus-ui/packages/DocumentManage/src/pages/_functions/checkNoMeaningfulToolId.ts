import lodash from 'lodash';
import type { ToolsRenderDataModel } from '../_dto/model';

interface IResult {
  result: boolean;
  noMeaningful?: ToolsRenderDataModel[];
}

/**
 * 检查tool id是否无意义，如undefined，''，null等
 * @param toolsRenderDatas
 */
const checkNoMeaningfulToolId = (toolsRenderDatas: ToolsRenderDataModel[]): IResult => {
  if (!lodash.isArray(toolsRenderDatas) || toolsRenderDatas.length < 1)
    throw Error(
      `Encountered illegal parameters:${toolsRenderDatas} at checkNoMeaningfulToolId(toolsRenderDatas)`
    );
  const noMeaningful: ToolsRenderDataModel[] = lodash.filter(
    toolsRenderDatas,
    (toolData: ToolsRenderDataModel) => !toolData.toolId
  );

  return {
    result: !!noMeaningful.length,
    noMeaningful,
  };
};

export default checkNoMeaningfulToolId;
