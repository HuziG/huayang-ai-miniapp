<template>
  <view>
    <view class="search-wrapper">
      <view class="search-input">
        <input
          v-model="question"
          type="text"
          placeholder="输入一些问题？"
          confirmType="done"
          :cursorSpacing="48"
          :focus="true"
          @confirm="onConfirm"
        />

        <view class="tools">
          <image
            :src="CloseRound"
            class="clear-button active-animation"
            @tap="question = ''"
          />

          <view class="back-button active-animation" @tap="onBack">取消</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "./index.scss";
import { CloseRound } from "@/assets/svg/index";
import Taro from "@tarojs/taro";

const question = ref("");

const onConfirm = () => {};

const onBack = () => {
  Taro.navigateBack({
    delta: 1,
  });
};
</script>
