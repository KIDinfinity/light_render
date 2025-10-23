import lodash from 'lodash';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';
import getErrorNode from './getErrorNode';

const handleToError = (node: any) => {
  const currentRef = lodash.get(node, 'ref');
  if (currentRef && currentRef.focus) {
    currentRef.focus();
  }
  if (lodash.has(currentRef, 'props.onFocus')) {
    currentRef.props.onFocus();
  }
  if (lodash.has(currentRef, 'props.onVisibleFocus')) {
    currentRef.props.onVisibleFocus();
  }
};

const scrollToError = async (errorRefs: any) => {
  const result = await getErrorNode(errorRefs);
  const node = lodash.get(result, 'node');
  if (node) {
    scrollIntoView(node, {
      scrollMode: 'if-needed',
      block: 'center',
      inline: 'center',
    }).then(() => handleToError(result));
  }
};

export default scrollToError;
