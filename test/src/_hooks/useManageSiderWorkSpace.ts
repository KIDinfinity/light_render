import { useEffect } from 'react';
import { useDispatch } from 'dva';
import navigator from 'navigator/api';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let timer = 0;
    const tabSub = navigator.SiderWorkSpaceController.subscribe((state: any) => {
      timer = setTimeout(() => {
        dispatch({
          type: 'siderWorkSpace/setSiderState',
          payload: {
            activityTab: state?.value?.switch,
            expanderToggle: state?.value?.expanderToggle,
            siderToggle: state?.value?.siderToggle,
            showExpanderButton: state?.value?.expanderButtonDisplay,
            expanderAvailable: state?.value?.expanderAvailable,
          },
        });
      }, 0);
    });
    return () => {
      clearTimeout(timer);
      tabSub.unsubscribe();
    };
  }, []);
};
