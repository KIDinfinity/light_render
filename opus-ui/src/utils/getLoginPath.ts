import isOpus from './isOpus';

export default () => `${isOpus() ? '/opus' : ''}/user/login`;
