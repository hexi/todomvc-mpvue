const method = process.env.METHOD
console.log('---env method: ', method)
import MockTodoApi from './MockTodoApi'
import TodoApi from './TodoApi'

let api = null
if (method && method === 'local') {
  api = MockTodoApi
} else {
  api = TodoApi
}

// export default api
export default api
