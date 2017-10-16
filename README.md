## @valkyriestudios/net

A lightweight promise-based XHR module

`npm install @valkyriestudios/net`

##Performing an XHR call

Performing an XHR call is as easy as calling the method on the Net class and piping it to a resolve/reject
```
Net.get('https://my.funky.api/myfunkyendpoint').then(
	(response) => console.log(response.data),
	(error) => { ... }
);
```

## Functionality

### Net.configure(options={})
Configures global options for the Net class, any subsequent XHR call done through the Net proxy wrapper will use these new configuration options.

### Net.get(url, options={})
Performs a GET xhr call to the passed url with the options as an optional configuration

### Net.post(url, options={})
Performs a POST xhr call to the passed url with the options as an optional configuration

### Net.delete(url, options={})
Performs a DELETE xhr call to the passed url with the options as an optional configuration

### Net.put(url, options={})
Performs a PUT xhr call to the passed url with the options as an optional configuration

### Net.options(url, options={})
Performs a preflight OPTIONS call to the passed url with the options as an optional configuration

### Net.head(url, options={})
Performs a HEAD call to the passed url with the options as an optional configuration

### Net.request(url, options={})
Performs an xhr call to the passed url with the options as an optional configuration. The method that the XHR call will use can be defined in the options as (for example: `{method:'Get'}`). The following methods are accepted: `['Get','Put','Post','Delete','Options','Head']`

## Options
The possible options that can be passed are

- **base**<br> (default: false)
Sets a base url to use as a prefix for each endpoint
for example:
```
NET.configure({ base : 'https://myhappyapi.net' });
NET.get('/user/identity') // would make a call to https://myhappyapi.net/user/identity
```

- **headers**<br> (default: {})
Sets the headers to be used in the xhr call. These will be merged with any header already configured through NET.configure
for example: `{'Authentication':'Bearer...'}`

- **method**<br> (default: false)
Sets the method to be used by the xhr call

- **onProgress**<br> (default: false)
Sets a callback function to be executed every time a ProgressEvent is fired
for example: `(evt) => console.log('uploaded :', (evt.loaded/evt.total)*100, '%')`

- **params**<br> (default: false)
Sets the query string parameters for a specific request
for example: 
```
NET.get('/user/identity', { params : {a: 1, b: 2}}); // would become : /user/identity?a=1&b=2
```

- **responseType**<br> (default: false)
If responsetype is set to 'text' it will use the responseText, otherwise it will use the response of the xhr call

- **timeout**<br> (default: 10000)
Sets the timeout in ms to be used for the xhr call

- **withCredentials**<br> (default: false)
Sets the withCredentials property of the xhr call


## Response :
The response object has the following keys

- **data**<br>
The data that the call responded with

- **headers**<br>
The headers that were found on the response

- **status**<br>
The status code of the response

- **statusText**<br>
The text of the status (f.ex : 404 Not Found)

## Configuration options
The following options can be globally configured on the Net instance

- **timeout**<br>
A timeout in ms to wait before timing out the xhr call and rejecting the promise. (default: 10000ms)

- **withCredentials**<br>
Configures the withCredentials property of an XHR call. (default: false)

## Contributors
- Peter Vermeulen : [Valkyrie Studios](www.valkyriestudios.be)