import type { ComponentType } from 'react';
import React, { useContext } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import DataContext from './DataContext';

/**
 * 包装组件以获取Context传递下来的属性
 *
 * 注意：
 * 在表单组件可编辑的情况下，
 * 不要用这个组件包装form组件，
 * 否则会导致form组件重新初始化（provider会触发所有的consumer子组件渲染,出现input光标自动跳到最后的异常现象）
 *
 *如下：

 错误的做法：
 const FormWraped = Form.create<IProps>({
  onFieldsChange(props, changedFields) {
  },
  mapPropsToFields(props: any) {
  },
 })(FormRegist({ nameSpace: 'caseSplitController' })(CaseSplit);

 export default connect(({ caseSplitController, caseSplitPolicyController, loading }: any) => ({
  originClaimEntities: caseSplitPolicyController.originClaimEntities,
 }))(withContextData(FormWraped));

 正确的做法：
 const FormWraped = Form.create<IProps>({
  onFieldsChange(props, changedFields) {
  },
  mapPropsToFields(props: any) {
  },
 })(FormRegist({ nameSpace: 'caseSplitController' })(withContextData(CaseSplit)));

 export default connect(({ caseSplitController, caseSplitPolicyController, loading }: any) => ({
  originClaimEntities: caseSplitPolicyController.originClaimEntities,
 }))(FormWraped);
 *
 *
 * @param WrappedComponent 被包装组件
 */
const withContextData = (WrappedComponent: ComponentType<any>) =>
  hoistStatics((props: any) => {
    const { uDispatch, uSelector, uStore, ...res } = useContext(DataContext);
    return (
      <WrappedComponent {...props} withData={res} useRedux={{ uDispatch, uSelector, uStore }} />
    );
  }, WrappedComponent);

export default withContextData;
