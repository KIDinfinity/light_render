import { Machine, interpret, send } from 'xstate';
import { Mode } from '../../View/ModePanel/Mode';

export enum Active {
  Active = 'active',
  InActive = 'inactive',
}

const modeButtonMachine = Machine({
  id: 'modeButton',
  type: 'parallel',
  states: {
    mode: {
      initial: Mode.Card,
      states: {
        card: {
          onExit: send('CLOSE'),
          on: { TABLE: Mode.Table, FLOW: Mode.Flow },
        },
        table: {
          onExit: send('CLOSE'),
          on: { CARD: Mode.Card, FLOW: Mode.Flow },
        },
        flow: {
          onExit: send('CLOSE'),
          on: { CARD: Mode.Card, TABLE: Mode.Table },
        },
      },
    },
    enterActive: {
      initial: Active.InActive,
      states: {
        active: { on: { TOGGLE: Active.InActive, CLOSE: Active.InActive } },
        inactive: { on: { TOGGLE: Active.Active, OPEN: Active.Active } },
      },
    },
  },
});

const modeButtonService = interpret(modeButtonMachine).start();

export default modeButtonService;
