/*
 * @Descripttion: aciton - 配置中的默认事件
 * @Author: jack_huang
 * @Date: 2019-11-28 10:57:27
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-11-28 11:33:46
 */
import lodash from 'lodash';
import hotkeys from 'hotkeys-js';

interface IComponentProps {
  configs: any;
  dispatch: any;
}

/**
 * binding keyboard with the action of redux
 *
 * @param {*} { config, dispatch }
 */
export default ({ configs, dispatch }: IComponentProps) => {
  lodash
    .chain(configs)
    // Must have config item of keyboard
    .filter((item: any) => item.keyboard)
    .map(({ keyboard, actionName }: any) => {
      // TODO，会不会相同的keyboard，有不同的actionName
      if (actionName) {
        hotkeys(keyboard, (event: any) => {
          event.preventDefault();
          dispatch({
            type: actionName,
          });
        });
      }
    })
    .value();
};
