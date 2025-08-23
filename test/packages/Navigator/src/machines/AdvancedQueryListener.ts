import { Machine, assign } from 'xstate';
import SmartCircleSearchStatus from 'navigator/enum/SmartCircleSearchStatus';

const smartCircleSearchStatus = Machine({
  initial: SmartCircleSearchStatus.init,
  id: 'smartCircleSetAdvanced',
  context: {
    dataType: '',
    value: '',
  },
  states: {
    [SmartCircleSearchStatus.init]: {
      on: {
        loadEnd: {
          target: SmartCircleSearchStatus.loadEnd,
          actions: [
            assign({
              dataType: (context, event) => event?.dataType || '',
              value: (context, event) => event?.value || '',
            }),
          ],
        },
        trigger: {
          target: SmartCircleSearchStatus.tirggerAdvancedQueryEnd,
        },
        clear: {
          actions: [
            assign({
              dataType: '',
              value: '',
            }),
          ],
        },
      },
    },
    [SmartCircleSearchStatus.loadEnd]: {
      on: {
        reset: {
          target: SmartCircleSearchStatus.init,
          actions: [
            assign({
              dataType: '',
              value: '',
            }),
          ],
        },
      },
    },
    [SmartCircleSearchStatus.tirggerAdvancedQueryEnd]: {
      on: {
        reset: {
          target: SmartCircleSearchStatus.init,
          actions: [
            assign({
              dataType: '',
              value: '',
            }),
          ],
        },
        loadEnd: {
          target: SmartCircleSearchStatus.loadEnd,
          actions: [
            assign({
              dataType: (context, event) => event?.dataType || '',
              value: (context, event) => event?.value || '',
            }),
          ],
        },
      },
    },
  },
});

export default smartCircleSearchStatus;
