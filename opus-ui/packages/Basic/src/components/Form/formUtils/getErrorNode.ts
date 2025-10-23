import lodash from 'lodash';
import ReactDOM from 'react-dom';
import isChildOf from '@/utils/isChildOf';

const getErrorNode = async (dispatch: any) => {
  const refs = await dispatch({
    type: 'formCommonController/getErrorRefs',
  });
  const refNodes = lodash.map(refs, (item, key) => ({
    id: key,
    // eslint-disable-next-line react/no-find-dom-node
    domNode: ReactDOM.findDOMNode(item),
  }));
  // const nodes = document.querySelectorAll('.errorIconPoint');
  let node = lodash
    .chain(refNodes)
    .map((item: any) => {
      const coordinate = item.domNode.getBoundingClientRect();
      return {
        node: item.domNode,
        ref: refs[item.id],
        x: coordinate.x,
        y: coordinate.y,
      };
    })
    .filter((item) => !(item.x === 0 && item.y === 0))
    .sortBy(['y', 'x'])
    .get(0)
    .value();

  if (!node) {
    node = lodash
      .chain(refNodes)
      .map((item: any) => {
        const coordinate = item.domNode.getBoundingClientRect();
        return {
          node: item.domNode,
          ref: refs[item.id],
          x: coordinate.x,
          y: coordinate.y,
        };
      })
      .sortBy(['y', 'x'])
      .get(0)
      .value();

    if (node) {
      // 1、input一定是data-error-scroll-content的子元素
      // 2、通过data-error-scroll-content找到对应data-error-scroll-entry
      // 3、data-error-scroll-entry一定是data-error-scroll-content-1的子元素
      // 4、通过data-error-scroll-content-1找到对应的data-error-scroll-entry1
      // 5、点击data-error-scroll-entry1
      // 6、点击data-error-scroll-entry

      // @ts-ignore
      let enter;
      // 1
      Array.prototype.forEach.call(
        document.querySelectorAll('[data-error-scroll-content]'),
        (element) => {
          if (isChildOf(node?.node, element)) {
            // 2
            Array.prototype.forEach.call(
              document.querySelectorAll('[data-error-scroll-enter]'),
              (elementEnter) => {
                if (
                  elementEnter.getAttribute('data-error-scroll-enter') ===
                  element.getAttribute('data-error-scroll-content')
                ) {
                  enter = elementEnter;
                }
              }
            );
          }
        }
      );

      let enter1;
      // 3
      Array.prototype.forEach.call(
        document.querySelectorAll('[data-error-scroll-content-1]'),
        (element) => {
          // @ts-ignore
          if (isChildOf(enter, element)) {
            // 4
            Array.prototype.forEach.call(
              document.querySelectorAll('[data-error-scroll-enter-1]'),
              (elementEnter) => {
                if (
                  elementEnter.getAttribute('data-error-scroll-enter-1') ===
                  element.getAttribute('data-error-scroll-content-1')
                ) {
                  enter1 = elementEnter;
                }
              }
            );
          }
        }
      );

      // @ts-ignore
      enter1?.click?.();
      // @ts-ignore
      enter?.click?.();

      // secondContent.forEach((element) => {
      //   if (isChildOf(node?.node, element)) {
      //     Array.prototype.forEach.call(
      //       document.querySelectorAll('[data-error-scroll-enter]'),
      //       (elementEnter) => {
      //         if (
      //           elementEnter.getAttribute('data-error-scroll-enter') ===
      //           element.getAttribute('data-error-scroll-content')
      //         ) {
      //           elementEnter.click();
      //         }
      //       }
      //     );
      //   }
      // });

      // Array.prototype.forEach.call(
      //   document.querySelectorAll('[data-error-scroll-content]'),
      //   (element) => {
      //     if (isChildOf(node?.node, element)) {
      //       Array.prototype.forEach.call(
      //         document.querySelectorAll('[data-error-scroll-enter]'),
      //         (elementEnter) => {
      //           if (
      //             elementEnter.getAttribute('data-error-scroll-enter') ===
      //             element.getAttribute('data-error-scroll-content')
      //           ) {
      //             elementEnter.click();
      //           }
      //         }
      //       );
      //     }
      //   }
      // );
    }
  }

  return node;

};

export default getErrorNode;
