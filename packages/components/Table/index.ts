import { withInstall } from '@ch-vele/utils'
import Table from './src/table.vue'

export const ChTable = withInstall(Table)
export default ChTable

export type TableInstance = InstanceType<typeof Table>
