
# Upgrade umi from v3 to v4

1. package.json
-    "@umijs/preset-react": "1.5.3",
-    "@umijs/test": "^3.4.10",
-    "umi": "^3.2.14",

+    "@umijs/max": "4.0.88",
+    "@types/node": "^18.11.11",

script 
umi dev => max dev

2. *.less 

-   top: 8px + @font-size-base * @line-height-base / 2 - @font-size-base / 2;
+   top: ~"calc(8px + @font-size-base * @line-height-base / 2 - @font-size-base / 2)";

-   margin-bottom: max(0, @form-item-margin-bottom - @form-explain-height - @form-help-margin-top);
+   margin-bottom: ~"calc(max(0, @form-item-margin-bottom - @form-explain-height - @form-help-margin-top))";

-   margin-bottom: @form-item-margin-bottom - @form-explain-height - @form-help-margin-top;
+   margin-bottom: calc(@form-item-margin-bottom - @form-explain-height - @form-help-margin-top);

-   @font-scale: unit(@size / 12px);
+   @font-scale: unit((@size / 12px));

-    margin: -@table-padding-vertical-md -@table-padding-horizontal / 2 -@table-padding-vertical-md -
-      1px;
+    margin: ~"calc(-@table-padding-vertical-md -@table-padding-horizontal / 2 -@table-padding-vertical-md - 1px)";

-   @var: round(unit(@px / @width) * 100, 4);
+   @var: round((unit(@px / @width) * 100), 4);


3. g6-editor 

-   import {v4 as uuidv4 } from 'uuid';
+   import { v4 as uuidv4 } from 'uuid';

4. Venus-UI/node_modules/@umijs/plugins/libs/dva.tsx

```
   import React from 'react';
// @ts-ignore
import { create, saga, utils } from 'dva-core';
import {
  connect,
  Provider,
  useDispatch,
  useSelector,
  useStore,
  shallowEqual
} from 'react-redux';
export { bindActionCreators } from 'redux';
export { create, saga, utils };
export { connect, Provider, useDispatch, useSelector, useStore, shallowEqual };

import * as router from 'react-router-dom';
export { router };

export default function dva(opts: any) {
  const app = create(opts, {
    initialReducer: {},
    setupApp() {},
  });
  const oldAppStart = app.start;
  app.router = router;
  app.start = start;
  return app;

  function router(router: any) {
    app._router = router;
  }

  function start(elem: any) {
    // old dva.start() supports passing arguments
    if (typeof elem !== 'undefined') {
      throw new Error('dva.start() should not be called with any arguments.');
    }
    if (!app._store) {
      oldAppStart.call(app);
    }
    const store = app._store;
    const router = app._router;
    return (extraProps: any) => {
      return (
        <Provider store={store}>{router({ app, ...extraProps })}</Provider>
      );
    };
  }
}

```

5. Venus-UI/packages/Claim/src/pages/Thailand/ProcessOfDA/DAOfAssessment/ClaimResult/AssessmentHandle.tsx

    remove withRouter


6. Venus-UI/packages/Navigator/src/pages/Home/Watching/View/Card/swiper.config.ts

    remove Mousewheel

7. Venus-UI/src/components/Authorized/AuthorizedRoute.tsx

    update Redirect to Nagigate

8. Venus-UI/src/pages/User/ResetPW.tsx

    history.push('/user/login');
    // dispatch(routerRedux.push('/user/login'));

9. Venus-UI/src/utils/emitter.ts

    const emitter = new EventEmitter();

    emitter.setMaxListeners(12);



10. import(.*?),?shallowEqual,?(.*?)from 'dva';

11. immer

12. object-to-formdata

13. uuid

14. react-dom

// Before
import { render } from 'react-dom';
const container = document.getElementById('app');
render(<App tab="home" />, container);

// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);