<template>
  <view class="wrapper">
    <view class="content">
      <view class="title">花样 AI 聊天</view>

      <view class="search-input active-animation" @tap="onSearchFocus">
        你想问点啥呢？
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Taro from "@tarojs/taro";
import "./index.scss";

const onSearchFocus = () => {
  Taro.navigateTo({
    url: '/pages/searchInput/index'
  })
}
</script>
