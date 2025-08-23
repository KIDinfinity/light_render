import { Machine, interpret, send } from 'xstate';

const homeModeBtnMachine = Machine({
  id: 'home',
  type: 'parallel',
  states: {
    mode: {
      initial: 'card',
      states: {
        card: {
          onExit: send('CLOSE'),
          on: { TABLE: 'table', FLOW: 'flow' },
        },
        table: {
          onExit: send('CLOSE'),
          on: { CARD: 'card', FLOW: 'flow' },
        },
        flow: {
          onExit: send('CLOSE'),
          on: { CARD: 'card', TABLE: 'table' },
        },
      },
    },
    btnExpand: {
      initial: 'inactive',
      states: {
        active: { on: { TOGGLE: 'inactive', CLOSE: 'inactive' } },
        inactive: { on: { TOGGLE: 'active', OPEN: 'active' } },
      },
    },
  },
});

const homeModeBtnService = interpret(homeModeBtnMachine).start();

export default homeModeBtnService;
