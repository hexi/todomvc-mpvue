import wx from '../utils/wx'

const todoList = [{
  title: '今天要写3000行代码',
  order: 1,
  completed: false,
  createdAt: new Date('2018-04-28T06:16:05.700Z'),
  updatedAt: new Date('2018-05-02T06:11:33.735Z'),
  id: 1
}, {
  title: '今天产品上线后一起吃海底捞',
  order: 2,
  completed: true,
  createdAt: new Date('2018-04-28T06:16:05.702Z'),
  updatedAt: new Date('2018-05-02T06:11:35.305Z'),
  id: 2
}, {
  title: '决定要不要杀一个产品经理祭天',
  order: 3,
  completed: true,
  createdAt: new Date('2018-04-28T06:16:05.702Z'),
  updatedAt: new Date('2018-05-02T06:11:36.265Z'),
  id: 3
}, {
  title: '上班使我快乐',
  completed: false,
  order: 0,
  createdAt: new Date('2018-05-02T03:12:38.911Z'),
  updatedAt: new Date('2018-05-02T06:19:32.335Z'),
  id: 9
}, {
  title: '我很高兴',
  completed: false,
  order: 0,
  createdAt: new Date('2018-05-02T06:20:25.784Z'),
  updatedAt: new Date('2018-05-02T06:20:25.784Z'),
  id: 11
}, {
  title: '晚上吃什么',
  completed: false,
  order: 0,
  createdAt: new Date('2018-05-02T06:20:49.696Z'),
  updatedAt: new Date('2018-05-02T06:20:49.696Z'),
  id: 12
}, {
  title: '中午吃什么',
  completed: false,
  order: 0,
  createdAt: new Date('2018-05-02T06:20:55.823Z'),
  updatedAt: new Date('2018-05-02T06:20:55.823Z'),
  id: 13
}, {
  title: '早上吃什么？',
  completed: false,
  order: 0,
  createdAt: new Date('2018-05-02T06:21:17.552Z'),
  updatedAt: new Date('2018-05-02T06:21:17.552Z'),
  id: 14
}, {
  title: '今天很多人请假',
  completed: false,
  order: 0,
  createdAt: new Date('2018-05-02T06:41:58.126Z'),
  updatedAt: new Date('2018-05-02T06:41:58.126Z'),
  id: 15
}]

let maxId = todoList.reduce((preMaxId, current) => {
  return preMaxId > current.id ? preMaxId : current.id
}, 0)

function genMaxId () {
  return ++maxId
}

function sleep (mill) {
  wx.showLoading({title: '拼命加载中...'})
  return new Promise((resolve) => setTimeout(resolve, mill)).finally(() => {
    wx.hideLoading()
  })
}

const addItem = (title, completed = false) => {
  return sleep(200).then(() => {
    const toAdd = {
      title,
      completed,
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: genMaxId()
    }
    todoList.push(toAdd)
    return toAdd
  })
}

const getAll = () => {
  return sleep(100).then(() => {
    // deep copy
    const result = JSON.parse(JSON.stringify(todoList))
    result.sort((l, r) => {
      return new Date(r.updatedAt).getTime() - new Date(l.updatedAt).getTime()
    })

    return result
  })
}

const deleteItem = (id) => {
  return sleep(100).then(() => {
    const index = todoList.findIndex((item) => {
      return item.id === id
    })
    if (index === -1) {
      return null
    }
    const removed = todoList.splice(index, 1)

    return removed[0]
  })
}

const updateItem = ({id, title, completed} = {}) => {
  return sleep(150).then(() => {
    let filtered = todoList.filter((item) => {
      return item.id === id
    })
    if (!filtered && filtered.length === 0) {
      return null
    }
    const toUpdate = filtered[0]
    toUpdate.title = title || toUpdate.title
    toUpdate.completed = completed
    toUpdate.updatedAt = new Date()

    return toUpdate
  })
}

export default {
  addItem,
  getAll,
  deleteItem,
  updateItem
}
