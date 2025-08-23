import { Component } from 'react';
import { connect } from 'dva';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import ItemTypes, { getNativeElememt } from './ItemTypes';

const rowSource = {
  beginDrag(props, monitor, component) {
    const { index, sourcetype, record, setTaskId, dispatch, children } = props;
    dispatch({
      type: 'contactsAssigneeList/openAssigneeList',
      payload: {
        taskDetail: record,
      },
    });
    dispatch({
      type: 'contactsAssigneeList/getAssigneeList',
      payload: {
        taskDetail: record,
      },
    });
    dispatch({
      type: 'contactsAssigneeList/save',
      payload: {
        ProviderSetTaskId: setTaskId,
        assignSourceType: sourcetype,
      },
    });
    dispatch({
      type: 'chatController/changeSearchVisibleReducer',
      payload: {
        showSearchVisible: true,
      },
    });
    const { clientWidth, clientHeight } = component.NativeNode;

    return { index, sourcetype, children, width: clientWidth, height: clientHeight };
  },
  endDrag(props) {
    const { dispatch, sourcetype, index } = props;

    // 在 /packages/Navigator/src/pages/Messager/ContactsAssigneeListItem.tsx 已有松开拖拽事件 无需重复
    // Assineelist隐藏 （isAssigneeListVisible设为false）
    dispatch({
      type: 'contactsAssigneeList/closeAssigneeList',
    });

    return {
      sourcetype,
      index,
    };
  },
};
@connect()
@DragSource(ItemTypes.ASSIGNEE, rowSource, (connectGrag, monitor) => ({
  connectDragSource: connectGrag.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connectGrag.dragPreview(),
}))
class TaskDragAssign extends Component {
  componentDidMount() {
    // 取消默认的Preview样式
    const { connectDragPreview } = this.props;
    if (connectDragPreview) {
      connectDragPreview(getEmptyImage(), {
        captureDraggingState: true,
      });
    }
  }

  getDraggingRef = (ref) => {
    this.NativeNode = ref;
  };

  render() {
    const {
      connectDragSource,
      connectDragPreview,
      sourcetype,
      children,
      isDragging,
      dispatch,
      index,
      ...res
    } = this.props;

    return connectDragSource(
      getNativeElememt({ sourcetype, children, index, isDragging, ...res }, this.getDraggingRef)
    );
  }
}

export default TaskDragAssign;
