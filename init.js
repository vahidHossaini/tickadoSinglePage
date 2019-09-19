var getCopy=function(data)
{
  return JSON.parse(JSON.stringify(data))
}  

function getParams(self,name){
  return  self.$route.params[name]
}

var setPageName=function(name){
  console.log('element is : ',document.getElementById('hPageName'))
  document.getElementById('hPageName').innerHTML=name
  document.getElementById('pageName').innerHTML=name
}
function httpPostData(theUrl,data,header)
{//Content-Type: application/json; charset=utf-8
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, false ); // false for synchronous request
    xmlHttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    if(header)
      for(var a in header)
      {
        xmlHttp.setRequestHeader(a, header[a]);
      }
    xmlHttp.send( JSON.stringify(data) );
    return JSON.parse(xmlHttp.responseText) ;
}
function httpPutData(theUrl,data,header)
{//Content-Type: application/json; charset=utf-8
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "PUT", theUrl, false ); // false for synchronous request
    xmlHttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    if(header)
      for(var a in header)
      {
        xmlHttp.setRequestHeader(a, header[a]);
      }
    xmlHttp.send( JSON.stringify(data) );
    return JSON.parse(xmlHttp.responseText) ;
}

function httpGetData(theUrl,data,header)
{
  console.log("---------------->")
    var xmlHttp = new XMLHttpRequest();
    var param=''
    if(data)
      for(var a in data)
        param+= a+'='+data[a]+'&'
    if(param)
    {
      param=param.substr(0,param.length-1)
      theUrl+='?'+param
    }
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    
    if(header)
      for(var a in header)
      {
        xmlHttp.setRequestHeader(a, header[a]);
      }

    xmlHttp.send( null );
    return JSON.parse( xmlHttp.responseText );
}
function httpPostData(theUrl,data,header)
{//Content-Type: application/json; charset=utf-8
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, false ); // false for synchronous request
    xmlHttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    if(header)
      for(var a in header)
      {
        xmlHttp.setRequestHeader(a, header[a]);
      }
    xmlHttp.send( JSON.stringify(data) );
    return JSON.parse(xmlHttp.responseText) ;
}
var global1={ 
  tmpWel:{},
  question:{},
  itemUpload:{"isPicture":true,"media":"","index":""}
}
global1.apiPath="http://test.tickado.ir:8880";
global1.questionPage={};
global1.tmpQue={};


// global.apiPath=""
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function notify(message, type){
  $.growl({
      message: message
  },{
      type: type,
      allow_dismiss: false,
      label: 'Cancel',
      className: 'btn-xs btn-inverse',
      placement: {
          from: 'bottom',
          align: 'right'
      },
      delay: 2500,
      animate: {
              enter: 'animated fadeInRight',
              exit: 'animated fadeOutRight'
      },
      offset: {
          x: 30,
          y: 30
      }
  });
};

var redirectTo = function(path){
  window.location.href=path
}
var msgPath={
  phone:"نام کاربری(شماره همراه)",
  password:"پسورد باید بیشتر از ۵ کارکتر باشد و عدد و کارکتر لاتین باشد",
  ref:"کد معرف اجباری است و باید ۵ حرف باشد"
}
var msgs={
  "Invalid phone or password":"نام کاربری(شماره همراه) یا رمز عبور اشتباه است",
  "ValidationError":"مقادیر ورودی اشتباه است",
  "429":"تعداد تلاش های شما بیشتر از حد مجاز می باشد. ۱۰ دقیقه دیگر تلاش کنید",
  "400":"نام کاربری قبلا ثبت شده است ",
  "404":"کد معرف اشتباه است"
}

function loadScripts(array,callback){
  var loader = function(src,handler){
      var script = document.createElement("script");
      script.src = src;
      script.onload = script.onreadystatechange = function(){
          script.onreadystatechange = script.onload = null;
          handler();
      }
      var head = document.getElementsByTagName("head")[0];
      (head || document.body).appendChild( script );
  };
  (function run(){
      if(array.length!=0){
          loader(array.shift(), run);
      }else{
          callback && callback();
      }
  })();
}




var msgPath={
  phone:"نام کاربری(شماره همراه)",
  password:"پسورد باید بیشتر از ۵ کارکتر باشد و عدد و کارکتر لاتین باشد",
  ref:"کد معرف اجباری است و باید ۵ حرف باشد"
}
var msgs={
  "Invalid phone or password":"نام کاربری(شماره همراه) یا رمز عبور اشتباه است",
  "ValidationError":"مقادیر ورودی اشتباه است",
  "429":"تعداد تلاش های شما بیشتر از حد مجاز می باشد. ۱۰ دقیقه دیگر تلاش کنید",
  "400":"نام کاربری قبلا ثبت شده است ",
  "404":"کد معرف اشتباه است"
}
var viewShow=function(data)
{
  if(data.code && msgs[data.code])
  {
      return  msgs[data.code]
  }
  if(data.msg && msgs[data.msg])
  {
      return  msgs[data.msg]
  }
  if(data.isJoi)
  {
      var str=''
      if(msgs[data.name])
          str+=msgs[data.name]
      if(data.details &&data.details.length && data.details[0].path && data.details[0].path.length)   
      {
          for(var xx in data.details[0].path)
          {
              var a=data.details[0].path[xx]
              if(msgPath[a])
                  str+='\r\n'+msgPath[a]
          }
      } 
      if(str)
          return str
  }
  return "خطا"
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return 'n'+s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}