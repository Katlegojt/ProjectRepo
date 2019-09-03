import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  user = {name:'', password:'',
  gender: '',
  email: '',
  bio :''

  };
  constructor(private navParams : NavParams) { }

  ngOnInit() {

    this.user.name = this.navParams.get('username');
  }

}
