var nodeSql = require('node-mysql');
var DB = nodeSql.DB;

var buystuff_etc = new DB({
    host    :'mysql.danielloera.co',
    user    :'nathan',
    password:'nathanpassword',
    database:'buystuff_etc'
});

var buystuff_login = new DB({
    host    :'mysql.danielloera.co',
    user    :'nathan',
    password:'nathanpassword',
    database:'buystuff_login'
});

var buystuff_posts = new DB({
    host    :'mysql.danielloera.co',
    user    :'nathan',
    password:'nathanpassword',
    database:'buystuff_posts'
});

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
var basicTest = function(cb) {
    buystuff_etc.connect(function(conn, cb) {
        cps.seq([
            function(_, cb) {
                conn.query('select * from Codes', cb);
            },
            function(res, cb) {
                console.log(res);
                cb();
            }
        ], cb);
    }, cb);
};
};