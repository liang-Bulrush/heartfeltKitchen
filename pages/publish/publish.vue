<template>
  <view class="publish-page">
    <!-- 顶部 -->
    <view class="pub-header">
      <text class="pub-cancel" @click="goBack">取消</text>
      <text class="pub-title">发布美食</text>
      <text class="pub-submit" :class="{ ready: canSubmit }" @click="onSubmit">发布</text>
    </view>

    <!-- 封面图 -->
    <view class="pub-section">
      <view class="section-label">封面图片</view>
      <view class="cover-uploader" @click="chooseCover">
        <image v-if="form.cover" :src="form.cover" class="cover-preview" mode="aspectFill" />
        <view v-else class="cover-placeholder">
          <image src="/static/icon-camera.png" />
          <text>添加封面图</text>
        </view>
      </view>
    </view>

    <!-- 美食名称 -->
    <view class="pub-section">
      <view class="section-label">美食名称</view>
      <input
        class="pub-input"
        placeholder="例如：红烧肉、番茄炒蛋..."
        placeholder-class="pub-placeholder"
        v-model="form.title"
        maxlength="30"
      />
    </view>

    <!-- 标签选择 -->
    <view class="pub-section">
      <view class="section-label">分类标签</view>
      <view class="tag-grid">
        <view
          v-for="tag in tagOptions"
          :key="tag"
          class="tag-option"
          :class="{ active: form.tag === tag }"
          @click="form.tag = tag"
        >{{ tag }}</view>
      </view>
    </view>

    <!-- 简介 -->
    <view class="pub-section">
      <view class="section-label">美食简介</view>
      <textarea
        class="pub-textarea"
        placeholder="简单介绍一下这道菜的特点、口味..."
        placeholder-class="pub-placeholder"
        v-model="form.desc"
        maxlength="200"
      />
      <view class="word-count">{{ form.desc.length }}/200</view>
    </view>

    <!-- 做法步骤 -->
    <view class="pub-section">
      <view class="section-label-row">
        <text class="section-label">做法步骤</text>
        <text class="add-step-btn" @click="addStep">+ 添加步骤</text>
      </view>
      <view v-for="(step, idx) in form.steps" :key="idx" class="step-row">
        <view class="step-num">{{ idx + 1 }}</view>
        <textarea
          class="step-input"
          placeholder="描述这一步的做法..."
          placeholder-class="pub-placeholder"
          v-model="step.text"
          maxlength="200"
        />
        <view class="step-img-wrap" @click="chooseStepImg(idx)">
          <image v-if="step.img" :src="step.img" class="step-img" mode="aspectFill" />
          <image v-else src="/static/icon-camera.png" class="step-add-img" />
        </view>
        <image v-if="form.steps.length > 1" src="/static/icon-delete.png" class="step-del" @click="removeStep(idx)" />
      </view>
    </view>

    <!-- 其他标签 -->
    <view class="pub-section">
      <view class="section-label">相关标签（可多选）</view>
      <view class="tag-grid">
        <view
          v-for="t in allTags"
          :key="t"
          class="tag-option"
          :class="{ active: form.tags.includes(t) }"
          @click="toggleTag(t)"
        >{{ t }}</view>
      </view>
    </view>

    <!-- 时间 & 难度 -->
    <view class="pub-section row-section">
      <view class="half-section">
        <view class="section-label">烹饪时间</view>
        <picker mode="selector" :range="timeOptions" range-key="label" @change="onTimeChange">
          <view class="pub-picker">
            {{ currentTime.label }} <image src="/static/icon-arrow.png" />
          </view>
        </picker>
      </view>
      <view class="half-section">
        <view class="section-label">难度</view>
        <picker mode="selector" :range="diffOptions" range-key="label" @change="onDiffChange">
          <view class="pub-picker">
            {{ currentDiff.label }} <image src="/static/icon-arrow.png" />
          </view>
        </picker>
      </view>
    </view>
  </view>
</template>

<script>
import { apiAddFood } from '@/utils/mockData.js'

export default {
  data() {
    return {
      form: {
        cover: '',
        title: '',
        tag: '硬菜',
        desc: '',
        steps: [{ text: '', img: '' }],
        tags: [],
        time: '60分钟',
        difficulty: '中等'
      },
      tagOptions: ['硬菜', '素菜', '汤品', '主食', '甜点', '快手'],
      allTags: ['家常', '下饭', '快手', '健康', '素食', '小朋友爱', '硬菜', '川菜', '粤菜', '早餐', '晚餐', '甜品'],
      timeOptions: [
        { label: '5分钟', value: '5分钟' },
        { label: '10分钟', value: '10分钟' },
        { label: '15分钟', value: '15分钟' },
        { label: '30分钟', value: '30分钟' },
        { label: '45分钟', value: '45分钟' },
        { label: '60分钟', value: '60分钟' },
        { label: '90分钟', value: '90分钟' },
        { label: '2小时以上', value: '2小时以上' },
      ],
      diffOptions: [
        { label: '简单', value: '简单' },
        { label: '中等', value: '中等' },
        { label: '困难', value: '困难' },
      ],
      currentTime: { label: '60分钟', value: '60分钟' },
      currentDiff: { label: '中等', value: '中等' },
      currentStepIdx: 0
    }
  },
  computed: {
    canSubmit() {
      return this.form.title.trim() && this.form.desc.trim() &&
        this.form.steps.some(s => s.text.trim())
    }
  },
  methods: {
    goBack() { uni.navigateBack() },
    chooseCover() {
      uni.chooseImage({ count: 1, sizeType: ['compressed'], sourceType: ['album', 'camera'],
        success: res => { this.form.cover = res.tempFilePaths[0] }
      })
    },
    addStep() {
      this.form.steps.push({ text: '', img: '' })
    },
    removeStep(idx) {
      this.form.steps.splice(idx, 1)
    },
    chooseStepImg(idx) {
      this.currentStepIdx = idx
      uni.chooseImage({ count: 1, sizeType: ['compressed'], sourceType: ['album', 'camera'],
        success: res => { this.form.steps[idx].img = res.tempFilePaths[0] }
      })
    },
    toggleTag(t) {
      const idx = this.form.tags.indexOf(t)
      if (idx > -1) this.form.tags.splice(idx, 1)
      else this.form.tags.push(t)
    },
    onTimeChange(e) {
      this.currentTime = this.timeOptions[e.detail.value]
      this.form.time = this.currentTime.value
    },
    onDiffChange(e) {
      this.currentDiff = this.diffOptions[e.detail.value]
      this.form.difficulty = this.currentDiff.value
    },
    onSubmit() {
      if (!this.canSubmit) {
        uni.showToast({ title: '请填写完整信息', icon: 'none' })
        return
      }
      // 使用默认封面图
      const cover = this.form.cover ||
        'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&h=400&fit=crop'
      const food = apiAddFood({
        cover,
        title: this.form.title.trim(),
        tag: this.form.tag,
        desc: this.form.desc.trim(),
        steps: this.form.steps.filter(s => s.text.trim()),
        tags: this.form.tags,
        time: this.form.time,
        difficulty: this.form.difficulty
      })
      uni.showToast({ title: '发布成功 🎉', icon: 'success' })
      setTimeout(() => {
        uni.navigateBack()
      }, 1200)
    }
  }
}
</script>

<style scoped>
.publish-page { background: #f7f7f7; min-height: 100vh; padding-bottom: 60rpx; }

/* 顶部 */
.pub-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 60rpx 30rpx 24rpx;
  background: #fff; border-bottom: 1px solid #f0f0f0;
  position: sticky; top: 0; z-index: 10;
}
.pub-cancel { font-size: 28rpx; color: #888; }
.pub-title { font-size: 34rpx; font-weight: 700; color: #333; }
.pub-submit {
  font-size: 28rpx; color: #ccc; font-weight: 600;
  background: none; border: none;
}
.pub-submit.ready { color: #ff6b35; }

/* 区块 */
.pub-section { background: #fff; margin: 20rpx 0; padding: 30rpx; }
.section-label { font-size: 28rpx; font-weight: 600; color: #333; margin-bottom: 16rpx; }
.section-label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16rpx; }
.add-step-btn { font-size: 26rpx; color: #ff6b35; }

/* 封面 */
.cover-uploader {
  width: 100%; height: 380rpx; border-radius: 16rpx; overflow: hidden;
  border: 2px dashed #e0e0e0;
}
.cover-preview { width: 100%; height: 100%; }
.cover-placeholder {
  width: 100%; height: 100%;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12rpx; color: #ccc;
}
.cover-placeholder image { width: 64rpx; height: 64rpx; }
.cover-placeholder text { font-size: 26rpx; }

/* 输入框 */
.pub-input {
  font-size: 30rpx; color: #333;
  background: #f7f7f7; border-radius: 12rpx;
  padding: 20rpx 24rpx;
}
.pub-textarea {
  font-size: 28rpx; color: #333;
  background: #f7f7f7; border-radius: 12rpx;
  padding: 20rpx 24rpx;
  width: 100%; box-sizing: border-box;
  min-height: 160rpx;
}
.word-count { text-align: right; font-size: 22rpx; color: #bbb; margin-top: 8rpx; }

/* 标签 */
.tag-grid { display: flex; flex-wrap: wrap; gap: 12rpx; }
.tag-option {
  padding: 10rpx 24rpx; border-radius: 24rpx;
  font-size: 24rpx; color: #666; background: #f0f0f0;
}
.tag-option.active { background: #fff0eb; color: #ff6b35; font-weight: 600; }

/* 步骤 */
.step-row {
  display: flex; align-items: flex-start; gap: 16rpx;
  margin-bottom: 20rpx;
}
.step-num {
  width: 44rpx; height: 44rpx; background: linear-gradient(135deg, #ff6b35, #ff9a6c);
  color: #fff; font-size: 22rpx; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 8rpx;
}
.step-input {
  flex: 1; background: #f7f7f7; border-radius: 12rpx;
  padding: 16rpx 20rpx; font-size: 26rpx; min-height: 80rpx;
}
.step-img-wrap {
  width: 100rpx; height: 100rpx; border-radius: 12rpx; overflow: hidden;
  border: 2px dashed #e0e0e0; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.step-img { width: 100%; height: 100%; border: none; }
.step-add-img { width: 36rpx; height: 36rpx; opacity: 0.4; }
.step-del { width: 36rpx; height: 36rpx; flex-shrink: 0; margin-top: 8rpx; }

/* picker */
.row-section { display: flex; gap: 30rpx; }
.half-section { flex: 1; }
.pub-picker {
  display: flex; align-items: center; justify-content: space-between;
  background: #f7f7f7; border-radius: 12rpx; padding: 18rpx 24rpx;
  font-size: 28rpx; color: #333;
}
.pub-picker image { width: 24rpx; height: 24rpx; opacity: 0.5; }
</style>
