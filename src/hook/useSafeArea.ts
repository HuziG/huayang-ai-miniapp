import Taro from '@tarojs/taro'

export default function (): {
  safeHeader: number
  safeBottom: number
} {
  const res: {
    safeArea?: {
      bottom: number
      top: number
    }
    screenHeight: number
  } = Taro.getSystemInfoSync()

  if (res.safeArea) {
    return {
      safeHeader: res.safeArea.top + 25,
      safeBottom: res.screenHeight - res.safeArea.bottom + 10,
    }
  } else {
    return {
      safeHeader: 0,
      safeBottom: 0
    }
  }
}
