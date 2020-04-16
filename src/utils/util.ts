export function navigateTo(url: string, query: any = {}) {
  let queryUrl: string = ''
  for (const key in query) {
    queryUrl += `${key}=${query[key]}&`
  }
  queryUrl = queryUrl.split('').splice(0, queryUrl.length - 1).join('')
  console.log('queryUrl: ', queryUrl)
  Taro.navigateTo({
    url: `${url}?${queryUrl}`
  })
}