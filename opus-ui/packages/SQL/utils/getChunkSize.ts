const chunkSize5 = 0.5 * 1024 * 1024;  // 500k
const chunkSize10 = 1 * 1024 * 1024;  // 1M
const chunkSize20 = 2 * 1024 * 1024; // 2M

export default (fileSize: number) => {
  const fileBase = fileSize / (1024 * 1024);
  if (fileBase > 8) {
    return chunkSize20;
  }
  if (fileBase <= 8 && fileBase >= 3) {
    return chunkSize10;
  }
  return chunkSize5;
}
