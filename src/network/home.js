// 这个文件包含了所有对 首页部分数据的请求
import {request} from "./request"

export function getHomeMultidata() {
  return request({
    url: './home/multidata'
  })
}

function test() {
  const names = ['why', 'aaa']
}

test()
