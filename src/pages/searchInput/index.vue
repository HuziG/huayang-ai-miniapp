<template>
  <view
    :style="{
      height: safeHeader + 'px',
    }"
  ></view>

  <view class="history-content">
    <view
      v-for="item in historyQuestion"
      class="history-item active-animation"
      @tap="onCheckHistory(item.content)"
    >
      {{ item.content }}
    </view>
    <view
      v-if="historyQuestion.length !== 0"
      class="clear-history active-animation"
      @tap="onClearHistory"
    >
      清空历史
    </view>
  </view>

  <view :style="{ height: '200rpx' }"></view>

  <view class="search-wrapper">
    <view class="search-input">
      <input
        v-model="questionContent"
        type="text"
        placeholder="请输入问题内容"
        confirmType="done"
        :cursorSpacing="48"
        :focus="true"
        @confirm="onConfirm"
      />
      <view class="tools">
        <image
          v-if="questionContent.length !== 0"
          :src="CloseRound"
          class="clear-button active-animation"
          @tap="questionContent = ''"
        />
        <view class="back-button active-animation" @tap="onBack">取消</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import "./index.scss";
import { ref } from "vue";
import Taro from "@tarojs/taro";
import { CloseRound } from "@/assets/svg/index";
import useSafeArea from "@/hook/useSafeArea";
import { HISTORY_SEARCH } from "@/enum/index";

const historyQuestion = ref<
  {
    content: string;
  }[]
>(Taro.getStorageSync(HISTORY_SEARCH) || []);

const questionContent = ref("");

const { safeHeader } = useSafeArea();

const onConfirm = () => {
  if (questionContent.value.trim() === "") {
    return false;
  }

  historyQuestion.value.unshift({
    content: questionContent.value,
  });

  historyQuestion.value = historyQuestion.value.slice(0, 5);

  const content = questionContent.value;

  questionContent.value = "";

  Taro.setStorageSync(HISTORY_SEARCH, historyQuestion.value);

  Taro.navigateTo({
    url: `/pages/chat/index?content=${content}`,
  });
};

const onClearHistory = () => {
  Taro.showModal({
    title: "提示",
    content: "确定清除历史记录？",
    success: function (res) {
      if (res.confirm) {
        historyQuestion.value = [];
        Taro.setStorageSync(HISTORY_SEARCH, historyQuestion.value);
      } else if (res.cancel) {
        console.log("cancel");
      }
    },
  });
};

const onCheckHistory = (content: string) => {
  Taro.navigateTo({
    url: `/pages/chat/index?content=${content}`,
  });
};

const onBack = () => {
  Taro.navigateBack({
    delta: 1,
  });
};
</script>
