import Category from './Category';

// 调取权限配置

export default {
  // 跳转taskDetail
  VisitTask: [Category.taskView],
  // 首页/高级查询点击task
  ClickTask: [
    Category.taskView,
    Category.taskEdit,
    Category.infoView,
    Category.infoEdit,
    Category.envoyView,
    Category.envoyEdit,
    Category.envoySend,
  ],
  // assignTask
  AssignTask: [
    Category.assignSelf,
    Category.assignOthers,
    Category.beAssigned,
    Category.assignOtherstoSelf,
  ],
  // TaskDetail 挂载
  InitTask: [
    Category.taskView,
    Category.taskEdit,
    Category.infoView,
    Category.infoEdit,
    Category.envoyView,
    Category.envoyEdit,
    Category.envoySend,
  ],
  // 权限assigner校验
  authAssignee: [Category.taskEdit, Category.envoyEdit, Category.envoySend],
  // infomation 挂载
  InfoManage: [Category.infoView, Category.infoEdit],
  // envoy 挂载
  EnvoyManage: [Category.envoyView, Category.envoyEdit, Category.envoySend],
};
