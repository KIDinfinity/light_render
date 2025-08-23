import { interpret } from 'xstate';
import AdvancedQueryListenerMachine from '../AdvancedQueryListener';
import SiderWorkSpaceControllerMachine from '../SiderWorkSpaceController';

const AdvancedQueryListener = interpret(AdvancedQueryListenerMachine);
AdvancedQueryListener.start();
const SiderWorkSpaceController = interpret(SiderWorkSpaceControllerMachine);
SiderWorkSpaceController.start();

export { AdvancedQueryListener, SiderWorkSpaceController };
