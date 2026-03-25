<template>
  <view class="food-card" @click="goDetail">
    <!-- 封面图 -->
    <view class="card-cover">
      <image class="cover-img" :src="item.cover" mode="aspectFill" />
      <view class="cover-tag">{{ item.tag }}</view>
      <view class="cover-overlay">
        <text class="difficulty">{{ item.difficulty }}</text>
        <text class="time">{{ item.time }}</text>
      </view>
    </view>

    <!-- 内容 -->
    <view class="card-body">
      <view class="card-title">{{ item.title }}</view>
      <view class="card-desc">{{ item.desc }}</view>

      <!-- 作者行 -->
      <view class="card-author">
        <image class="author-avatar" :src="item.authorAvatar" />
        <text class="author-name">{{ item.author }}</text>
      </view>

      <!-- 点赞收藏 -->
      <view class="card-actions">
        <view class="action-item" @click.stop="onLike">
          <image
            class="action-icon"
            :src="isLiked ? '/static/icon-like-on.png' : '/static/icon-like.png'"
          />
          <text class="action-count">{{ item.likes }}</text>
        </view>
        <view class="action-item" @click.stop="onFav">
          <image
            class="action-icon"
            :src="isFaved ? '/static/icon-fav-on.png' : '/static/icon-fav.png'"
          />
          <text class="action-count">{{ item.favs }}</text>
        </view>
        <view class="action-item">
          <image class="action-icon" src="/static/icon-share.png" />
          <text class="action-count">分享</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { apiToggleLike, apiIsLiked, apiToggleFav, apiIsFaved } from '@/utils/mockData.js'

export default {
  name: 'FoodCard',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLiked: false,
      isFaved: false
    }
  },
  onLoad() {
    this.isLiked = apiIsLiked(this.item.id)
    this.isFaved = apiIsFaved(this.item.id)
  },
  methods: {
    goDetail() {
      uni.navigateTo({ url: `/pages/detail/detail?id=${this.item.id}` })
    },
    onLike() {
      this.isLiked = apiToggleLike(this.item.id)
      // 通知父组件刷新
      this.$emit('update')
    },
    onFav() {
      this.isFaved = apiToggleFav(this.item.id)
      this.$emit('update')
    }
  }
}
</script>

<style scoped>
.food-card {
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
}

/* 封面 */
.card-cover {
  position: relative;
  height: 380rpx;
  overflow: hidden;
}
.cover-img {
  width: 100%;
  height: 100%;
}
.cover-tag {
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  background: linear-gradient(135deg, #ff6b35, #ff9a6c);
  color: #fff;
  font-size: 22rpx;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
}
.cover-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16rpx 20rpx;
  background: linear-gradient(transparent, rgba(0,0,0,0.5));
  display: flex;
  justify-content: space-between;
}
.difficulty, .time {
  color: #fff;
  font-size: 22rpx;
}

/* 内容 */
.card-body {
  padding: 24rpx;
}
.card-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #333;
  margin-bottom: 12rpx;
}
.card-desc {
  font-size: 24rpx;
  color: #888;
  line-height: 1.6;
  margin-bottom: 20rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* 作者 */
.card-author {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}
.author-avatar {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  margin-right: 10rpx;
}
.author-name {
  font-size: 24rpx;
  color: #999;
}

/* 点赞收藏 */
.card-actions {
  display: flex;
  align-items: center;
  border-top: 1px solid #f0f0f0;
  padding-top: 20rpx;
}
.action-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
}
.action-icon {
  width: 40rpx;
  height: 40rpx;
}
.action-count {
  font-size: 24rpx;
  color: #888;
}
</style>
