export default ({ timers, setTimers, timerList }: any) => {
  timerList.forEach((item: any) => timers.set(item?.timerKey, item?.currentTimer));
  setTimers(timers);
};
