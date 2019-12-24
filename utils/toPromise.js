let wxKeys = ["request", "login", "getWeRunData", 'uploadFile']

wxKeys.forEach(key => {
  const wxKeyFn = wx[key]
  if (wxKeyFn && typeof wxKeyFn === "function") {
    Object.defineProperty(wx, key, {
      get() {
        return (option = {}) => {
          return new Promise((resolve, reject) => {
            option.success = res => {
              resolve(res)
            }
            option.fail = res => {
              reject(res)
            }
            wxKeyFn(option)
          })
        }
      }
    })
  }
})
