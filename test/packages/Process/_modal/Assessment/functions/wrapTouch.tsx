import React from 'react';
import { Spin } from 'antd';
import styles from 'bpm/pages/OWBEntrance/Sider/Loading.less';
import { createRoot } from 'react-dom/client';

interface option {
  showLoading?: boolean;
  onCancel?: (action: any, effects: any) => Generator;
}
// touch的getConfirmData比较特殊，如果流程中后端返回warning需要user做额外决定，在user选了button继续轮询时，当前的流程会call下一轮getConfirmData（进行下一轮轮询），然后当前effect会立刻结束。
// 如果按照正常的做法，那么会出现一个场景：在第二轮轮询在执行过程中，第一轮轮询结束了，这虽然不会直接中止第二轮轮询，但会导致stopAutoSave的状态不正确（包括loading的状态，但getConfirmData不用loading）
// 所以为了处理这一类情况，需要添加一个额外的计数器，处理同时有多个轮询在执行的问题。
let wrapperCount = 0;
// 这是为了正确处理一种潜在的情况：一个有loading的wrapper和一个没loading的wrapper同时在跑
// 虽然这种情况不应当发生：一个流程要么都用带loading的wrap，要么都不用。但不能排除因为一些特殊的需求，或者使用者的疏忽导致这种情况
// 在这种情况下，我们会在最后一个带loading的wrapper退出后关闭loading，即便还有不带loading的wrapper在跑
let wrapperLoadingCount = 0;
// 需要注意的是，如果脱离当前页面，它只能cancel当前的effect。如果当前effect已经put出去了别的effect，则不会受到影响。
// 所以如果业务逻辑进到了别的effect，并且是在别的effect内的异步逻辑做的覆盖，那么别的effect也需要包裹wrapTouch
// 这是为了处理这样一种情况： A effect -> put B effect -> B effect pending(waiting for api) -> user switch case -> cancel A effect (B effect unaffected) -> api complete -> overwrite wrong case

//需要额外注意的是，如果被中止了，不会返回原本的返回结果，而是返回一个false，如果有onCancel，则返回onCancel的结果
export default (effect, option: option = {}) => {
  const { showLoading, onCancel } = option || {};
  return function* (action, effects) {
    let container;
    const body = document.querySelector('body');
    if (showLoading && body) {
      wrapperLoadingCount++;
      container = document.createElement('div');
      body.appendChild(container);
      const loadingRoot = createRoot(container);
      loadingRoot.render(
        <div className={styles.spin}>
          <Spin />
        </div>
      );
    }
    // 虽然理论上来说会和action的stopAutoSave存在交叉影响的问题（假设两个都进入stop的状态，然后其中一个先退出了，按需求来说stopAutoSave应当还是true，但实际上会变成false）
    // 但action和这里都会为页面添加loading，因此这种情况不会发生（操作了一边之后，在结束之前不能操作另一边）
    yield effects.put({
      type: 'processTask/save',
      payload: { stopAutoSave: true },
    });
    const taskId = yield effects.select((state) => state.processTask.getTask?.taskId);
    function* taskListener() {
      while (true) {
        const reducerAction = yield effects.take('processTask/save');
        const nextTask = reducerAction?.payload?.getTask;
        if (nextTask && (!nextTask.taskId || nextTask.taskId !== taskId)) {
          break;
        }
      }
      if (onCancel) {
        return yield onCancel(action, effects);
      }

      return false;
    }
    wrapperCount++;
    const result = yield effects.race([effect(action, effects), taskListener()]);
    if (showLoading) {
      wrapperLoadingCount--;
      if (wrapperLoadingCount <= 0 && body && container) body.removeChild(container);
    }

    wrapperCount--;
    if (wrapperCount <= 0) {
      yield effects.put({
        type: 'processTask/save',
        payload: { stopAutoSave: true },
      });
    }

    return result?.[0] || result?.[1];
  };
};
