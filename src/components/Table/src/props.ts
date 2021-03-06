import type { PaginationProps } from './types/pagination'
import type { TableSetting, FetchSetting, TableRowSelection } from './types/table'

import defaultProps from 'element-plus/lib/components/table/src/table/defaults'

/**
 *
 * 二次封装表格
 * node_modules/element-plus/es/components/table/index.d.ts
 *
 * https://element-plus.org/zh-CN/component/table.html
 */
export const basicProps = {
  /**
   * 表格数据api请求, 与data互斥，优先使用api获取得到的数据
   */
  api: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  beforeFetch: {
    type: Function as PropType<Fn>,
    default: null,
  },
  afterFetch: {
    type: Function as PropType<Fn>,
    default: null,
  },
  /**
   * 是否立即执行api请求
   */
  immediate: {
    type: Boolean,
    default: true,
  },
  /**
   * 显示需要的表格设置
   */
  tableSetting: {
    type: Object as PropType<TableSetting>,
    default: () => {},
  },
  fetchSetting: {
    type: Object as PropType<FetchSetting>,
    default: () => {},
  },
  /**
   * 是否需要显示表格设置
   */
  showTableSetting: {
    type: Boolean,
    default: true,
  },
  /**
   * 分页功能
   */
  pagination: {
    type: [Object, Boolean] as PropType<PaginationProps | boolean>,
    default: null,
  },
  /**
   * 表格loading加载
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 自定义的多选功能，支持单选模式，不允许与原有的type="selection"共用，因为自定义的也是使用了原定义的事件
   * 默认为null则不启用
   */
  rowSelection: {
    type: Object as PropType<TableRowSelection>,
    default: null,
  },
  /**
   * ElTable原有的属性
   */
  ...defaultProps,
}
