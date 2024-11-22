<template>
  <view class="content">
    <image class="logo" src="@/static/back.png" />
    <span class="title">心意厨房</span>
    <span class="desc">热气腾腾~人间烟火</span>
  </view>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
@import "@/styles/common.scss";
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgb(84,211,57,0.1);
  height: 100vh;
  .logo {
    height: 300rpx;
    width: 300rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }
  .title {
    font-size: 48rpx;
    color: $primary-color;
  }
  .desc {
    font-size: 32rpx;
  }
}
</style>
