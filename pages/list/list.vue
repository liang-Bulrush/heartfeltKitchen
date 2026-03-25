<template>
  <view class="list-page">
    <!-- 搜索栏 -->
    <view class="search-bar">
      <view class="search-inner">
        <image class="si" src="/static/icon-search.png" />
        <input placeholder="搜索美食..." placeholder-class="ph" v-model="keyword" />
      </view>
      <text class="cancel-btn" @click="onCancel">取消</text>
    </view>

    <!-- 筛选栏 -->
    <view class="filter-bar">
      <view
        v-for="f in filters"
        :key="f.key"
        class="filter-item"
        :class="{ active: currentFilter === f.key }"
        @click="onFilter(f.key)"
      >
        <text>{{ f.label }}</text>
        <image v-if="f.key !== 'time'" class="arrow" src="/static/icon-arrow.png" />
      </view>
    </view>

    <!-- 排序弹出层 -->
    <view v-if="showSort" class="sort-popup" @click="showSort = false">
      <view class="sort-panel" @click.stop>
        <view
          v-for="s in sortOptions"
          :key="s.key"
          class="sort-item"
          :class="{ active: currentSort === s.key }"
          @click="onSort(s.key)"
        >
          {{ s.label }}
          <image v-if="currentSort === s.key" src="/static/icon-check.png" />
        </view>
      </view>
    </view>

    <!-- 列表 -->
    <view class="food-list">
      <food-card
        v-for="item in filteredList"
        :key="item.id"
        :item="item"
        @update="loadData"
      />
      <view v-if="filteredList.length === 0" class="empty">
        <text>还没有相关美食，去发布第一道吧~</text>
      </view>
    </view>

    <!-- 发布按钮 -->
    <view class="fab" @click="onPublish">
      <image src="/static/icon-add.png" />
    </view>
  </view>
</template>

<script>
import { apiGetFoods } from '@/utils/mockData.js'
import FoodCard from '@/components/food-card/food-card.vue'

export default {
  components: { FoodCard },
  data() {
    return {
      keyword: '',
      currentFilter: 'recommend',
      currentSort: 'default',
      showSort: false,
      allFoods: [],
      filters: [
        { key: 'time', label: '时间排序' },
        { key: 'sort', label: '综合排序' },
        { key: 'tag', label: '分类' },
      ],
      sortOptions: [
        { key: 'default', label: '综合排序' },
        { key: 'likes', label: '按热度' },
        { key: 'favs', label: '按收藏' },
        { key: 'newest', label: '最新发布' },
      ]
    }
  },
  computed: {
    filteredList() {
      let list = [...this.allFoods]
      if (this.keyword) {
        const kw = this.keyword.toLowerCase()
        list = list.filter(f =>
          f.title.toLowerCase().includes(kw) ||
          f.desc.toLowerCase().includes(kw) ||
          (f.tags && f.tags.some(t => t.toLowerCase().includes(kw)))
        )
      }
      if (this.currentSort === 'likes') list.sort((a, b) => b.likes - a.likes)
      if (this.currentSort === 'favs') list.sort((a, b) => b.favs - a.favs)
      if (this.currentSort === 'newest') list.sort((a, b) => b.createTime - a.createTime)
      return list
    }
  },
  onShow() { this.loadData() },
  methods: {
    loadData() { this.allFoods = apiGetFoods() },
    onFilter(key) {
      if (key === 'sort') this.showSort = !this.showSort
      if (key === 'tag') this.onTagFilter()
    },
    onSort(key) {
      this.currentSort = key
      this.showSort = false
    },
    onTagFilter() {
      uni.showActionSheet({
        itemList: ['全部', '硬菜', '素菜', '汤品', '主食', '甜点'],
        success: res => {
          const tags = ['', '硬菜', '素菜', '汤品', '主食', '甜点']
          this.currentFilter = tags[res.tapIndex] || ''
        }
      })
    },
    onCancel() {
      this.keyword = ''
      uni.navigateBack()
    },
    onPublish() {
      uni.navigateTo({ url: '/pages/publish/publish' })
    }
  }
}
</script>

<style scoped>
.list-page { background: #f7f7f7; min-height: 100vh; }

.search-bar {
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  background: #fff;
  gap: 20rpx;
}
.search-inner {
  flex: 1;
  display: flex;
  align-items: center;
  background: #f2f2f2;
  border-radius: 40rpx;
  padding: 14rpx 24rpx;
  gap: 10rpx;
}
.si { width: 32rpx; height: 32rpx; }
input { flex: 1; font-size: 28rpx; }
.ph { color: #aaa; }
.cancel-btn { font-size: 28rpx; color: #ff6b35; }

.filter-bar {
  display: flex;
  background: #fff;
  padding: 20rpx 0;
  border-bottom: 1px solid #f0f0f0;
}
.filter-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6rpx;
  font-size: 28rpx;
  color: #666;
}
.filter-item.active { color: #ff6b35; font-weight: 600; }
.arrow { width: 20rpx; height: 20rpx; }

.sort-popup {
  position: fixed; inset: 0; z-index: 888;
  background: rgba(0,0,0,0.3);
}
.sort-panel {
  background: #fff;
  border-radius: 24rpx 24rpx 0 0;
  padding: 30rpx 40rpx;
  position: absolute; bottom: 0; left: 0; right: 0;
}
.sort-item {
  padding: 28rpx 0;
  font-size: 30rpx;
  color: #333;
  border-bottom: 1px solid #f5f5f5;
  display: flex; justify-content: space-between; align-items: center;
}
.sort-item.active { color: #ff6b35; font-weight: 600; }
.sort-item image { width: 36rpx; height: 36rpx; }

.food-list { padding: 24rpx 30rpx; }
.empty { text-align: center; padding: 100rpx; color: #bbb; font-size: 28rpx; }

.fab {
  position: fixed;
  right: 40rpx;
  bottom: 60rpx;
  width: 100rpx; height: 100rpx;
  background: linear-gradient(135deg, #ff6b35, #ff9a6c);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(255,107,53,0.4);
}
.fab image { width: 50rpx; height: 50rpx; }
</style>
