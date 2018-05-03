<template>
  <div class="todo-container">
    <div class="weui-cell__bd weui-cell add-item-wrapper">
      <input class="weui-input addItem" v-model.trim="toAdd" placeholder="请输入文本" />
      <button class="weui-btn mini-btn addBtn" @click="addItem" type="primary" size="mini">添加</button>
    </div>
    <scroll-view scroll-y class="scroll-wrapper">
      <div v-for="(todo, index) in todoList" :key="todo.id" class="weui-flex item-container">
        <checkbox class="checkbox" @click="checkboxClicked(index)" :checked="todo.completed" />
        <div class="weui-flex__item item-view" :class="{completed: todo.completed}">
          {{todo.title}}
        </div>
        <button class="weui-btn mini-btn delete-btn" size="mini" type="primary" @click="deleteItem({id: todo.id})">删除</button>
      </div>
    </scroll-view>
    <div class="filter-btn-container">
      <button class="weui-btn mini-btn" type="primary" @click="setFilter(null)" size="mini">全部</button>
      <button class="weui-btn mini-btn" type="primary" @click="setFilter(false)" size="mini">激活</button>
      <button class="weui-btn mini-btn" type="primary" @click="setFilter(true)" size="mini">完成</button>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    data: {
      toAdd: '',
      todoFilter: null
    },
    computed: {
      todoList () {
        return this.$store.getters.allTodoList({completed: this.todoFilter})
      }
    },
    methods: {
      setFilter (filterValue) {
        this.todoFilter = filterValue
      },
      addItem () {
        if (!this.toAdd) {
          wx.showToast({
            title: '请输入内容！',
            duration: 500,
            icon: 'none'
          })
          return
        }
        this.$store.dispatch('addItem', {title: this.toAdd})
        this.toAdd = ''
      },
      checkboxClicked (index) {
        const todo = this.todoList[index]
        this.$store.dispatch('setComplete', {id: todo.id, completed: !todo.completed})
      },
      ...mapActions({
        deleteItem: 'deleteItem'
      })
    },

    mounted () {
      this.$store.dispatch('getAllTodoList')
    }
  }
</script>

<style scoped>
  .todo-container {
    margin: auto 10rpx;
    display: flex;
    flex-flow: column nowrap;
  }
  .scroll-wrapper {
    height: 860rpx;
    margin-top: 5rpx;
    margin-bottom: 5rpx;
  }
  .item-container {
    align-items: center;
    border-bottom: #aaaaaa solid 2rpx;
    padding-top: 4rpx;
    padding-bottom: 4rpx;
  }
  .item-view {
    text-align: left;
    padding-left: 10rpx;
    margin-right: 10rpx;
    background-color: #ebebeb;
    height: 2.3em;
    line-height: 2.3em;
    color: #cfcfcf;
  }
  .delete-btn {
    margin-top: 0px;
    margin-bottom: 0px;
    line-height:2.8;
  }
  .checkbox {
    height: 100%;
  }
  .add-item-wrapper {
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
  }
  .addItem {
    flex: 1;
    margin-right: 10rpx;
  }
  .addBtn {
    margin-left: 0px;
    margin-right: 0px;
  }
  .completed {
    text-decoration: line-through;
  }
  .filter-btn-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: #9b9b9b solid 2rpx;
    background-color: #cccccc;
  }

  .filter-btn-container button {
    margin-left: 15rpx;
    margin-right: 15rpx;
  }
</style>
