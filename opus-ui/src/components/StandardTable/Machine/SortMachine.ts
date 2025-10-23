import { Machine } from 'xstate';

const SortMachine = Machine({
  id: 'sorter',
  states: {
    undefined: {
      on: {
        NEXT: 'asc',
      },
    },
    asc: {
      on: {
        NEXT: 'desc',
      },
    },
    desc: {
      on: {
        NEXT: 'undefined',
      },
    },
  },
});

export default SortMachine;
