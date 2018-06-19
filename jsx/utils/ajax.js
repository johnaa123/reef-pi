import SignIn from '../sign_in.jsx'

function makeHeaders () {
  let headers = new Headers()
  let creds = SignIn.getCreds()
  let authHeader = 'Basic ' + window.btoa(creds.user + ':' + creds.password)
  headers.append('Authorization', authHeader)
  headers.append('Content-Type', 'application/json')
  return (headers)
}

export function reduxGet (params) {
  return dispatch => {
    return fetch(params.url, {method: 'GET', headers: makeHeaders()})
      .then((response) => {
        if (!response.ok) {
          console.log(response.statusText)
        }
        return response
      })
      .then((response) => response.json())
      .then((data) => dispatch(params.success(data)))
      .catch(() => dispatch({ type: 'API_FAILURE', params: params }))
  }
}

export function reduxDelete (params) {
  return dispatch => {
    return fetch(params.url, {method: 'DELETE', headers: makeHeaders()})
      .then((response) => {
        if (!response.ok) {
          console.log(response.statusText)
        }
        return response
      })
      .then(() => dispatch(params.success()))
      .catch(() => dispatch({ type: 'API_FAILURE', params: params }))
  }
}

export function reduxPut (params) {
  return dispatch => {
    return fetch(params.url, {method: 'PUT', headers: makeHeaders(), body: JSON.stringify(params.data)})
      .then((response) => {
        if (!response.ok) {
          console.log(response.statusText)
        }
        return response
      })
      .then(() => dispatch(params.success()))
      .catch(() => dispatch({ type: 'API_FAILURE', params: params }))
  }
}

export function reduxPost (params) {
  return dispatch => {
    return fetch(params.url, {
      method: 'POST',
      headers: makeHeaders(),
      body: JSON.stringify(params.data)
    }).then((response) => {
      if (!response.ok) {
        console.log(response.statusText)
      }
      return response
    })
      .then((data) => dispatch(params.success(data)))
      .catch(() => dispatch({ type: 'API_FAILURE', params: params }))
  }
}
