<template>
  <view class="wrapper">
    <view v-for="item in messageList">
      <MessageItem
        :text="item.text"
        :me="item.me"
        :time="item.time"
        :status="item.status"
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

const conversationId = ref(""),
  messageList = ref<
    {
      parentMessageId: string;
      text: string;
      time: number;
      me: boolean;
      status: string;
    }[]
  >([]);

const forbidInput = ref(false);
const questionContent = ref("");

const getParentMessageId = () => {
  const parents = messageList.value.filter((item) => item.parentMessageId);
  return parents[parents.length - 1]?.parentMessageId || "";
};

const sendMessage = (content: string) => {
  forbidInput.value = true;

  messageList.value.push(
    generateMessage({
      text: content,
      me: true,
      status: "success",
    })
  );

  setTimeout(() => {
    Taro.pageScrollTo({
      scrollTop: 99999999,
      duration: 100,
    });
  }, 200);

  setTimeout(async () => {
    try {
      messageList.value.push(
        generateMessage({
          text: content,
          me: false,
          status: "loading",
        })
      );

      // 消息请求/
      const res = await fetchChatAPI(
        content,
        conversationId.value
          ? {
              parentMessageId: getParentMessageId(),
              conversationId: conversationId.value,
            }
          : {
              parentMessageId: getParentMessageId(),
            }
      );

      conversationId.value = res.data.conversationId;

      const callbackText: any = generateMessage({
        text: res.data.text,
        me: false,
        status: "success",
        parentMessageId: res.data.parentMessageId,
      });

      messageList.value.splice(messageList.value.length - 1, 1, callbackText);
    } catch (e) {
      const callbackText: any = generateMessage({
        text: JSON.stringify(e || ""),
        me: false,
        status: "fail",
      });

      messageList.value.splice(messageList.value.length - 1, 1, callbackText);
    } finally {
      Taro.vibrateShort({ type: "medium" });
      forbidInput.value = false;

      setTimeout(() => {
        Taro.pageScrollTo({
          scrollTop: 99999999,
          duration: 100,
        });
      }, 300);
    }
  }, 500);
};

const generateMessage = (params: {
  text: string;
  me: boolean;
  parentMessageId?: string;
  status: "fail" | "success" | "loading";
}) => {
  params["me"] = params.me;
  if (params.parentMessageId) {
    params["parentMessageId"] = params.parentMessageId;
  }
  params["time"] = Math.floor(+new Date() / 1000);
  params["status"] = params.status;

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
});
</script>

<style scoped></style>
