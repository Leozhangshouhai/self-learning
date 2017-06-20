/**
 * Created by leo on 2017/6/1.
 */
// 引用模板
import index from '../page/index1.vue'
import content from '../page/content.vue'
// 配置路由
export default [
  {
    path: '/',
    component: index
  },
  {
    path: '/content',
    component: content
  }
]
