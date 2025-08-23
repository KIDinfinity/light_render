import React, { useState, useEffect } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import classNames from 'classnames';
import styles from './HotHighLight.less';

declare const window: any;

/**
 *
 * @children 渲染的子组件
 * @module 传入单个或数组多个modele string||string[] 优先
 * @section 传入单个或数组多个section string||string[]
 * @condition 传入单个module或一组module、section、额外判断条件 string||[string,string,boolean?]
 * @exCondition 额外判断条件 boolean
 * @classname 传入的类名 any
 * @custom 自定义判断方式 any 最优先
 * @parent 父元素 主要是添加样式
 * @children 子元素
 */
export default function HotHighlight({
  module,
  section,
  condition,
  exCondition,
  childrenClass,
  parentClass,
  custom,
  parent,
  children,
}: any) {
  const [oneFocus, setOneFocus] = useState(false);
  const [count, setCount] = useState(0);
  const selectModule = useSelector((state: any) => state.hotkey.selectModule);
  const selectSection = useSelector((state: any) => state.hotkey.selectSection);
  let moduleFocus: any;
  let activeFocus;
  const arrOne = (array: any) => {
    return (
      (lodash.isArray(array) && array.length === 1) || (lodash.isString(array) && array.length > 0)
    );
  };

  if (custom) {
    moduleFocus = custom;
    activeFocus = custom;
  } else if (module) {
    // module、section为长度为1的数组或者字符串
    if (arrOne(module) && arrOne(section)) {
      moduleFocus =
        selectModule === (module[0].length === 1 ? module : module[0]) &&
        selectSection === (section[0].length === 1 ? section : section[0]);
    }
    // module为长度为1的数组或者字符串 section为空
    else if (arrOne(module) && lodash.isEmpty(section)) {
      moduleFocus = selectModule === (module[0].length === 1 ? module : module[0]);
    }
    // module为长度大于1的数组
    else if (lodash.isArray(module) && lodash.isArray(section)) {
      module.forEach((item, index) => {
        if (parseInt(index) === 0) {
          moduleFocus = selectModule === module[index] && selectSection === section[index];
        } else {
          moduleFocus =
            moduleFocus ||
            (section[index]
              ? selectModule === module[index] && selectSection === section[index]
              : selectModule === module[index]);
        }
      });
    }
    activeFocus = moduleFocus;
    // 存在额外判断条件
    if (exCondition !== undefined) {
      activeFocus = moduleFocus && exCondition;
    }
  } else if (condition) {
    // condition为长度为1的数组或者字符串 section为空
    if (arrOne(condition)) {
      moduleFocus = selectModule === (condition[0].length === 1 ? condition : condition[0]);
    } else if (lodash.isArray(condition)) {
      moduleFocus = selectModule === condition[0] && selectSection === condition[1];
      if (condition.length === 3) {
        moduleFocus = moduleFocus && condition[2];
      }
    }
    activeFocus = moduleFocus;
    // 存在额外判断条件
    if (exCondition !== undefined) {
      activeFocus = moduleFocus && exCondition;
    }
  }

  useEffect(() => {
    let timeout: any;

    if (moduleFocus && count <= 1) {
      setCount((state) => (state += 1));
      timeout = window.setTimeout(() => {
        setOneFocus(true);
      }, 1000);
    }

    if (!moduleFocus && count !== 0) {
      setCount(0);
      setOneFocus(false);
    }

    return () => {
      if (timeout) {
        window.clearTimeout(timeout);
      }
    };
  }, [moduleFocus]);

  return (
    <>
      {parent ? (
        <div
          {...parent}
          key={parent?.key}
          className={classNames({
            [parent.className]: true,
            [parentClass ? (parentClass as string) : styles.parentActiveFocus]:
              activeFocus && !oneFocus,
          })}
        >
          <div
            className={classNames({
              [childrenClass ? (childrenClass as string) : styles.activeFocus]:
                activeFocus && !oneFocus,
            })}
          />
          {children}
        </div>
      ) : (
        <>
          <div
            className={classNames({
              [childrenClass ? (childrenClass as string) : styles.activeFocus]:
                activeFocus && !oneFocus,
            })}
          />
          {children}
        </>
      )}
    </>
  );
}
