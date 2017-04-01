const Api = {
  checkEmail: function (email) {
    let data = new FormData()
    data.append('email', email)

    fetch(`http://localhost:3001/check_email`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })
    .then(statusHelper)
    .then(response => response.json())
    .catch(error => error)
    .then(data => {
      return data
    })
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
