
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PasswordChangePage } from '../password-change/password-change';
import { FundPasswordSetPage } from '../fund-password-set/fund-password-set';
import { EncryptedSetPage } from '../encrypted-set/encrypted-set';
import { UserBankListPage } from '../user-bank-list/user-bank-list';
import { StorageService } from './../../../providers/storage.service';
import { SigninPage } from './../../login/signin';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: StorageService) {
  }

  changePassword(){
    this.navCtrl.push(PasswordChangePage)
  }

  moneySet(){
    this.navCtrl.push(FundPasswordSetPage)
  }

  encryptedSet(){
    this.navCtrl.push(EncryptedSetPage)
  }

  banklist(){
    this.navCtrl.push(UserBankListPage)
  }

  exit(){
    this.storage.remove("User");
    this.storage.remove("lotterys");
    this.storage.remove("token");
    this.storage.clear();
    this.navCtrl.push(SigninPage)
  }

}
