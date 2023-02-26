<template>
  <view v-if="props.me" class="me-wrapper">
    <view class="message-wrapper">
      <view class="time">{{ time }}</view>
      <text class="text">{{ props.text }}</text>
    </view>
    <view class="avatar"></view>
  </view>
  <view v-else class="robot-wrapper">
    <view class="avatar"></view>
    <view class="message-wrapper">
      <view class="time">{{ time }}</view>
      <view class="text">
        <view v-if="props.status === 'loading'">
          <view class="cursor"></view>
        </view>
        <text v-if="props.status === 'success'">
          {{ props.text }}
        </text>
        <text v-if="props.status === 'fail'" :style="{ color: 'red' }">
          {{ props.text }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import "./index.scss";
import * as dayjs from "dayjs";
import { computed } from "vue";

const props = defineProps<{
  me: boolean;
  text: string;
  time: number;
  status: string;
}>();

const time = computed(() => {
  return dayjs(props.time * 1000).format("YYYY/M/D HH:mm:ss");
});
</script>

<style scoped></style>
