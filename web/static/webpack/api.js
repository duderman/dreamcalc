const ROOT_URL = 'http://localhost:4000/api'
const url = path => `${ROOT_URL}/${path}`

const Api = {
  checkEmail: function (email) {
    return fetch(url('check_email'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    .then(statusHelper)
  }
}

function statusHelper (response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

export default Api
