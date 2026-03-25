<template>
  <view class="profile-page">
    <!-- 顶部背景 -->
    <view class="profile-header">
      <image class="header-bg" src="/static/profile-bg.png" />
      <view class="profile-info">
        <!-- 头像 -->
        <view class="avatar-wrap" @click="onEditAvatar">
          <image class="avatar" :src="user.avatar" />
          <view class="avatar-edit">
            <image src="/static/icon-camera.png" />
          </view>
        </view>
        <!-- 用户名 -->
        <view class="nickname">{{ user.nickname }}</view>
        <view class="bio">{{ user.bio }}</view>
        <!-- 数据 -->
        <view class="stats-row">
          <view class="stat-item">
            <text class="stat-num">{{ user.foods }}</text>
            <text class="stat-label">发布</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="stat-num">{{ user.fans }}</text>
            <text class="stat-label">粉丝</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="stat-num">{{ user.likes }}</text>
            <text class="stat-label">获赞</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="stat-num">{{ user.follows }}</text>
            <text class="stat-label">关注</text>
          </view>
        </view>
        <!-- 编辑资料 -->
        <view class="edit-btn" @click="onEditProfile">
          <image src="/static/icon-edit.png" />
          <text>编辑资料</text>
        </view>
      </view>
    </view>

    <!-- 我的发布 / 收藏 切换 -->
    <view class="tab-section">
      <view class="tab-bar">
        <view
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-item"
          :class="{ active: currentTab === tab.key }"
          @click="currentTab = tab.key"
        >
          <text>{{ tab.label }}</text>
          <view v-if="currentTab === tab.key" class="tab-line"></view>
        </view>
      </view>

      <!-- 我的发布 -->
      <view v-if="currentTab === 'publish'" class="tab-content">
        <food-card
          v-for="item in myFoods"
          :key="item.id"
          :item="item"
          @update="loadData"
        />
        <view v-if="myFoods.length === 0" class="empty-state">
          <image src="/static/empty-food.png" />
          <text>还没有发布过美食哦~</text>
          <view class="go-publish" @click="goPublish">去发布</view>
        </view>
      </view>

      <!-- 我的收藏 -->
      <view v-if="currentTab === 'fav'" class="tab-content">
        <food-card
          v-for="item in myFavs"
          :key="item.id"
          :item="item"
          @update="loadData"
        />
        <view v-if="myFavs.length === 0" class="empty-state">
          <image src="/static/empty-fav.png" />
          <text>还没有收藏的美食~</text>
          <view class="go-publish" @click="goHome">去看看</view>
        </view>
      </view>
    </view>

    <!-- 底部菜单 -->
    <view class="menu-section">
      <view class="menu-item" @click="onMenu('history')">
        <image src="/static/icon-history.png" />
        <text>浏览历史</text>
        <image class="arrow" src="/static/icon-arrow-r.png" />
      </view>
      <view class="menu-item" @click="onMenu('about')">
        <image src="/static/icon-about.png" />
        <text>关于我们</text>
        <image class="arrow" src="/static/icon-arrow-r.png" />
      </view>
      <view class="menu-item" @click="onMenu('settings')">
        <image src="/static/icon-settings.png" />
        <text>设置</text>
        <image class="arrow" src="/static/icon-arrow-r.png" />
      </view>
    </view>
  </view>
</template>

<script>
import { apiGetUser, apiGetMyFoods, apiGetMyFavs } from '@/utils/mockData.js'
import FoodCard from '@/components/food-card/food-card.vue'

export default {
  components: { FoodCard },
  data() {
    return {
      user: {},
      currentTab: 'publish',
      tabs: [
        { key: 'publish', label: '我的发布' },
        { key: 'fav', label: '我的收藏' }
      ],
      myFoods: [],
      myFavs: []
    }
  },
  onShow() { this.loadData() },
  onPullDownRefresh() { this.loadData(); uni.stopPullDownRefresh() },
  methods: {
    loadData() {
      this.user = apiGetUser()
      this.myFoods = apiGetMyFoods()
      this.myFavs = apiGetMyFavs()
    },
    onEditAvatar() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          const { apiUpdateUser } = require('@/utils/mockData.js')
          apiUpdateUser({ avatar: res.tempFilePaths[0] })
          this.user = apiGetUser()
          uni.showToast({ title: '头像已更新', icon: 'success' })
        }
      })
    },
    onEditProfile() {
      uni.showModal({
        title: '编辑资料',
        editable: true,
        placeholderText: '输入昵称',
        content: this.user.nickname,
        success: res => {
          if (res.content && res.confirm) {
            const { apiUpdateUser } = require('@/utils/mockData.js')
            apiUpdateUser({ nickname: res.content })
            this.user = apiGetUser()
          }
        }
      })
    },
    goPublish() { uni.switchTab({ url: '/pages/list/list' }) },
    goHome() { uni.switchTab({ url: '/pages/home/home' }) },
    onMenu(key) {
      if (key === 'history') uni.showToast({ title: '历史功能开发中~', icon: 'none' })
      if (key === 'about') uni.showToast({ title: '暖心厨房 v1.0.0', icon: 'none' })
      if (key === 'settings') uni.showToast({ title: '设置功能开发中~', icon: 'none' })
    }
  }
}
</script>

<style scoped>
.profile-page { background: #f7f7f7; min-height: 100vh; padding-bottom: 40rpx; }

/* 顶部 */
.profile-header {
  position: relative;
  padding-bottom: 60rpx;
}
.header-bg {
  width: 100%;
  height: 380rpx;
  background: linear-gradient(135deg, #ff6b35, #ff9a6c);
  border-radius: 0 0 48rpx 48rpx;
}
.profile-info {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30rpx 30rpx;
}

/* 头像 */
.avatar-wrap {
  position: relative;
  margin-bottom: 20rpx;
}
.avatar {
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  border: 6rpx solid #fff;
  box-shadow: 0 8rpx 20rpx rgba(0,0,0,0.15);
}
.avatar-edit {
  position: absolute;
  bottom: 0; right: 0;
  width: 44rpx; height: 44rpx;
  background: #ff6b35;
  border-radius: 50%;
  border: 3rpx solid #fff;
  display: flex; align-items: center; justify-content: center;
}
.avatar-edit image { width: 24rpx; height: 24rpx; }

.nickname {
  font-size: 36rpx;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8rpx;
}
.bio {
  font-size: 24rpx;
  color: rgba(255,255,255,0.8);
  margin-bottom: 24rpx;
}

/* 数据 */
.stats-row {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.95);
  border-radius: 20rpx;
  padding: 24rpx 40rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08);
}
.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rpx;
}
.stat-num {
  font-size: 34rpx;
  font-weight: 700;
  color: #333;
}
.stat-label {
  font-size: 22rpx;
  color: #999;
}
.stat-divider {
  width: 1px;
  height: 40rpx;
  background: #eee;
}

.edit-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
  background: rgba(255,255,255,0.25);
  border: 1px solid rgba(255,255,255,0.5);
  color: #fff;
  padding: 12rpx 32rpx;
  border-radius: 40rpx;
  font-size: 26rpx;
}
.edit-btn image { width: 28rpx; height: 28rpx; }

/* 切换tab */
.tab-section { margin: 24rpx 30rpx; }
.tab-bar {
  display: flex;
  background: #fff;
  border-radius: 16rpx;
  padding: 8rpx;
  margin-bottom: 24rpx;
}
.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16rpx 0;
  font-size: 28rpx;
  color: #888;
  font-weight: 600;
  position: relative;
}
.tab-item.active { color: #ff6b35; }
.tab-line {
  position: absolute;
  bottom: -4rpx;
  width: 40rpx;
  height: 6rpx;
  background: linear-gradient(135deg, #ff6b35, #ff9a6c);
  border-radius: 6rpx;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80rpx 0;
  gap: 16rpx;
}
.empty-state image { width: 160rpx; height: 160rpx; }
.empty-state text { font-size: 26rpx; color: #bbb; }
.go-publish {
  margin-top: 12rpx;
  background: linear-gradient(135deg, #ff6b35, #ff9a6c);
  color: #fff; padding: 14rpx 40rpx; border-radius: 40rpx;
  font-size: 26rpx;
}

/* 底部菜单 */
.menu-section {
  margin: 0 30rpx;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  gap: 16rpx;
  border-bottom: 1px solid #f5f5f5;
}
.menu-item:last-child { border-bottom: none; }
.menu-item image { width: 40rpx; height: 40rpx; }
.menu-item text { flex: 1; font-size: 28rpx; color: #333; }
.menu-item .arrow { width: 24rpx; height: 24rpx; opacity: 0.4; }
</style>
