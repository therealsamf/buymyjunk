var defaultGetCallback = function(http, success, fail) {
    return function(http) {
        http = http.originalTarget;
        console.log(http);
        if(http.readyState == 4 && http.status == 200) {
            success(http.response);
        }else {
            fail();
        }
    }
};

var callGetResponse = function(url, success, fail) {
    var http = new XMLHttpRequest();
    http.open("GET", url, true);

    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    http.onreadystatechange = defaultGetCallback(
        http, success,fail);
    http.send(null); 
}

var validEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email) && email.endsWith('edu');
};

var getUUID = function() {
  function randomNum() {
    return Math.floor((1 + Math.random()) * 0x1000000000)
      .toString(16)
      .substring(1);
  }
  return randomNum();
};

var emailUUID = function(email, name, UUID) {
    emailjs.send("default_service","buymyjunk",{code: UUID, name: name, to: email});
};

var storeUUID = function(UUID, success, fail) {
    callGetResponse("http://www.danielloera.co/buymyjunk/add_uuid.php?code="
        + UUID, success, fail);
};

var deleteUUID = function(UUID, success, fail) {
    callGetResponse("http://www.danielloera.co/buymyjunk/delete_uuid.php?code="
        + UUID, success, fail);
};

var addPost = function(id, school, username, title, description, category, tags, images,
        success, fail) {

};


module.exports = {
    'defaultGetCallback': defaultGetCallback
}