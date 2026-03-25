<template>
  <view class="home">
    <!-- 搜索 -->
    <view class="search-bar">
      <view class="search-inner">
        <image class="si" src="/src/static/icon-search.png" />
        <input placeholder="搜索美食..." v-model="keyword" />
      </view>
    </view>
    <!-- 轮播 -->
    <view class="hero-section">
      <swiper class="hero-swiper" circular :indicator-dots="true" :autoplay="true" :interval="3000" indicator-color="rgba(255,255,255,0.4)" indicator-active-color="#fff">
        <swiper-item v-for="(item, idx) in heroFoods" :key="idx" @click="goDetail(item.id)">
          <view class="hero-card">
            <image class="hero-img" :src="item.cover" mode="aspectFill" />
            <view class="hero-overlay">
              <view class="hero-tag">🔥 热门推荐</view>
              <view class="hero-title">{{ item.title }}</view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!-- 分类 -->
    <view class="category-section">
      <scroll-view class="category-scroll" scroll-x>
        <view v-for="cat in categories" :key="cat" class="category-item" :class="{ active: currentCat === cat }" @click="currentCat = cat">
          <text>{{ cat }}</text>
        </view>
      </scroll-view>
    </view>
    <!-- 列表 -->
    <view class="food-list">
      <food-card v-for="item in filteredFoods" :key="item.id" :item="item" @update="loadData" />
      <view v-if="filteredFoods.length === 0" class="empty">暂无相关美食~</view>
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
      currentCat: '全部',
      allFoods: [],
      categories: ['全部', '硬菜', '素菜', '汤品', '主食', '甜点', '快手']
    }
  },
  computed: {
    heroFoods() { return this.allFoods.slice(0, 3) },
    filteredFoods() {
      let list = this.allFoods
      if (this.currentCat !== '全部') list = list.filter(f => f.tag === this.currentCat)
      return list
    }
  },
  onShow() { this.loadData() },
  methods: {
    loadData() { this.allFoods = apiGetFoods() },
    goDetail(id) { uni.navigateTo({ url: `/src/pages/detail/detail?id=${id}` }) }
  }
}
</script>

<style scoped>
.home { background: #f7f7f7; min-height: 100vh; }
.search-bar { padding: 20rpx 30rpx; background: #fff; }
.search-inner { display: flex; align-items: center; background: #f2f2f2; border-radius: 40rpx; padding: 16rpx 24rpx; }
.si { width: 36rpx; height: 36rpx; margin-right: 12rpx; }
input { flex: 1; font-size: 28rpx; }
.hero-section { padding: 20rpx 30rpx; }
.hero-swiper { height: 400rpx; border-radius: 20rpx; }
.hero-card { width: 100%; height: 400rpx; position: relative; }
.hero-img { width: 100%; height: 100%; border-radius: 20rpx; }
.hero-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 40rpx 28rpx; background: linear-gradient(transparent, rgba(0,0,0,0.7)); border-radius: 0 0 20rpx 20rpx; }
.hero-tag { display: inline-block; background: linear-gradient(135deg, #ff6b35, #ff9a6c); color: #fff; font-size: 20rpx; padding: 4rpx 16rpx; border-radius: 20rpx; margin-bottom: 10rpx; }
.hero-title { color: #fff; font-size: 36rpx; font-weight: 700; }
.category-section { padding: 20rpx 0; background: #fff; margin-bottom: 20rpx; }
.category-scroll { white-space: nowrap; padding: 0 20rpx; }
.category-item { display: inline-flex; align-items: center; padding: 12rpx 24rpx; margin-right: 12rpx; border-radius: 30rpx; font-size: 26rpx; color: #666; }
.category-item.active { background: #fff0eb; color: #ff6b35; font-weight: 600; }
.food-list { padding: 0 30rpx; }
.empty { text-align: center; padding: 100rpx; color: #bbb; }
</style>