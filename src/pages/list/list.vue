<template>
  <view class="list-page">
    <view class="search-bar">
      <view class="search-inner">
        <image class="si" src="/src/static/icon-search.png" />
        <input placeholder="搜索美食..." v-model="keyword" />
      </view>
      <text class="cancel" @click="goBack">取消</text>
    </view>
    <view class="filter-bar">
      <view class="filter-item" :class="{ active: currentSort === 'newest' }" @click="currentSort = 'newest'">最新</view>
      <view class="filter-item" :class="{ active: currentSort === 'likes' }" @click="currentSort = 'likes'">最热</view>
      <view class="filter-item" :class="{ active: currentSort === 'favs' }" @click="currentSort = 'favs'">收藏</view>
    </view>
    <view class="food-list">
      <food-card v-for="item in filteredList" :key="item.id" :item="item" @update="loadData" />
      <view v-if="filteredList.length === 0" class="empty">还没有相关美食~</view>
    </view>
    <view class="fab" @click="goPublish">
      <image src="/src/static/icon-add.png" />
    </view>
  </view>
</template>

<script>
import { apiGetFoods } from '@/utils/mockData.js'
import FoodCard from '@/components/food-card/food-card.vue'

export default {
  components: { FoodCard },
  data() {
    return { keyword: '', currentSort: 'newest', allFoods: [] }
  },
  computed: {
    filteredList() {
      let list = [...this.allFoods]
      if (this.currentSort === 'likes') list.sort((a,b) => b.likes - a.likes)
      else if (this.currentSort === 'favs') list.sort((a,b) => b.favs - a.favs)
      else list.sort((a,b) => b.createTime - a.createTime)
      return list
    }
  },
  onShow() { this.loadData() },
  methods: {
    loadData() { this.allFoods = apiGetFoods() },
    goBack() { uni.navigateBack() },
    goPublish() { uni.navigateTo({ url: '/src/pages/publish/publish' }) }
  }
}
</script>

<style scoped>
.list-page { background: #f7f7f7; min-height: 100vh; padding-bottom: 120rpx; }
.search-bar { display: flex; align-items: center; padding: 20rpx 30rpx; background: #fff; gap: 20rpx; }
.search-inner { flex: 1; display: flex; align-items: center; background: #f2f2f2; border-radius: 40rpx; padding: 14rpx 24rpx; }
.si { width: 32rpx; height: 32rpx; margin-right: 12rpx; }
input { flex: 1; font-size: 28rpx; }
.cancel { font-size: 28rpx; color: #ff6b35; }
.filter-bar { display: flex; background: #fff; padding: 20rpx 30rpx; border-bottom: 1px solid #f0f0f0; }
.filter-item { flex: 1; text-align: center; font-size: 28rpx; color: #666; padding: 10rpx 0; }
.filter-item.active { color: #ff6b35; font-weight: 600; }
.food-list { padding: 24rpx 30rpx; }
.empty { text-align: center; padding: 100rpx; color: #bbb; }
.fab { position: fixed; right: 40rpx; bottom: 60rpx; width: 100rpx; height: 100rpx; background: linear-gradient(135deg, #ff6b35, #ff9a6c); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8rpx 24rpx rgba(255,107,53,0.4); }
.fab image { width: 50rpx; height: 50rpx; }
</style>