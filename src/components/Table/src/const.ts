import type { SizeType } from '/#/config'

import componentSetting from '/@/settings/componentSetting'

const { table } = componentSetting

const { pagination, fetchSetting } = table

export const DEFAULT_PAGINATION = pagination

export const FETCH_SETTING = fetchSetting

export const DEFAULT_SIZE: SizeType = 'default'

export const ROW_KEY = 'id'
