import type { FunctionComponent } from 'react';
import React from 'react';
import lodash from 'lodash';

import { tenant } from '@/components/Tenant';

import type { ToolsRenderDataModel, ToolsDataModel, ToolDataModel } from '../../_dto/model';
import type { ITool } from './ToolItem';
import ToolItem from './ToolItem';
import type { IToolWrap } from './ToolWrap';
import ToolWrap from './ToolWrap';
import type { IToolInit } from './ToolInit';
import ToolInit from './ToolInit';

import styles from './styles.less';

interface ITools {
  renderDatas?: ToolsRenderDataModel[];
  toolsData?: ToolsDataModel;
  handleClick: (e: any) => void;
  ocrErrors: any;
  ocrDatas?: any;
}

export interface IToolsComponent extends FunctionComponent<ITools> {
  ToolItem: FunctionComponent<ITool>;
  ToolWrap: FunctionComponent<IToolWrap>;
  ToolInit: FunctionComponent<IToolInit>;
}

const Tools: IToolsComponent = ({
  renderDatas,
  toolsData = {},
  handleClick,
  ocrErrors,
  ocrDatas,
}) => {
  return (
    <div className={styles.toolsGroup}>
      {lodash
        .chain(renderDatas)
        .filter((item: any) =>
          !!item.region ? lodash.includes(item.region, tenant.region()) : true
        )
        .filter((item: any) => !toolsData?.[item.toolId as string]?.noAuth)
        .filter((item: any) => {
          if (item.toolId === 'ocr') {
            return !lodash.isEmpty(ocrDatas);
          }
          return true;
        })
        .map((data: ToolsRenderDataModel, index: string) => {
          const toolData: ToolDataModel = toolsData?.[data.toolId as string] || {};
          return (
            <ToolItem
              renderData={data}
              toolData={toolData}
              handleClick={() => handleClick({ ...data, ...toolData })}
              // eslint-disable-next-line react/no-array-index-key
              key={`${data.toolId}-${index}`}
              ocrErrors={ocrErrors}
            />
          );
        })
        .value()}
    </div>
  );
};

Tools.ToolItem = ToolItem;
Tools.ToolWrap = ToolWrap;
Tools.ToolInit = ToolInit;

export default Tools;
