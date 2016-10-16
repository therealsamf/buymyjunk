var sha256 = require('sha256');

var defaultGetCallback = function(http, success, fail) {
    return function(http) {
        http = http.currentTarget;
        if(http.readyState == 4 && http.status == 200) {

            var body = JSON.parse(JSON.parse(http.response).body);
            success(body);
        }else if(http.readyState == 4) {
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
    callGetResponse("www.danielloera.co/buymyjunk/add_uuid.php?code="
        + UUID, success, fail);
};

var verifyUUID = function(UUID, success, fail) {
    callGetResponse("www.danielloera.co/buymyjunk/delete_uuid.php?code="
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
    var url = "www.danielloera.co/buymyjunk/add_post.php?id=" +
    id +
    "&school=" + percentEncode(school) +
    "&username="  + percentEncode(username) +
    "&title=" + percentEncode(title) +
    "&desc="  + percentEncode(description)  +
    "&cat="+ category +
    "&tc=" + tags.length +
    "&ic=" + images.length;

    for(var i = 0; i < tags.length; i++) {
        url+= "&t" + i + "=" + tags[i];
    }

    for(var i = 0; i < images.length; i++) {
        url+= "&i" + i + "=" + images[i];
    }

    callGetResponse(url, success, fail);
};

var getPostById = function(id, school, success, fail) {
    callGetResponse("www.danielloera.co/buymyjunk/get_post_id.php?id=" + id + "&school=" + school,
        success, fail);
};

var getPostsByFilter = function(school, category, tags, success, fail) {
    var url = "www.danielloera.co/buymyjunk/get_post_filter.php?school=" + school;
    if(category !== null) {
        url += "&cat=" + category;
    }

    if(tags != null) {
        url+= "&tc=" + tags.length;
        for(var i = 0; i < tags.length; i++) {
            url += "&t" + i + "=" + tags[i]; 
        }
    }
    callGetResponse(url, success, fail);
};

var addUser = function(username, password, email, school,
    success, fail) {
    //please please NEVER delete this line for user safety.
    var hashedPassword = sha256(password);
     callGetResponse("www.danielloera.co/buymyjunk/add_user.php?username="
        + percentEncode(username) +
        "&password=" + hashedPassword +
        "&email=" + email + 
        "&school=" + percentEncode(school),
        success,
        fail);

};

var login = function(username, password, success, fail) {
    //please please NEVER delete this line for user safety.
    var hashedPassword = sha256(password);
    console.log('Pass: ' + hashedPassword.toString());
     callGetResponse("www.danielloera.co/buymyjunk/login.php?username="
        + percentEncode(username) +
        "&password=" + hashedPassword,
        success,
        fail);
};

module.exports = {
    'defaultGetCallback': defaultGetCallback,
    'validEmail': validEmail,
    'emailUUID': emailUUID,
    'storeUUID': storeUUID,
    'getUUID': getUUID,
    'verifyUUID': verifyUUID,
    'getUUID': getUUID,
    'getPostById': getPostById,
    'addPost': addPost,
    'addUser': addUser,
    'login': login,
    'getPostsByFilter': getPostsByFilter
}
