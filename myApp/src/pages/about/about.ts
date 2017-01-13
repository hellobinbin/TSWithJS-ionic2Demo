import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Haptic } from 'ionic-angular';
import { Http,HttpModule } from '@angular/http';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,haptic: Haptic) {
    haptic.selection();
  }
  values = '';


  


  onKey(event:any) { // without type info
    this.values += event.target.value + ' | ';
  }

}
