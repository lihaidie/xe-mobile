import { Component } from '@angular/core';
import { ViewController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

// import { ReviseMoneyPage } from './reviseMoney';

import { PasswordProvider } from '../../../services/password.service';
import { LoaddingService } from '../../../providers/loadding.service';
import { StorageService } from '../../../providers/storage.service';
import { AlertService } from '../../../providers/alert.service';
import { UserVarifyService } from '../../../services/userVarify.service';
import { UserModel } from '../../../models/user.model';

import { AppConfig } from '../../../app/app.config';

@Component({
  selector: 'page-fund-password-set',
  templateUrl: 'fund-password-set.html',
  providers: [
    PasswordProvider,
    AlertService,
    UserVarifyService
]
})
export class FundPasswordSetPage {

  user: UserModel;
//   titleName: string;
//   flag: boolean = true;

  Question = [
      { title: 'Question1', value: '' },
      { title: 'Question2', value: '' },
      { title: 'Question3', value: '' }
  ];

  constructor(
      public navParams: NavParams,
      private ViewCtrl: ViewController,
      private reviseService: PasswordProvider,
      private alert: AlertService,
      private loadding: LoaddingService,
      private storage: StorageService,
      private userService: UserVarifyService,
      public modalCtrl: ModalController,
      private formBuilder: FormBuilder
  ) { }

  checkSafeForm = this.formBuilder.group({
    //   'Name': this.AppConfig.User.UserName,//this.user.UserName,
      'Name':'',
      'Pwd': '',
      'PwdOk': '',
      'Answer1': ['', [Validators.required]],
      'Answer2': ['', [Validators.required]],
      'Answer3': ['', [Validators.required]]
  });
  newForm = this.formBuilder.group({
      'newOne': ['', [Validators.required]],
      'newTwo': ['', [Validators.required]]
  });

  hasMoney: boolean = false;
  hasSecurity: boolean = false;

  ionViewDidLoad() {
      this.user = this.storage.read<UserModel>("User");
      this.getCheckMoney();
  }

  //是否有资金密码
  getCheckMoney() {
      this.reviseService.getCheckCreateMoney().then(s => {
          this.hasMoney = s.Result;
          if (this.hasMoney) {
              this.userService.ckkUserSecurityQuestion().then(s => {
                  this.hasSecurity = s.Result;
                  if(this.hasSecurity){
                      this.userService.getMiBaoQuestion({ Name: this.user.UserName }).then(s => {
                          this.Question[0].value = s.Question1;
                          this.Question[1].value = s.Question2;
                          this.Question[2].value = s.Question3;
                      });
                  }
              });
          }
      });
  }


  //设置资金密码
  setMoney(obj) {
      if (obj.newOne == obj.newTwo) {
          this.reviseService.getCreateMoney(obj).then(s => {
              this.alert.showAlert(s.Error);
              this.ViewCtrl.dismiss(s.Result);
          });
      } else {
          this.alert.showAlert("新密码前后不一致，请重新输入");
      }
  }

  //验证密保问题
  checkSafe(obj) {
      this.userService.ckUserQuestion(obj).then(s => {
          if (s.Result == -1) {
              this.alert.showAlert(s.Error);
              return;
          } else {
              this.ViewCtrl.dismiss();
            //   let modal = this.modalCtrl.create(ReviseMoneyPage);
            //   modal.present();
          }
      })
  }

  //页面关闭
  dismiss() {
      this.ViewCtrl.dismiss(false);
  }

}
