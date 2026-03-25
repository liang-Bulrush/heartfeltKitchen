<template>
  <view class="home">
    <!-- 顶部搜索栏 -->
    <view class="search-bar">
      <view class="search-inner">
        <image class="search-icon" src="/static/icon-search.png" />
        <input
          class="search-input"
          placeholder="搜索美食、食材..."
          placeholder-class="search-placeholder"
          v-model="keyword"
          @confirm="onSearch"
        />
      </view>
    </view>

    <!-- 个性化卡片轮播 -->
    <view class="hero-section">
      <swiper class="hero-swiper" circular :indicator-dots="true" :autoplay="true" :interval="3000" indicator-color="rgba(255,255,255,0.4)" indicator-active-color="#fff">
        <swiper-item v-for="(item, index) in heroFoods" :key="index" @click="goDetail(item.id)">
          <view class="hero-card">
            <image class="hero-img" :src="item.cover" mode="aspectFill" />
            <view class="hero-overlay">
              <view class="hero-tag">🔥 热门推荐</view>
              <view class="hero-title">{{ item.title }}</view>
              <view class="hero-meta">
                <image class="hero-avatar" :src="item.authorAvatar" />
                <text class="hero-author">{{ item.author }}</text>
                <text class="hero-likes">❤️ {{ item.likes }}</text>
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 分类标签 -->
    <view class="category-section">
      <scroll-view class="category-scroll" scroll-x>
        <view
          v-for="cat in categories"
          :key="cat.name"
          class="category-item"
          :class="{ active: currentCat === cat.name }"
          @click="onCatChange(cat.name)"
        >
          <image class="cat-icon" :src="cat.icon" />
          <text class="cat-name">{{ cat.name }}</text>
        </view>
      </scroll-view>
    </view>

    <!-- 美食列表 -->
    <view class="food-list">
      <food-card
        v-for="item in filteredFoods"
        :key="item.id"
        :item="item"
        @update="loadData"
      />
      <view v-if="filteredFoods.length === 0" class="empty">
        <text class="empty-text">暂无相关美食~</text>
      </view>
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
      categories: [
        { name: '全部', icon: '/static/icon-cat-all.png' },
        { name: '硬菜', icon: '/static/icon-cat-meat.png' },
        { name: '素菜', icon: '/static/icon-cat-veg.png' },
        { name: '汤品', icon: '/static/icon-cat-soup.png' },
        { name: '主食', icon: '/static/icon-cat-staple.png' },
        { name: '甜点', icon: '/static/icon-cat-dessert.png' },
        { name: '快手', icon: '/static/icon-cat-fast.png' },
      ]
    }
  },
  computed: {
    heroFoods() {
      return this.allFoods.slice(0, 3)
    },
    filteredFoods() {
      let list = this.allFoods
      if (this.currentCat !== '全部') {
        list = list.filter(f => f.tag === this.currentCat)
      }
      if (this.keyword) {
        const kw = this.keyword.toLowerCase()
        list = list.filter(f =>
          f.title.toLowerCase().includes(kw) ||
          f.desc.toLowerCase().includes(kw) ||
          (f.tags && f.tags.some(t => t.toLowerCase().includes(kw)))
        )
      }
      return list
    }
  },
  onShow() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.allFoods = apiGetFoods()
    },
    onCatChange(cat) {
      this.currentCat = cat
    },
    onSearch() {
      // 搜索由 computed 处理
    },
    goDetail(id) {
      uni.navigateTo({ url: `/pages/detail/detail?id=${id}` })
    }
  }
}
</script>

<style scoped>
.home {
  background: #f7f7f7;
  min-height: 100vh;
}

/* 搜索栏 */
.search-bar {
  padding: 20rpx 30rpx;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}
.search-inner {
  display: flex;
  align-items: center;
  background: #f2f2f2;
  border-radius: 40rpx;
  padding: 16rpx 24rpx;
}
.search-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 12rpx;
}
.search-input {
  flex: 1;
  font-size: 28rpx;
}
.search-placeholder {
  color: #aaa;
}

/* 轮播 */
.hero-section {
  padding: 20rpx 30rpx;
}
.hero-swiper {
  height: 400rpx;
  border-radius: 20rpx;
  overflow: hidden;
}
.hero-card {
  width: 100%;
  height: 400rpx;
  position: relative;
}
.hero-img {
  width: 100%;
  height: 100%;
  border-radius: 20rpx;
}
.hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40rpx 28rpx 28rpx;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  border-radius: 0 0 20rpx 20rpx;
}
.hero-tag {
  display: inline-block;
  background: linear-gradient(135deg, #ff6b35, #ff9a6c);
  color: #fff;
  font-size: 20rpx;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  margin-bottom: 10rpx;
}
.hero-title {
  color: #fff;
  font-size: 36rpx;
  font-weight: 700;
  margin-bottom: 12rpx;
}
.hero-meta {
  display: flex;
  align-items: center;
  gap: 10rpx;
}
.hero-avatar {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
}
.hero-author {
  color: rgba(255,255,255,0.8);
  font-size: 22rpx;
  flex: 1;
}
.hero-likes {
  color: #ff6b35;
  font-size: 22rpx;
}

/* 分类 */
.category-section {
  padding: 20rpx 0;
  background: #fff;
  margin-bottom: 20rpx;
}
.category-scroll {
  white-space: nowrap;
  padding: 0 20rpx;
}
.category-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 120rpx;
  margin-right: 16rpx;
}
.cat-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: #f7f7f7;
  padding: 16rpx;
  margin-bottom: 10rpx;
}
.cat-name {
  font-size: 22rpx;
  color: #666;
}
.category-item.active .cat-name {
  color: #ff6b35;
  font-weight: 600;
}
.category-item.active .cat-icon {
  background: linear-gradient(135deg, #fff0eb, #fff);
  box-shadow: 0 4rpx 16rpx rgba(255, 107, 53, 0.2);
}

/* 列表 */
.food-list {
  padding: 0 30rpx;
}
.empty {
  text-align: center;
  padding: 100rpx 0;
}
.empty-text {
  color: #bbb;
  font-size: 28rpx;
}
</style>
