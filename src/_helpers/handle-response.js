export function handleResponse(response) {
    return response.text().then(text => {
      const data = JSON.parse(text) ? text && JSON.parse(text) : null
      
      if ( [ 200 ].indexOf(response.status) !== -1 ) {
              return Promise.resolve(data)
      }else {
          if ([ 403 , 400 , 404 ].indexOf(response.status) !== -1) {
              return Promise.reject({error : response.status });
          } else if([ 500 , 502 , 503 ].indexOf(response.status) !== -1) {
              return Promise.reject({error : response.status })
          } else if( [ 401 ].indexOf(response.status) !== -1 ) {
              return Promise.reject({ error : response.status , status: response.status })
          } else 
              return Promise.reject({error : response.status });
          }    
      });
  }