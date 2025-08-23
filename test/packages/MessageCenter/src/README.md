---
tag: packages/MessageCenter/components
order: 1
title: MessageCenter
group:
    title: MessageCenter
nav:
    title: packages
---

# MessageCenter

# 使用者代码示例

```tsx
import { useContext, useEffect } from 'react';
import { filter } from 'rxjs/operators';
import { LifeCircle, PurposeCode, IData, MCContext } from '@mc';

export default () => {
  const { subject, replaySubject } = useContext(MCContext);

  useEffect(() => {
    const subscription = subject.subscribe(({ lifeCircle, data }: IData) => {
      // TODO
    });

    const subscription1 = replaySubject
      .pipe(
        filter(
          ({ lifeCircle, data }) =>
            lifeCircle === LifeCircle.OnMessage && data.type === PurposeCode.NewChatMessage
        )
      )
      .subscribe(({ data }: IData) => {
        // TODO
      });

    return () => {
      subscription.unsubscribe();
      subscription1.unsubscribe();
    };
  }, []);

  return null;
};
```
