import { Machine } from 'xstate';
import AuthLoadStatus from '@/auth/Constant/AuthLoadStatus';

const createAuthControlMachie = ({ id }: any) => {
  return Machine({
    id,
    initial: AuthLoadStatus.init,
    context: {
      taskId: '',
    },
    states: {
      [AuthLoadStatus.init]: {
        on: {
          load: {
            target: AuthLoadStatus.loading,
          },
        },
      },
      [AuthLoadStatus.loading]: {
        on: {
          done: {
            target: AuthLoadStatus.init,
          },
        },
      },
    },
  });
};

export default createAuthControlMachie;
