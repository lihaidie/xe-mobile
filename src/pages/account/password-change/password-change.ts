
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Loading } from 'ionic-angular';
import { FormBuilder ,Validators} from '@angular/forms';

import { PasswordProvider } from '../../../services/password.service';
import { AlertService } from '../../../providers/alert.service';
import { UserModel } from '../../../models/user.model';
import { UserVarifyService } from '../../../services/userVarify.service';
import { StorageService } from '../../../providers/storage.service';


@Component({
  selector: 'page-password-change',
  templateUrl: 'password-change.html',
  providers:[
    PasswordProvider,
    AlertService,
    UserVarifyService
  ]
})
export class PasswordChangePage {

  setLoginForm = this.formBuilder.group({
    'old': ['', [Validators.required]],
    'newOne': ['', [Validators.required]],
    'newTwo': ['', [Validators.required]]
  });

  user: UserModel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alert: AlertService,
    private storage: StorageService,
    private reviseService: PasswordProvider,
    private formBuilder: FormBuilder,
    private ViewCtrl: ViewController
   ) {
  }

  ionViewDidLoad() {
    // this.user = this.storage.read<UserModel>("User");
  }

    /**修改登录密码 */
  reviseLogin(obj) {

    if (obj.newOne == obj.newTwo) {
      this.reviseService.getReviseLogin(obj).then(s => {
        this.alert.showAlert(s.message);
        if(s.Result){
          this.ViewCtrl.dismiss();    
        }
      });             
    } else {
      this.alert.showAlert("新密码前后不一致，请重新输入");
    }
  }

}
