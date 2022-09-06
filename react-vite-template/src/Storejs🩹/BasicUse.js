// https://github.com/marcuswestin/store.js  2.0.12版本  

import store from 'store'
store.set('user', { name:'Marcus' })
store.get('user').name == 'Marcus'

console.log(store)