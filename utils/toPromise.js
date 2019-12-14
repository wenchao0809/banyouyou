let wxKeys = ["request", "login", "getWeRunData"]

wxKeys.forEach(key => {
  const wxKeyFn = wx[key]
  if (wxKeyFn && typeof wxKeyFn === "function") {
    Object.defineProperty(wx, key, {
      get() {
        return (option = {}) => {
          return new Promise((resolve, reject) => {
            option.complete = res => {
              resolve(res)
            }
            // option.success = res => {
            //   resolve(res)
            // }
            // option.fail = res => {
            //   reject(res)
            // }
            wxKeyFn(option)
          })
        }
      }
    })
  }
})
