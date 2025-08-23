import React, { Component } from 'react';
import lodash from 'lodash';
import classNames from 'classnames';
import { DragSource, DropTarget } from 'react-dnd';
import styles from './index.less';

const ItemType = 'drop';

interface IProps {
  connectDragPreview: any;
  connectDragSource: any;
  connectDropTarget: any;
  sourcetype: any;
  isDragging: any;
  record: any;
  index: any;
  className: string;
  isOver: boolean;
}

const sortSeq = (type: string) => (eleA: any, eleB: any) => {
  if (eleA[type] === eleB[type]) return 0;
  if (eleA[type] === null || eleA[type] === undefined) return 1;
  if (eleB[type] === null || eleB[type] === undefined) return -1;
  return Number(eleA[type]) < Number(eleB[type]) ? -1 : 1;
};
let hoverId: any = null;

const getNewArray = ({ array, draggedId, id, sortKey }: any) => {
  const draggedIdx = lodash.findIndex(array, { id: draggedId });
  const newIdx = lodash.findIndex(array, { id });
  return array
    .map((item: any, index: number) => ({
      ...item,
      [sortKey]: index,
    }))
    .map((item: any, index: number) => {
      let idx = index;
      if (index === draggedIdx) {
        idx = newIdx;
      } else if (newIdx > draggedIdx && index > draggedIdx && index <= newIdx) {
        idx = index - 1;
      } else if (newIdx < draggedIdx && index >= newIdx && index <= draggedIdx) {
        idx = index + 1;
      }
      return {
        ...item,
        [sortKey]: idx,
      };
    })
    .sort(sortSeq(sortKey));
};

const rowSource: any = {
  beginDrag(props: any) {
    const { record } = props;
    return { ...record };
  },
  isDragging(props: any, monitor: any) {
    return props?.record?.id === monitor.getItem().id;
  },
  endDrag(props: any) {
    const { record } = props;
    return { ...record };
  },
};

class DnD extends Component<IProps> {
  render() {
    const {
      connectDragSource,
      connectDragPreview,
      connectDropTarget,
      children,
      isDragging,
      className,
    } = this.props;
    const style = {
      width: '100%',
      cursor: 'move',
      opacity: isDragging ? 0.45 : 1,
      border: '1px dashed transparent',
    };

    return connectDragPreview(
      connectDropTarget(
        connectDragSource(
          <div
            style={style}
            className={classNames(className, {
              [styles.isDragging]: isDragging,
            })}
          >
            {children}
          </div>
        )
      )
    );
  }
}

const target = {
  canDrop(props: any, monitor: any) {
    const { id: draggedId } = monitor.getItem();
    const {
      record: { id: dropId },
    } = props;
    if (draggedId === dropId) return false;
    if (!monitor.isOver({ shallow: true })) return false;
    return true;
  },
  hover(props: any, monitor: any) {
    const { id: draggedId } = monitor.getItem();
    const {
      record: { id },
      array,
      sortKey = 'componentSequence',
      onSort,
    } = props;
    if (hoverId !== id) {
      hoverId = id;
      const newArray = getNewArray({ array, draggedId, id, sortKey });
      if (onSort) {
        onSort(newArray);
      }
    }
  },
  drop(props: any, monitor: any) {
    const { id: draggedId } = monitor.getItem();
    const {
      record: { id },
      array,
      sortKey = 'componentSequence',
      onSort,
    } = props;
    const newArray = getNewArray({ array, draggedId, id, sortKey });
    if (onSort) {
      onSort(newArray);
    }
    return undefined;
  },
};

export default DropTarget(ItemType, target, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource(ItemType, rowSource, (connectGrag, monitor) => ({
    isDragging: monitor.isDragging(),
    connectDragSource: connectGrag.dragSource(),
    connectDragPreview: connectGrag.dragPreview(),
  }))(DnD)
);
