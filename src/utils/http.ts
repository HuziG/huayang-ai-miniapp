export default function(reqResult: {
  statusCode: number
  data: any
}): any {
  return new Promise((resolve, reject) => {
    if (reqResult.statusCode === 200) {
      resolve(reqResult.data)
    } else {
      reject('request error')
    }
  })
}
