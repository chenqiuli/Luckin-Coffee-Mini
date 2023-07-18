// components/OrderItem/OrderItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderList: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleReceive(event) {
      this.triggerEvent("ReceiveEvent", event.target.dataset.oid);
    },
    hanldeDelOrder(event){
      this.triggerEvent("DelOrderEvent", event.target.dataset.oid);
    }
  },

  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})