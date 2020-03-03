/**
 * 过滤日期格式，传入时间戳，根据参数返回不同格式
 */
export function formatTimer([ms, isDay]) {
  let dt = new Date(ms * 1000);
  if (isDay) {
    return [
      [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join('-'),
    ].join(' ')
      .replace(/(?=\b\d\b)/g, '0');
  }
  return [
    [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join('-'), [dt.getHours(), dt.getMinutes(), dt.getSeconds()].join(':'),
  ].join(' ')
    .replace(/(?=\b\d\b)/g, '0');
}
