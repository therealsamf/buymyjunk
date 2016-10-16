var defaultGetCallback = function(http, success, fail) {
    return function(http) {
        http = http.currentTarget;
        // console.log(http);
        if(http.readyState == 4 && http.status == 200) {
            console.log('Response');
            console.dir(http.response);
            var body = JSON.parse(http.response).body;
            success(body);
        }else if(http.readyState == 4) {
            fail();
        }
    }
};

var callGetResponse = function(url, success, fail) {
    var http = new XMLHttpRequest();
    http.open("GET", url, true);
    // console.log('URL: ' + url);
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

var verifyUUID = function(UUID, success, fail) {
    callGetResponse("http://www.danielloera.co/buymyjunk/delete_uuid.php?code="
        + UUID, success, fail);
};

var percentEncode = function(string) {
    string = string.split(" ").join("%20");
    string = string.split("&").join("%26");
    return string.split("=").join("%3D");
};

var percentDecode = function(string) {
    string = string.split("%20").join(" ");
    string = string.split("%26").join("&");
    return string.split("%3D").join("=");
}

/**
 * @param {string} id
 * @param {string} school
 * @param {string} username
 * @param {string} title
 * @param {string} decription
 * @param {string} category
 * @param {array} tags
 * @param {array} images
 * @param {function} success
 * @param {function} fail 
 */
var addPost = function(id, school, username, title, description, category, tags, images,
        success, fail) {
    var url = "http://www.danielloera.co/buymyjunk/add_post.php?id=" +
    id +
    "&school=" + percentEncode(school) +
    "&username="  + percentEncode(username) +
    "&title=" + percentEncode(title) +
    "&desc="  + percentEncode(description)  +
    "&cat="+ category +
    "&tc=" + tags.length +
    "&ic=" + images.length ;

    for(var i = 0; i < tags.length; i++) {
        url+= "&t" + i + "=" + tags[i];
    }

    for(var i = 0; i < images.length; i++) {
        url+= "&i" + i + "=" + images[i];
    }

    callGetResponse(url, succes, fail);
};

var getPostById = function(id, school, success, fail) {
    callGetResponse("www.danielloera.co/buymyjunk/get_post_id.php?id=" + id + "&school=" + school,
        success, fail);
}

module.exports = {
    'defaultGetCallback': defaultGetCallback,
    'validEmail': validEmail,
    'emailUUID': emailUUID,
    'storeUUID': storeUUID,
    'verifyUUID': verifyUUID,
    'getUUID': getUUID

}