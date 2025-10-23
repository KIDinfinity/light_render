import type { FunctionComponent, ComponentType} from 'react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import type { ToolsRenderDataModel, StateModel } from '../_dto/model';
import { callReducer, actions } from '../_hooks';
import { tools as toolsInit } from '../_hooks/state';
import { EToolModules } from '../_dto/enums';
import type { IToolsComponent } from '../_components/Tools';
import Tools from '../_components/Tools';
import type { IEdit } from './Edit';
import Edit from './Edit';
import Void from './Void';
import ReIndex from './ReIndex';
import type { IMandatory } from './Mandatory';
import Mandatory from './Mandatory';
import type { IUpload } from './Upload';
import Upload from './Upload';

// 搜集工具所有模块
const collection = {
  [EToolModules.edit]: Edit,
  [EToolModules.void]: Void,
  [EToolModules.upload]: Upload,
  [EToolModules.mandatory]: Mandatory,
  [EToolModules.reIndex]: ReIndex,
};

interface IToolsGroup {
  renderDatas?: ToolsRenderDataModel[];
}

interface IToolsGroup extends FunctionComponent<any> {
  Tools: IToolsComponent;
  Void: any;
  Edit: ComponentType<IEdit> | any;
  Upload: IUpload;
  Mandatory: IMandatory;
  ReIndex: any;
}

const { REGISTERTOOLSDATA } = actions;

const ToolsGroup: IToolsGroup = () => {
  const dispatch = useDispatch();

  const [state, uDispatch] = callReducer({ renderDatas: toolsInit });

  const { toolsData, processInstanceId, ocrErrors, ocrDatas }: StateModel | any = useSelector(
    ({ documentManagement, DocumentOfOcrResultsController }: any) => ({
      toolsData: documentManagement.toolsData,
      processInstanceId: documentManagement.caseInfo.processInstanceId,
      ocrErrors: documentManagement.ocrErrors || [],
      ocrDatas: DocumentOfOcrResultsController.datas || [],
    })
  );

  useEffect(() => {
    // 将搜集到的工具模块中的数据注册到renderDatas集合
    uDispatch({
      type: REGISTERTOOLSDATA,
      payload: {
        toolsModules: collection,
      },
    });

    /**
     * 将void的unSelectable值设置为ture，即无论是否选中void按钮都不设置选中背景
     */
    // dispatch({
    //   type: 'documentManagement/updateToolData',
    //   payload: {
    //     toolId: 'void',
    //     dataKey: 'noSelectedStatus',
    //     dataVal: true,
    //   },
    // });

    return () => {};
  }, []);

  const handleToolClick = async (toolData: any) => {
    const { hold } = toolData;

    if (!hold) {
      await dispatch({
        type: 'documentManagement/selectToolItem',
        payload: toolData,
      });
    }

    switch (toolData?.toolId) {
      case 'delete':
        await dispatch({
          type: 'documentManagement/create',
        });
        break;
      case 'ocr':
        window.open(`/documentManage/ocrResults/${processInstanceId}`);
        break;
      default:
        break;
    }
  };

  const { renderDatas }: IToolsGroup = state || {};

  return (
    <Tools
      handleClick={handleToolClick}
      renderDatas={renderDatas}
      toolsData={toolsData || {}}
      ocrErrors={ocrErrors}
      ocrDatas={ocrDatas}
    />
  );
};

ToolsGroup.Tools = Tools;

ToolsGroup.Void = Void;

// @ts-ignore
ToolsGroup.Edit = Edit;

// @ts-ignore
ToolsGroup.Upload = Upload;

// @ts-ignore
ToolsGroup.Mandatory = Mandatory;

ToolsGroup.ReIndex = ReIndex;

export default ToolsGroup;
