declare function checkUpdate(url:string,callback:any);
declare function goToUpdate(url:string);
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      StatusBar.styleDefault();
      Splashscreen.hide();



        var url="http://10.60.153.13/chcp.json";//服务端地址
      // 使用封装好的方法判断是否需要更新，data表示更新，err表示没有可更新的版本

      checkUpdate(url,function(data,err) {
        if (data) {
          console.log(data);
        };
        if(err){
          console.log(err.error);
        }
      })

    });

  }

}
