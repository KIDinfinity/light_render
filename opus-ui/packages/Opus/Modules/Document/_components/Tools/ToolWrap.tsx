import type { FunctionComponent, ReactNode} from 'react';
import React, { isValidElement } from 'react';
import { Tooltip } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import type { TooltipPlacement } from './typings';

export interface IToolWrap {
  children?: ReactNode;
  title?: string;
  placement?: TooltipPlacement;
}

const ToolWrap: FunctionComponent<IToolWrap> = ({ title, children, placement = 'left' }) => (
  <Tooltip title={formatMessageApi({ Label_BPM_Button: title })} placement={placement}>
    {isValidElement(children) ? children : formUtils.queryValue(children)}
  </Tooltip>
);

export default ToolWrap;
