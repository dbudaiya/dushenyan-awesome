import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'


dayjs.extend(advancedFormat)

const day_plugin = dayjs('1999-12-17').format('Q Do k kk X x')

console.log(day_plugin)

