<template>
  <ul class="mo-paging">

    <!-- first -->
    <li :class="['paging-item', 'paging-item--first', {'paging-item--disabled' : index === 1}]" @click="first">首页</li>
    <!-- prev -->
    <li :class="['paging-item', 'paging-item--prev', {'paging-item--disabled' : index === 1}]" @click="prev">&lt;</li>

    <li :class="['paging-item', 'paging-item--more']" v-if="showPrevMore">...</li>

    <li :class="['paging-item', {'paging-item--current' : index === pager}]" v-for="pager in pagers" @click="go(pager,pageMaking)">{{ pager }}</li>

    <li :class="['paging-item', 'paging-item--more']" v-if="showNextMore">...</li>

    <!-- next -->
    <li :class="['paging-item', 'paging-item--next', {'paging-item--disabled' : index === pages}]" @click="next">&gt;</li>
    <!-- last -->
    <li :class="['paging-item', 'paging-item--last', {'paging-item--disabled' : index === pages}]" @click="last">末页</li>

    <!--<div class="goPage">
      <input type="text" :placeholder="parentTotalPage" ref="pageNum" v-model="val" @keyup="input()">&nbsp;/&nbsp;{{parentTotalPage}}
      <button @click="go(val)">跳转</button>
    </div>-->
  </ul>
</template>

<style>
  .mo-paging {
    display: inline-block;
    padding: 0;
    margin: 1rem 0;
    font-size: 0;
    list-style: none;
    user-select: none;
  }

  .mo-paging>.paging-item {
    display: inline;
    font-size: 14px;
    position: relative;
    padding: 6px 12px;
    line-height: 1.42857143;
    text-decoration: none;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-left: -1px;
    cursor: pointer;
    color: #0275d8;
  }

  .mo-paging>.paging-item:first-child {
    margin-left: 0;
  }

  .mo-paging>.paging-item:hover {
    background-color: #f0f0f0;
    color: #0275d8;
  }

  .mo-paging>.paging-item.paging-item--disabled,
  .mo-paging>.paging-item.paging-item--more {
    background-color: #fff;
    color: #505050;
  }

  .mo-paging>.paging-item.paging-item--disabled {
    cursor: not-allowed;
    opacity: .75;
  }

  .mo-paging>.paging-item.paging-item--more,
  .mo-paging>.paging-item.paging-item--current {
    cursor: default;
  }

  .mo-paging>.paging-item.paging-item--current {
    background-color: #0275d8;
    color: #fff;
    position: relative;
    z-index: 1;
    border-color: #0275d8;
  }

  .goPage {
    font-size: 14px;
    margin-left: 10px;
    display: inline-block;
  }

  .goPage input {
    width: 32px;
    height: 26px;
    text-align: center;
    border: 1px solid #ccc;
    color: #575757;
  }

  .goPage button {
    width: 40px;
    height: 30px;
    margin-left: 5px;
  }

  .goPage button:hover {
    background-color: #0275d8;
    color: #ffffff;
    border: none;
  }
</style>

<script>
  export default {
    name: 'MyPaging',
    //通过props来接受从父组件传递过来的值
    props: {
      //页面中的可见页码，其他的以...替代, 必须是奇数
      perPages: {
        type: Number,
        default: 5
      },
      //当前页码
      pageIndex: {
        type: Number,
        default: 1
      },
      //每页显示条数
      pageSize: {
        type: Number,
        default: 10
      },
      //总记录数
      total: {
        type: Number,
        default: 1
      },
      // 总页数
      parentTotalPage: {
        type: Number,
        default: 1
      },
      pageMaking: {
        type: String,
        default: ''
      },

    },
    methods: {
      prev() {
        if (this.index > 1) {
          this.go(this.index - 1)
          this.$emit('clickPrevPage')
        }
      },
      next() {
        if (this.index < this.pages) {
          this.go(this.index + 1)
          this.$emit('clickNextPage')
        }
      },
      first() {
        if (this.index !== 1) {
          this.go(1)
          this.$emit('clickFirstPage')
        }
      },
      last() {
        if (this.index != this.pages) {
          this.go(this.pages)
          this.$emit('clickLastPage')
        }
      },
      go(page, click) {
        if (!Number(page)) {
          return
        } else {
          if (typeof page == 'string') {
            page = Number(page)
          }
          if (this.index !== page) {
            this.index = page
            //父组件通过change方法来接受当前的页码
            this.$emit('change', this.index,click)
            // 页面置顶
            this.toTop()
          }
        }
      },
      input() {
        var r = /^\+?[1-9][0-9]*$/;//正整数
        if (!Number(this.$refs.pageNum.value)) {
          this.$refs.pageNum.value = ''
        }
        if (!r.test(this.val)) {
          this.val = this.val.substr(0, this.val.length - 1)
        } else if (this.val > this.parentTotalPage) {
          this.val = this.parentTotalPage
        }
      },
    },
    computed: {

      //计算总页码
      pages() {
        return Math.ceil(this.size / this.limit)
      },

      //计算页码，当count等变化时自动计算
      pagers() {
        const array = []
        const perPages = this.perPages
        const pageCount = this.pages
        let current = this.index
        const _offset = (perPages - 1) / 2


        const offset = {
          start: current - _offset,
          end: current + _offset
        }

        //-1, 3
        if (offset.start < 1) {
          offset.end = offset.end + (1 - offset.start)
          offset.start = 1
        }
        if (offset.end > pageCount) {
          offset.start = offset.start - (offset.end - pageCount)
          offset.end = pageCount
        }
        if (offset.start < 1) offset.start = 1

        this.showPrevMore = (offset.start > 1)
        this.showNextMore = (offset.end < pageCount)

        for (let i = offset.start; i <= offset.end; i++) {
          array.push(i)
        }

        return array
      }
    },
    data() {
      return {
        index: this.pageIndex, //当前页码
        limit: this.pageSize, //每页显示条数
        size: this.total || 1, //总记录数
        showPrevMore: false,
        showNextMore: false,
        val: '',
      }
    },
    watch: {
      pageIndex(val) {
        this.index = val || 1
      },
      pageSize(val) {
        this.limit = val || 10
      },
      total(val) {
        this.size = val || 1
      }
    }
  }

</script>