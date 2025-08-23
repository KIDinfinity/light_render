import lodash from 'lodash';
import type { ToolsRenderDataModel } from '../_dto/model';

/**
 * 搜集有意义的tool id值
 * @param toolsRenderDatas
 */
const collectToolsId = (toolsRenderDatas: ToolsRenderDataModel[]) =>
  lodash
    .chain(toolsRenderDatas)
    .map((module: ToolsRenderDataModel) => module.toolId)
    .compact()
    .value();

export default collectToolsId;
