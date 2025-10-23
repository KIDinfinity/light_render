import { interpret } from 'xstate';
import createAuthControlMachie from '../createAuthControlMachine';

const informationAuthController = interpret(
  createAuthControlMachie({
    id: 'information-auth',
  })
);
const envoyAuthController = interpret(
  createAuthControlMachie({
    id: 'envoy-auth',
  })
);
informationAuthController.start();
envoyAuthController.start();

export { informationAuthController, envoyAuthController };
