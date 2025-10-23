export default ({ timers, setTimers }: any) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of timers.entries()) {
    clearTimeout(value);
    timers.delete(key);
  }
  setTimers(timers);
};
