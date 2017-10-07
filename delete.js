var xhr = new XMLHttpRequest();

xhr.addEventListener('load', function () {
  if (xhr.status === 200) {
    var response = JSON.parse(xhr.responseText);
    // ... do something with the response
  } else {
   console.log('An error occurred during your request: ' +  xhr.status + ' ' + xhr.statusText);
 }
});

xhr.open('GET', 'https://example.com/search?query=hello');
xhr.send();

```

## onreadystatechange method

```javascript

var xhr = new XMLHttpRequest(); 	    //creating a request object

xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {  // check if a response was sent back
    if(xhr.status === 200) { 	// check if request was successful
        var response = JSON.parse(xhr.responseText);
        // ... do something with the response
    } else {
      console.log('An error occurred during your request: ' +  xhr.status + ' ' + xhr.statusText);
    }
  }
}

xhr.open('GET', 'https://example.com/search?query=hello');
xhr.send();

```

## abstracted 1 method

```javascript

function getRequest(url, onSuccess, onError) {
  var xhr = new XMLHttpRequest(); 	    //creating a request object

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {  // check if a response was sent back
      if(xhr.status === 200) { 	// check if request was successful
        onSuccess(xhr.responseText);
          // ... do something with the response
      } else {
        onError(null);
      }
    }
  }

  xhr.open('GET', url);
  xhr.send();
}

getRequest('https://example.com/search?query=hello', function(response) {
  console.log(response);
},
function(error) {
  console.error('This is bad!');
}
)
getRequest('https://example2.co.uk/search?query=hello', function(response) {
  console.log(response);
})

```


## abstracted 2 method

```javascript

function request(method, body, url, callback)
  var xhr = new XMLHttpRequest(); 	    //creating a request object

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {  // check if a response was sent back
      if(xhr.status === 200) { 	// check if request was successful
        callback(JSON.parse(xhr.responseText));
          // ... do something with the response
      } else {
        callback(null);
      }
    }
  }

  xhr.open(method, url);
  xhr.send(body);
}

request('POST', {a: 100}, 'https://example.com/search?query=hello', function(response) {
  console.log(response);
})
