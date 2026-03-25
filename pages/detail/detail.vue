<template>
  <view class="detail-page" v-if="food">
    <!-- 顶部大图 -->
    <view class="detail-cover">
      <swiper class="cover-swiper" circular :indicator-dots="true" indicator-color="rgba(255,255,255,0.4)" indicator-active-color="#fff">
        <swiper-item v-for="(img, idx) in coverImages" :key="idx">
          <image class="cover-img" :src="img" mode="aspectFill" />
        </swiper-item>
      </swiper>
      <!-- 返回按钮 -->
      <view class="back-btn" @click="goBack">
        <image src="/static/icon-back-w.png" />
      </view>
      <!-- 分享按钮 -->
      <view class="share-btn" @click="onShare">
        <image src="/static/icon-share-w.png" />
      </view>
    </view>

    <!-- 内容区 -->
    <view class="detail-body">
      <!-- 标题区块 -->
      <view class="detail-title-block">
        <view class="detail-tag-row">
          <text class="detail-tag">{{ food.tag }}</text>
          <text class="detail-diff">难度: {{ food.difficulty }}</text>
          <text class="detail-time">🕐 {{ food.time }}</text>
        </view>
        <view class="detail-title">{{ food.title }}</view>
        <view class="detail-desc">{{ food.desc }}</view>
        <!-- 作者信息 -->
        <view class="detail-author">
          <image class="author-avatar" :src="food.authorAvatar" />
          <view class="author-info">
            <text class="author-name">{{ food.author }}</text>
            <text class="author-time">{{ formatTime(food.createTime) }}</text>
          </view>
        </view>
      </view>

      <!-- 标签 -->
      <view class="detail-tags-section">
        <view
          v-for="tag in food.tags"
          :key="tag"
          class="detail-tag-item"
          @click="onTagClick(tag)"
        ># {{ tag }}</view>
      </view>

      <!-- 做法步骤 -->
      <view class="detail-steps-section">
        <view class="section-title">
          <view class="title-line"></view>
          <text>做法步骤</text>
          <view class="title-line"></view>
        </view>
        <view
          v-for="(step, idx) in food.steps"
          :key="idx"
          class="step-item"
        >
          <view class="step-num">{{ idx + 1 }}</view>
          <view class="step-content">
            <text class="step-text">{{ step.text }}</text>
            <image v-if="step.img" class="step-img" :src="step.img" mode="aspectFill" />
          </view>
        </view>
      </view>

      <!-- 底部操作栏 -->
      <view class="detail-bottom-bar">
        <view class="bottom-left">
          <view class="bottom-action" @click="onLike">
            <image :src="isLiked ? '/static/icon-like-on.png' : '/static/icon-like.png'" />
            <text :class="{ active: isLiked }">{{ food.likes }}</text>
          </view>
          <view class="bottom-action" @click="onFav">
            <image :src="isFaved ? '/static/icon-fav-on.png' : '/static/icon-fav.png'" />
            <text :class="{ active: isFaved }">{{ food.favs }}</text>
          </view>
          <view class="bottom-action" @click="onComment">
            <image src="/static/icon-comment.png" />
            <text>评论</text>
          </view>
        </view>
        <view class="bottom-right">
          <view class="btn-share" @click="onShare">
            <image src="/static/icon-share.png" />
            <text>分享</text>
          </view>
        </view>
      </view>
    </view>
  </view>
  <view v-else class="not-found">
    <text>内容不存在</text>
  </view>
</template>

<script>
import { apiGetFoodDetail, apiToggleLike, apiIsLiked, apiToggleFav, apiIsFaved } from '@/utils/mockData.js'

export default {
  data() {
    return {
      food: null,
      isLiked: false,
      isFaved: false
    }
  },
  computed: {
    coverImages() {
      if (!this.food) return []
      // 详情页多图：如果有 steps 图片则展示，否则用封面
      const imgs = this.food.steps.filter(s => s.img).map(s => s.img)
      return imgs.length ? [this.food.cover, ...imgs] : [this.food.cover]
    }
  },
  onLoad(opt) {
    this.food = apiGetFoodDetail(opt.id)
    if (this.food) {
      this.isLiked = apiIsLiked(this.food.id)
      this.isFaved = apiIsFaved(this.food.id)
    }
  },
  methods: {
    goBack() { uni.navigateBack() },
    onLike() {
      this.isLiked = apiToggleLike(this.food.id)
      uni.showToast({ title: this.isLiked ? '已点赞 ❤️' : '取消点赞', icon: 'none' })
    },
    onFav() {
      this.isFaved = apiToggleFav(this.food.id)
      uni.showToast({ title: this.isFaved ? '已收藏 🌟' : '取消收藏', icon: 'none' })
    },
    onComment() {
      uni.showToast({ title: '评论功能开发中~', icon: 'none' })
    },
    onShare() {
      uni.showToast({ title: '长按图片保存分享~', icon: 'none' })
    },
    onTagClick(tag) {
      uni.navigateTo({ url: `/pages/list/list?tag=${tag}` })
    },
    formatTime(ts) {
      const d = new Date(ts)
      return `${d.getMonth() + 1}月${d.getDate()}日`
    }
  }
}
</script>

<style scoped>
.detail-page { background: #f8f8f8; padding-bottom: 140rpx; }

/* 封面 */
.detail-cover { position: relative; }
.cover-swiper { height: 560rpx; }
.cover-img { width: 100%; height: 100%; }
.back-btn, .share-btn {
  position: absolute;
  top: 60rpx;
  width: 72rpx; height: 72rpx;
  background: rgba(0,0,0,0.35);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.back-btn { left: 30rpx; }
.share-btn { right: 30rpx; }
.back-btn image, .share-btn image { width: 36rpx; height: 36rpx; }

/* 内容 */
.detail-body { padding: 0 30rpx; }
.detail-title-block {
  background: #fff;
  border-radius: 0 0 24rpx 24rpx;
  margin: -20rpx 0 24rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);
}
.detail-tag-row {
  display: flex; align-items: center; gap: 16rpx; margin-bottom: 16rpx;
}
.detail-tag {
  background: linear-gradient(135deg, #ff6b35, #ff9a6c);
  color: #fff; font-size: 22rpx; padding: 6rpx 16rpx; border-radius: 20rpx;
}
.detail-diff, .detail-time { font-size: 22rpx; color: #888; }
.detail-title { font-size: 40rpx; font-weight: 700; color: #333; margin-bottom: 12rpx; }
.detail-desc { font-size: 26rpx; color: #666; line-height: 1.8; margin-bottom: 24rpx; }
.detail-author { display: flex; align-items: center; gap: 16rpx; }
.author-avatar { width: 64rpx; height: 64rpx; border-radius: 50%; }
.author-name { font-size: 26rpx; color: #333; font-weight: 600; display: block; }
.author-time { font-size: 22rpx; color: #aaa; }

/* 标签 */
.detail-tags-section {
  display: flex; flex-wrap: wrap; gap: 12rpx;
  background: #fff; padding: 24rpx 30rpx; border-radius: 16rpx; margin-bottom: 24rpx;
}
.detail-tag-item {
  background: #fff0eb; color: #ff6b35; font-size: 24rpx;
  padding: 8rpx 20rpx; border-radius: 24rpx;
}

/* 步骤 */
.detail-steps-section {
  background: #fff; border-radius: 16rpx; padding: 30rpx;
}
.section-title {
  display: flex; align-items: center; gap: 16rpx;
  font-size: 32rpx; font-weight: 700; color: #333; margin-bottom: 30rpx;
}
.title-line { flex: 1; height: 1px; background: #eee; }
.step-item {
  display: flex; gap: 24rpx; margin-bottom: 30rpx;
}
.step-item:last-child { margin-bottom: 0; }
.step-num {
  width: 48rpx; height: 48rpx; background: linear-gradient(135deg, #ff6b35, #ff9a6c);
  color: #fff; font-size: 24rpx; font-weight: 700;
  border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.step-content { flex: 1; }
.step-text { font-size: 28rpx; color: #444; line-height: 1.8; display: block; }
.step-img { width: 100%; height: 280rpx; border-radius: 12rpx; margin-top: 16rpx; }

/* 底部栏 */
.detail-bottom-bar {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: #fff; border-top: 1px solid #eee;
  display: flex; align-items: center; padding: 16rpx 40rpx;
  padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
  z-index: 100;
}
.bottom-left { flex: 1; display: flex; gap: 40rpx; }
.bottom-action { display: flex; align-items: center; gap: 8rpx; }
.bottom-action image { width: 44rpx; height: 44rpx; }
.bottom-action text { font-size: 24rpx; color: #888; }
.bottom-action text.active { color: #ff6b35; }
.bottom-right { }
.btn-share {
  display: flex; align-items: center; gap: 8rpx;
  background: linear-gradient(135deg, #ff6b35, #ff9a6c);
  color: #fff; padding: 14rpx 28rpx; border-radius: 40rpx;
}
.btn-share image { width: 28rpx; height: 28rpx; }
.btn-share text { font-size: 24rpx; }

.not-found { text-align: center; padding: 200rpx; color: #aaa; font-size: 28rpx; }
</style>
