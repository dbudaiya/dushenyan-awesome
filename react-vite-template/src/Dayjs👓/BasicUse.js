import dayjs from 'dayjs'

// 转换
console.log(dayjs('2018-06-27 21:22').format('YYYY年MM月DD H:m'));


// 对日期全部解析
console.log(dayjs('1999-11-10'))
console.log(dayjs('1999-12-17').$y)
console.log(dayjs('1999-11-10').locale('zh-cn').format())


// 查询
console.log(dayjs().isBefore(dayjs()))