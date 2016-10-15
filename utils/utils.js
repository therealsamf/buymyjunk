this.sendPostRequest = function(url, params) {
var xhr = new XMLHttpRequest();
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send(params);
};

this.validEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email) && email.endsWith('edu');
};

this.getUUID = function() {
  function randomNum() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return randomNum() + "-" + randomNum();
};

this.emailUUID = function(email, name, UUID) {
    emailjs.send("default_service","buymyjunk",{code: UUID, name: name, to: email});
};

this.storeUUID = function(UUID, school) {

};