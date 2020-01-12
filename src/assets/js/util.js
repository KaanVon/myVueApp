let util = {

}


util.getUser = function () {
  let user = sessionStorage.getItem('caiwu-User')
  if (user) {
    return JSON.parse(user)
  }
  return null
}

util.setUser = function (value) {
  sessionStorage.setItem('caiwu-User', value)
}

util.removeUser = function (value) {
  sessionStorage.removeItem('caiwu-User', value)
}

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
      return true
    } else {
      return false
    }
  }

  util.serverUrl = function () {
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:49993'
    } else if (process.env.NODE_ENV === 'test') {
      return 'http://localhost:49993'
    } else if (process.env.NODE_ENV === 'production') {
      return 'http://localhost:49993'
    }
  }
  
  export default util