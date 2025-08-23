import lodash from 'lodash';
import OrderDirection from '../enum/orderDirection';
import findNextActive from './findNextActive';
import Shortcutkey from '../enum/shortcutkey';
import { HotkeyHomeIds } from '../../common/enum/hotkeyIds';

interface IProps {
  list: any;
  order: OrderDirection;
}

export default ({ list = [], order }: IProps) => {
  let nextActive: any = {};

  const filter = (item: any) => {
    if (item.active) {
      const activedSection = lodash.find(item.sections, 'active');
      if (activedSection && activedSection.fields) {
        return true;
      }
    }

    return false;
  };

  return (
    lodash
      .chain(list)
      // filter - need revert
      .filter(filter)
      // field - nextActive - 只有一条数据
      .map((item: any) => {
        nextActive =
          findNextActive(
            lodash.chain(item).get('sections').find('active').get('fields').value(),
            lodash.chain(item).get('sections').find('active').get('fields').find('active').value(),
            nextActive,
            order
          ) || {};

        return item;
      })
      // field - active
      .map((item: any) => {
        return {
          ...item,
          sections: lodash.map(item.sections, (s) => {
            return {
              ...s,
              fields: lodash.map(s.fields, (f) => {
                return {
                  ...f,
                  active: f.id === nextActive.id ? 1 : 0,
                };
              }),
            };
          }),
        };
      })
      // field - focus
      .map((item: any) => {
        const activeSection: any = lodash.chain(item).get('sections').find('active').value();

        if (lodash.isArray(activeSection.fields) && activeSection.fields.length === 0) {
          // section里的fields通过section上的方法控制

          if (order === OrderDirection.Next && lodash.isFunction(activeSection.next)) {
            activeSection.next();
          } else if (order === OrderDirection.Prev && lodash.isFunction(activeSection.prev)) {
            activeSection.prev();
          }
        } else {
          lodash
            .chain(item)
            .get('sections')
            .find('active')
            .get('fields')
            .map((f: any) => {
              if (f.active) {
                if (
                  lodash.isFunction(f.action) &&
                  (!f.keyboard ||
                    f.keyboard === Shortcutkey.FieldNext ||
                    f.keyboard === Shortcutkey.FieldPrev)
                ) {
                  // file跳转处理
                  // 使用setTimeout解决在reducer中调用effect;
                  setTimeout(() => {
                    f.action();
                  }, 0);
                }

                if (order === OrderDirection.Next && lodash.isFunction(f.next)) {
                  f.next();
                } else if (order === OrderDirection.Prev && lodash.isFunction(f.prev)) {
                  f.prev();
                }
              } else {
                // 这里card模式需要触发事件，逻辑待优化
                if (
                  f.id == HotkeyHomeIds.HomeWatchingSwiper ||
                  f.id == HotkeyHomeIds.HomeWatchingFilterItem
                ) {
                  if (order === OrderDirection.Next && lodash.isFunction(f.next)) {
                    f.next();
                  } else if (order === OrderDirection.Prev && lodash.isFunction(f.prev)) {
                    f.prev();
                  }
                }
              }
            })
            .value();
        }

        return item;
      })
      // filter revert -- TODO order
      .concat(list.filter((item: any) => !filter(item)))
      .value()
  );
};
