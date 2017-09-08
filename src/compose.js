/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

export default function compose(...funcs) {
  //如果参数长度为0，则返回一个最简单的函数，即传入什么，就返回什么的函数
  if (funcs.length === 0) {
    return arg => arg
  }
  //如果参数长度为1，则将参数列表中的第一个函数作为返回值
  if (funcs.length === 1) {
    return funcs[0]
  }

  //如果参数长度大于1，则对funcs列表执行reduce函数，
  //reduce方法会将(...args) => a(b(...args))整体作为一个返回值，赋值给a变量，b是funcs数组中的下一个函数
  //一开始，a，是funcs数组中的第一个函数，b是funcs数组中第二个函数，每执行一次reduce操作，a会被reduce函数中的返回值重新赋值，
  // 而reduce函数的返回值刚刚好是一个函数，即a = (...args) => a(b(...args))，
  // 由于a就是一个函数，下一轮reduce，新的a函数又会把funcs中下一个函数b作为参数执行，并继续返回下一个a函数

  //比如funcs = [f1, f2, f3, f4], 执行流程如下
  // a1 = (...args) => f1(f2(...args))
  // a2 = (...args) => a1(f3(...args))
  // a3 = (...args) => a2(f4(...args))
  // 依次代入，则得到
  // a2 = (...args) => f1(f2(f3(...args)))
  // a3 = (...args) => f1(f2(f3(f4(...args))))
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
