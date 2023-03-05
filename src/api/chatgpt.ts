import Taro from "@tarojs/taro";
import HttpFilter from '@/utils/http'

const BASE_URL = "http://127.0.0.1:3002";

// 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

export const fetchChatAPI = async (
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string }
): {
  data: {
    conversationId: string
    parentMessageId: string
    id: string
    text: string
  }
} => {
  const data = await Taro.request({
    url: BASE_URL + "/chat",
    method: "POST",
    header: {
      // Authorization: encodeHeaderToken(),
    },
    data: { prompt, options },
  });

  return HttpFilter(data) as any
}
