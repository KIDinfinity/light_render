# useAbortController

## AbortController Hook

### 用法

```tsx
import React from 'react';
import { useDispatch } from 'dva';
import useAbortController from '@/hooks/useAbortController';

export default ({ children }: any) => {
  const dispatch = useDispatch();
  
  const signal = useAbortController([localProcessInstanceId, enableGetDetial]);

  useEffect(() => {
    if (localProcessInstanceId && enableGetDetial) {
      (async () => {
        const response = await remoteGetTaskDetail({ processInstanceId: localProcessInstanceId }, signal);
        setLocalTaskId(response?.taskId);
        setLocalTaskDetail(response);
      })();
    }
  }, [signal]);

  return children;

};
```
