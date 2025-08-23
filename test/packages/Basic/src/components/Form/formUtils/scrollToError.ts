import getErrorNode from './getErrorNode';
import lodash from 'lodash';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';

const handleToError = (node: any) => {
  const currentRef = lodash.get(node, 'ref');
  if (currentRef && currentRef.focus) {
    currentRef.focus();
  }
  if (lodash.has(currentRef, 'props.onVisibleFocus')) {
    currentRef.props.onVisibleFocus();
  }
};

const scrollToError = async (dispatch: any) => {
  const result = await getErrorNode(dispatch);
  const node = lodash.get(result, 'node');
  if (node) {
    scrollIntoView(node, {
      scrollMode: 'if-needed',
      block: 'center',
      inline: 'center',
    }).then(() => handleToError(result));
    // const scroller = new Promise(resolve => {
    //   scrollIntoView(node, {
    //     behavior: 'smooth',
    //     scrollMode: 'if-needed',
    //     block: 'center',
    //     inline: 'center',
    //   })
    //   resolve()
    // })
    // scroller.then(() => handleToError(result))
  }
};

export default scrollToError;
