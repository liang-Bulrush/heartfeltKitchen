<template>
  <view class="profile-page">
    <view class="profile-header">
      <image class="header-bg" src="/src/static/profile-bg.png" />
      <view class="profile-info">
        <view class="avatar-wrap">
          <image class="avatar" :src="user.avatar" />
        </view>
        <view class="nickname">{{ user.nickname }}</view>
        <view class="bio">{{ user.bio }}</view>
        <view class="stats-row">
          <view class="stat-item"><text class="stat-num">{{ user.foods }}</text><text class="stat-label">发布</text></view>
          <view class="stat-divider"></view>
          <view class="stat-item"><text class="stat-num">{{ user.fans }}</text><text class="stat-label">粉丝</text></view>
          <view class="stat-divider"></view>
          <view class="stat-item"><text class="stat-num">{{ user.likes }}</text><text class="stat-label">获赞</text></view>
        </view>
      </view>
    </view>
    <view class="tab-section">
      <view class="tab-bar">
        <view class="tab-item" :class="{ active: currentTab === 'publish' }" @click="currentTab = 'publish'">
          <text>我的发布</text>
          <view v-if="currentTab === 'publish'" class="tab-line"></view>
        </view>
        <view class="tab-item" :class="{ active: currentTab === 'fav' }" @click="currentTab = 'fav'">
          <text>我的收藏</text>
          <view v-if="currentTab === 'fav'" class="tab-line"></view>
        </view>
      </view>
      <view v-if="currentTab === 'publish'" class="tab-content">
        <food-card v-for="item in myFoods" :key="item.id" :item="item" @update="loadData" />
        <view v-if="myFoods.length === 0" class="empty">还没有发布过美食~</view>
      </view>
      <view v-if="currentTab === 'fav'" class="tab-content">
        <food-card v-for="item in myFavs" :key="item.id" :item="item" @update="loadData" />
        <view v-if="myFavs.length === 0" class="empty">还没有收藏的美食~</view>
      </view>
    </view>
    <view class="menu-section">
      <view class="menu-item" @click="onMenu('about')">
        <image src="/src/static/icon-about.png" /><text>关于我们</text><image class="arrow" src="/src/static/icon-arrow-r.png" />
      </view>
      <view class="menu-item" @click="onMenu('settings')">
        <image src="/src/static/icon-settings.png" /><text>设置</text><image class="arrow" src="/src/static/icon-arrow-r.png" />
      </view>
    </view>
  </view>
</template>

<script>
import { apiGetUser, apiGetMyFoods, apiGetMyFavs } from '@/utils/mockData.js'
import FoodCard from '@/components/food-card/food-card.vue'

export default {
  components: { FoodCard },
  data() { return { user: {}, currentTab: 'publish', myFoods: [], myFavs: [] } },
  onShow() { this.loadData() },
  methods: {
    loadData() { this.user = apiGetUser(); this.myFoods = apiGetMyFoods(); this.myFavs = apiGetMyFavs() },
    onMenu(key) { uni.showToast({ title: key === 'about' ? '暖心厨房 v1.0.0' : '设置功能开发中~', icon: 'none' }) }
  }
}
</script>

<style scoped>
.profile-page { background: #f7f7f7; min-height: 100vh; }
.profile-header { position: relative; padding-bottom: 40rpx; }
.header-bg { width: 100%; height: 380rpx; background: linear-gradient(135deg, #ff6b35, #ff9a6c); border-radius: 0 0 48rpx 48rpx; }
.profile-info { position: absolute; bottom: 0; left: 0; right: 0; display: flex; flex-direction: column; align-items: center; padding: 0 30rpx 30rpx; }
.avatar-wrap { margin-bottom: 16rpx; }
.avatar { width: 140rpx; height: 140rpx; border-radius: 50%; border: 6rpx solid #fff; box-shadow: 0 8rpx 20rpx rgba(0,0,0,0.15); }
.nickname { font-size: 36rpx; font-weight: 700; color: #fff; margin-bottom: 8rpx; }
.bio { font-size: 24rpx; color: rgba(255,255,255,0.8); margin-bottom: 20rpx; }
.stats-row { display: flex; align-items: center; background: rgba(255,255,255,0.95); border-radius: 20rpx; padding: 20rpx 40rpx; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08); }
.stat-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6rpx; }
.stat-num { font-size: 34rpx; font-weight: 700; color: #333; }
.stat-label { font-size: 22rpx; color: #999; }
.stat-divider { width: 1px; height: 40rpx; background: #eee; }
.tab-section { margin: 24rpx 30rpx; }
.tab-bar { display: flex; background: #fff; border-radius: 16rpx; padding: 8rpx; margin-bottom: 24rpx; }
.tab-item { flex: 1; display: flex; flex-direction: column; align-items: center; padding: 16rpx 0; font-size: 28rpx; color: #888; font-weight: 600; position: relative; }
.tab-item.active { color: #ff6b35; }
.tab-line { position: absolute; bottom: -4rpx; width: 40rpx; height: 6rpx; background: linear-gradient(135deg, #ff6b35, #ff9a6c); border-radius: 6rpx; }
.empty { text-align: center; padding: 80rpx; color: #bbb; }
.menu-section { margin: 0 30rpx; background: #fff; border-radius: 16rpx; overflow: hidden; }
.menu-item { display: flex; align-items: center; padding: 30rpx; gap: 16rpx; border-bottom: 1px solid #f5f5f5; }
.menu-item image { width: 40rpx; height: 40rpx; }
.menu-item text { flex: 1; font-size: 28rpx; color: #333; }
.menu-item .arrow { width: 24rpx; height: 24rpx; opacity: 0.4; }
</style>