<template>
  <view class="nav-bar" :style="{ background: bgColor }">
    <view class="nav-content" :style="{ paddingTop: statusBarHeight + 'px' }">
      <!-- 左侧 -->
      <view class="nav-left" @click="onLeft">
        <image v-if="showBack" class="nav-icon" src="/static/icon-back.png" />
        <slot name="left"></slot>
      </view>
      <!-- 标题 -->
      <view class="nav-title">
        <text class="title-text">{{ title }}</text>
      </view>
      <!-- 右侧 -->
      <view class="nav-right">
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    title: String,
    bgColor: { type: String, default: '#fff' },
    showBack: { type: Boolean, default: false }
  },
  data() {
    return {
      statusBarHeight: 20
    }
  },
  created() {
    const systemInfo = uni.getSystemInfoSync()
    this.statusBarHeight = systemInfo.statusBarHeight || 20
  },
  methods: {
    onLeft() {
      if (this.showBack) {
        uni.navigateBack()
      }
      this.$emit('leftClick')
    }
  }
}
</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.nav-content {
  height: 88rpx;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
}
.nav-left, .nav-right {
  width: 80rpx;
  display: flex;
  align-items: center;
}
.nav-icon {
  width: 44rpx;
  height: 44rpx;
}
.nav-title {
  flex: 1;
  text-align: center;
}
.title-text {
  font-size: 34rpx;
  font-weight: 600;
  color: #333;
}
</style>
