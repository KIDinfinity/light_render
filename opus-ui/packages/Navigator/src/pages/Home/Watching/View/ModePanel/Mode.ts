import { ReactComponent as iconCard } from 'navigator/assets/icon-mode-card.svg';
import { ReactComponent as iconTable } from 'navigator/assets/icon-mode-table.svg';
import { ReactComponent as iconFlow } from 'navigator/assets/icon-mode-flow.svg';

enum Mode {
  Card = 'card',
  Table = 'table',
  Flow = 'flow',
  Search = 'search',
  Dashboard = 'dashboard'
}

const PI = 1.05;

const ModeAngle = {
  [Mode.Card]: { start: 0, end: PI, offset: [0, 0] },
  [Mode.Table]: { start: PI + 0.01, end: Math.PI - PI - 0.01, offset: [0, 1] },
  [Mode.Flow]: { start: Math.PI - PI + 0.01, end: Math.PI, offset: [-1, 1] },
};

const ModeIcon = {
  [Mode.Card]: iconCard,
  [Mode.Table]: iconTable,
  [Mode.Flow]: iconFlow,
};

module Mode {
  export function All() {
    return [Mode.Card, Mode.Table, Mode.Flow];
  }
}

export { Mode, ModeAngle, ModeIcon };

// -6 -45
