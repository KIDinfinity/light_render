/**
 * 枚举 - 操作类型类型
 */
enum CommandName {
  REMOVE = 'remove',
  ADD = 'add',
  JoinNode = 'joinNode',
  DragEdge = 'dragEdge',
  DragAddEdge = 'drag-add-edge',
  NodeDrapUdateEdge = 'node-drag-update-edge',
  NodeDragAddEdge = 'node-drag-add-edge',
}

export default CommandName;
