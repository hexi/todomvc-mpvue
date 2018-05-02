// import wx from 'wx'
import Fly from 'flyio/dist/npm/wx'
import ParamsBuilder from './paramsBuilder'

const fly = new Fly()
fly.config.timeout = 10 * 1000
fly.config.baseURL = 'http://192.168.77.48:8000'

// fly.interceptors.request.use((request) => {
//   wx.showLoading({title: '拼命加载中...'})
//   return request
// })

fly.interceptors.response.use(
  (response, promise) => {
    // wx.hideLoading()
    return promise.resolve(response.data)
  },
  (err, promise) => {
    // wx.hideLoading()
    // wx.showToast({
    //   title: err.message,
    //   icon: 'none'
    // })
    return promise.reject(err)
  }
)

const path = '/item'

const addItem = (title, completed = false) => {
  const data = new ParamsBuilder()
    .param('title', title)
    .param('completed', completed)
    .build()
  return fly.post(path, data)
}

const getAll = () => {
  return fly.get(path).then(data => {
    if (data && data.length > 0) {
      data.sort((l, r) => {
        return new Date(r.updatedAt).getTime() - new Date(l.updatedAt).getTime()
      })
    }
    return data
  })
}

const deleteItem = (id) => {
  return fly.delete(`${path}/${id}`)
}

const updateItem = ({id, title, completed} = {}) => {
  const data = new ParamsBuilder()
    .param('title', title)
    .param('completed', completed)
    .build()

  return fly.put(`${path}/${id}`, data)
}

export default {
  addItem,
  getAll,
  deleteItem,
  updateItem
}
