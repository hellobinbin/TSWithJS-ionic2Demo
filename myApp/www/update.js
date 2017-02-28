
var checkUpdate = (function(){
var aj=new Object();
  aj.request = function(){
      if(window.XMLHttpRequest) {
          var ajax = new XMLHttpRequest();
      }else if (window.ActiveXObject) { 
          try {
              var ajax = new ActiveXObject("Msxml2.XMLHTTP");
          } catch (e) {
              try {
                     var ajax = new ActiveXObject("Microsoft.XMLHTTP");
                 } catch (e) {}
         }
     }
     if (!ajax) { 
             window.alert("不能创建XMLHttpRequest对象<SPAN class=hilite2>实例</SPAN>.");
             return false;
     }
         return ajax;
 }
 aj.req=aj.request();
 aj.Handle=function(callback){
     aj.req.onreadystatechange=function(){
        if(aj.req.readyState==4){
             if(aj.req.status==200){
                 callback(aj.req.responseText);
             }
         }
     }
 }
 aj.cl=function(o){
     if(typeof(o)=='object'){
         var str='';
         for(a in o){
             
             str+=a+'='+o[a]+'&';
         }
         str=str.substr(0,str.length-1);
         return str;
     }else{
         return o;
     }
 }
 aj.get=function(url,callback){
     aj.req.open('get',url,true);
     aj.req.send(null);
     aj.Handle(callback);
 }
 aj.post=function(url,content,callback){
     aj.req.open('post',url,true);
     aj.req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
     content=aj.cl(content);
     aj.req.send(content);
     aj.Handle(callback);
 }

 var isFunction = function(fn) {
   return Object.prototype.toString.call(fn) === "[object Function]";
 }
var storageVersion = window.localStorage['version']||'0';
  var app = {
     checkUpdate:function(url,callback){
        aj.get(url,function(data){
          var appVersionData = JSON.parse(data);
          if (parseInt(appVersionData.release)>parseInt(storageVersion)) {
              if (isFunction(callback)) {
                callback.call(app,appVersionData)
              }
          }else {
            callback.call(app,undefined,{error:"没有内容更新"})
          };
        })
}};

return function(url,callback) {
 app.checkUpdate(url,callback);
}
})();


var goToUpdate = (function(){
  var app = {
    configurePlugin: function(url) {
     var options = {
    'config-file': url,
     };
    chcp.fetchUpdate(this.updateCallback, options);
   },
   updateCallback: function(error, data) {
      if (error) {
        alert('Failed to load the update with error code: ' + error.code);
        return;
        }
      chcp.installUpdate(this.installationCallback);
    },
    installationCallback: function(error) {
     
      if (error) {
        alert(error.description);
      } else {

        console.log('Update installed!');
      }
  }};
  return function(url) {
    app.configurePlugin(url);
  
  }
})();