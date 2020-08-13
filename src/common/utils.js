// 防抖函数  性能优化函数

export  function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)    // 执行 func函数(refresh())
    },delay)
  }
}
