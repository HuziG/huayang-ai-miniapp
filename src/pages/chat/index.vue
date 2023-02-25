<template>
  <view class="wrapper">
    <view v-for="item in messageList">
      <MessageItem
        :text="item.text"
        :me="item.me"
        :time="item.time"
        :loading="item.loading"
      />
    </view>

    <view :style="{ height: '200rpx' }"></view>

    <view class="search-wrapper">
      <view
        class="search-input"
        :style="{
          backgroundColor: forbidInput ? '#eeeeee' : '#ffffff',
        }"
      >
        <input
          v-model="questionContent"
          type="text"
          placeholder="请输入问题内容"
          confirmType="done"
          :cursorSpacing="48"
          :focus="true"
          :disabled="forbidInput"
          @confirm="onConfirm"
        />
        <view class="tools">
          <image
            v-if="questionContent.length !== 0"
            :src="CloseRound"
            class="clear-button active-animation"
            @tap="questionContent = ''"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro from "@tarojs/taro";
import { onMounted, ref } from "vue";
import MessageItem from "./components/MessageItem/index.vue";
import "./index.scss";
import { CloseRound } from "@/assets/svg/index";
import { fetchChatAPI } from "@/api/chatgpt";

const {
  router: { params },
}: any = Taro.getCurrentInstance();

const parentMessageId = ref(""),
  messageList = ref<
    {
      conversationId: string;
      text: string;
      time: number;
      me: boolean;
      loading: boolean;
    }[]
  >([]);

const forbidInput = ref(false);
const questionContent = ref("");

const sendMessage = (content: string) => {
  forbidInput.value = true;

  messageList.value.push(
    generateMessage({ text: content, me: true, loading: false })
  );

  setTimeout(async () => {
    try {
      messageList.value.push(
        generateMessage({ text: content, me: false, loading: true })
      );

      const res = await fetchChatAPI(content, {
        parentMessageId: parentMessageId.value,
        conversationId: messageList.value[messageList.value.length - 1].conversationId,
      });

      parentMessageId.value = res.data.parentMessageId

      const callbackText: any = generateMessage({
        text: res.data.text,
        me: false,
        loading: false,
        conversationId: res.data.conversationId
      });
      messageList.value.splice(messageList.value.length - 1, 1, callbackText);
    } finally {
      forbidInput.value = false;
    }
  }, 500);
};

const generateMessage = (params: {
  text: string;
  loading: boolean;
  me: boolean;
  conversationId?: string
}) => {
  params["me"] = params.me;
  params["loading"] = params.loading;
  params["conversationId"] = params.conversationId || ''
  params["time"] = Math.floor(+new Date() / 1000);

  return params as any;
};

const onConfirm = () => {
  if (questionContent.value.trim() === "") {
    return false;
  }

  sendMessage(questionContent.value);

  questionContent.value = "";
};

onMounted(() => {
  sendMessage(params.content);

  // console.log(params.content);
});
</script>

<style scoped></style>
