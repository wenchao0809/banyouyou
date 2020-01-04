Component({
  properties: {
    tabsData: {
      type: Array,
      value: []
    },
    activeIndex: {
      type: Number,
      value: 0
    }
  },
  data: {
    
  },
  methods: {
    clickTabItem({ currentTarget: { dataset: { index: index} } }) {
      this.triggerEvent('changeTab', index)
    }
  }
})