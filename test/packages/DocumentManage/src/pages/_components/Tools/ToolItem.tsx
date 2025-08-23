// React.isValidElement<{ className?: string }>(icon)
import type { FunctionComponent} from 'react';
import React, { isValidElement } from 'react';
import lodash from 'lodash';
import classNames from 'classnames';
import { isReactElement } from '@/utils/utils';
import { ReactComponent as ErrorSvg } from 'claim/assets/error.svg';
import type { ToolsRenderDataModel, ToolDataModel } from '../../_dto/model';
import { Tooltip, Icon, Button } from 'antd';
import type { TooltipPlacement } from './typings';
import ToolWrap from './ToolWrap';
import { picturePath } from '../../_regExp';

import styles from './styles.less';

export interface ITool {
  renderData?: ToolsRenderDataModel;
  className?: string;
  placement?: TooltipPlacement;
  toolData?: ToolDataModel;
  handleClick: (e: any) => void;
  ocrErrors: any;
}

const ToolItem: FunctionComponent<ITool> = ({
  renderData,
  className,
  placement,
  toolData,
  handleClick,
  ocrErrors,
}) => {
  const { title, icon, toolId = '', replacer: ReplacerComponent } = renderData || {};
  const { disabled, selected, noSelectedStatus } = toolData || {};

  let IconCurrent = icon;
  let isEle = false;
  let iconElement = null;
  if (lodash.isArray(icon)) {
    IconCurrent = selected ? icon?.[1] : icon?.[0];
  }

  let titleCurrent = title;
  if (lodash.isArray(title)) {
    titleCurrent = selected ? title?.[1] : title?.[0];
  }

  // 处理icon 是react 组件（类组件或函数组件）情况
  const funComponent = lodash.isFunction(IconCurrent) && IconCurrent({});
  if (lodash.isObject(IconCurrent)) {
    const { $$typeof, render }: any = lodash.pick(IconCurrent, ['$$typeof', 'render']);
    const isReactComponent =
      ($$typeof &&
      lodash.isFunction(render)) ||
        // @ts-ignore
        IconCurrent?.prototype?.isReactComponent || // 类组件
        isReactElement(funComponent); // 函数组件
    // @ts-ignore
    iconElement = isReactComponent ? <IconCurrent /> : IconCurrent;
  }

  // 处理是图片资源的情况
  const isPicture = picturePath.test(IconCurrent as string);
  if (lodash.isString(IconCurrent) && isPicture) {
    iconElement = <img src={IconCurrent} alt="icon_tool" width={12} />;
  }

  if (!icon && lodash.isString(title)) {
    iconElement = (
      <div className={styles.titleWrap}>
        {!lodash.isEmpty(ocrErrors) ? (
          <Tooltip
            placement="rightBottom"
            title={
              <div>
                {ocrErrors.map((el: any) => (
                  <p>{el.content}</p>
                ))}
              </div>
            }
          >
            {title}
            <Icon className={styles.errorIcon} component={ErrorSvg} />
          </Tooltip>
        ) : (
          title
        )}
      </div>
    );
  }
  isEle = isValidElement<{ className?: string }>(iconElement);

  const props = {
    icon: !isEle && lodash.isString(IconCurrent) && !isPicture ? IconCurrent : '', // 当icon是antd支持的icon图标mark字符串的情况
    children: isEle ? iconElement : null,
    disabled,
    onClick: handleClick,
    className: classNames(
      styles.toolItem,
      styles[toolId],
      disabled && `${styles.toolItem}-disabled`,
      selected && !noSelectedStatus && `${styles.toolItem}-selected`,
      className
    ),
  };

  return (
    <ToolWrap title={titleCurrent} placement={placement}>
      {}
      {ReplacerComponent ? (
        <ReplacerComponent tooldata={{ ...renderData, ...toolData }} {...props} />
      ) : (
        <Button {...props}>{isEle && iconElement}</Button>
      )}
    </ToolWrap>
  );
};

export default ToolItem;
