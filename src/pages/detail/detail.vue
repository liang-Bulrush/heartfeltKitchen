<template>
  <view class="detail-page" v-if="food">
    <view class="detail-cover">
      <swiper class="cover-swiper" circular :indicator-dots="true" indicator-color="rgba(255,255,255,0.4)" indicator-active-color="#fff">
        <swiper-item><image class="cover-img" :src="food.cover" mode="aspectFill" /></swiper-item>
      </swiper>
      <view class="back-btn" @click="goBack"><image src="/src/static/icon-back-w.png" /></view>
    </view>
    <view class="detail-body">
      <view class="detail-title-block">
        <view class="detail-tag-row">
          <text class="detail-tag">{{ food.tag }}</text>
          <text class="detail-diff">难度: {{ food.difficulty }}</text>
          <text class="detail-time">🕐 {{ food.time }}</text>
        </view>
        <view class="detail-title">{{ food.title }}</view>
        <view class="detail-desc">{{ food.desc }}</view>
        <view class="detail-author">
          <image class="author-avatar" :src="food.authorAvatar" />
          <text class="author-name">{{ food.author }}</text>
        </view>
      </view>
      <view class="detail-tags">
        <text v-for="tag in food.tags" :key="tag" class="tag-item"># {{ tag }}</text>
      </view>
      <view class="detail-steps">
        <view class="section-title">做法步骤</view>
        <view v-for="(step, idx) in food.steps" :key="idx" class="step-item">
          <view class="step-num">{{ idx + 1 }}</view>
          <text class="step-text">{{ step.text }}</text>
        </view>
      </view>
    </view>
    <view class="detail-bottom-bar">
      <view class="bottom-action" @click="onLike">
        <image :src="isLiked ? '/src/static/icon-like-on.png' : '/src/static/icon-like.png'" />
        <text :class="{ active: isLiked }">{{ food.likes }}</text>
      </view>
      <view class="bottom-action" @click="onFav">
        <image :src="isFaved ? '/src/static/icon-fav-on.png' : '/src/static/icon-fav.png'" />
        <text :class="{ active: isFaved }">{{ food.favs }}</text>
      </view>
      <view class="bottom-action" @click="onShare">
        <image src="/src/static/icon-share.png" />
        <text>分享</text>
      </view>
    </view>
  </view>
</template>

<script>
import { apiGetFoodDetail, apiToggleLike, apiIsLiked, apiToggleFav, apiIsFaved } from '@/utils/mockData.js'

export default {
  data() { return { food: null, isLiked: false, isFaved: false } },
  onLoad(opt) {
    this.food = apiGetFoodDetail(opt.id)
    if (this.food) { this.isLiked = apiIsLiked(this.food.id); this.isFaved = apiIsFaved(this.food.id) }
  },
  methods: {
    goBack() { uni.navigateBack() },
    onLike() { this.isLiked = apiToggleLike(this.food.id) },
    onFav() { this.isFaved = apiToggleFav(this.food.id) },
    onShare() { uni.showToast({ title: '长按图片保存分享', icon: 'none' }) }
  }
}
</script>

<style scoped>
.detail-page { background: #f8f8f8; padding-bottom: 140rpx; }
.detail-cover { position: relative; }
.cover-swiper { height: 560rpx; }
.cover-img { width: 100%; height: 100%; }
.back-btn { position: absolute; top: 60rpx; left: 30rpx; width: 72rpx; height: 72rpx; background: rgba(0,0,0,0.35); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.back-btn image { width: 36rpx; height: 36rpx; }
.detail-body { padding: 0 30rpx; }
.detail-title-block { background: #fff; border-radius: 0 0 24rpx 24rpx; margin: -20rpx 0 24rpx; padding: 30rpx; }
.detail-tag-row { display: flex; align-items: center; gap: 16rpx; margin-bottom: 16rpx; }
.detail-tag { background: linear-gradient(135deg, #ff6b35, #ff9a6c); color: #fff; font-size: 22rpx; padding: 6rpx 16rpx; border-radius: 20rpx; }
.detail-diff, .detail-time { font-size: 22rpx; color: #888; }
.detail-title { font-size: 40rpx; font-weight: 700; color: #333; margin-bottom: 12rpx; }
.detail-desc { font-size: 26rpx; color: #666; line-height: 1.8; margin-bottom: 24rpx; }
.detail-author { display: flex; align-items: center; gap: 16rpx; }
.author-avatar { width: 64rpx; height: 64rpx; border-radius: 50%; }
.author-name { font-size: 26rpx; color: #333; font-weight: 600; }
.detail-tags { display: flex; flex-wrap: wrap; gap: 12rpx; background: #fff; padding: 24rpx 30rpx; border-radius: 16rpx; margin-bottom: 24rpx; }
.tag-item { background: #fff0eb; color: #ff6b35; font-size: 24rpx; padding: 8rpx 20rpx; border-radius: 24rpx; }
.detail-steps { background: #fff; border-radius: 16rpx; padding: 30rpx; }
.section-title { font-size: 32rpx; font-weight: 700; color: #333; margin-bottom: 30rpx; }
.step-item { display: flex; gap: 24rpx; margin-bottom: 24rpx; }
.step-num { width: 48rpx; height: 48rpx; background: linear-gradient(135deg, #ff6b35, #ff9a6c); color: #fff; font-size: 24rpx; font-weight: 700; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.step-text { font-size: 28rpx; color: #444; line-height: 1.8; flex: 1; }
.detail-bottom-bar { position: fixed; bottom: 0; left: 0; right: 0; background: #fff; border-top: 1px solid #eee; display: flex; justify-content: space-around; padding: 20rpx 40rpx; padding-bottom: calc(20rpx + env(safe-area-inset-bottom)); }
.bottom-action { display: flex; align-items: center; gap: 8rpx; }
.bottom-action image { width: 44rpx; height: 44rpx; }
.bottom-action text { font-size: 24rpx; color: #888; }
.bottom-action text.active { color: #ff6b35; }
</style>