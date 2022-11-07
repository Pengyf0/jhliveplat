
// 数组种对象属性的排序
export const sort = (attr) => {
  return function (a, b) {
    return a[attr] - b[attr];
  };
}
export const pureSort = (attr) => {
  return function (a, b) {
    return b[attr] - a[attr];
  };
}