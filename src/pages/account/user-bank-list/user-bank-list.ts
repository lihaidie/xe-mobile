import { Component } from '@angular/core';
import { UserBankService } from '../../../services/userbank.service';
import { LoaddingService } from '../../../providers/loadding.service';
import { StorageService } from '../../../providers/storage.service';
import { PageDefault } from '../../../pages/PageDefault';
import { ModalController, ViewController } from 'ionic-angular';
import { AddUserBankPage } from './add-user-bank';
import { AlertService } from '../../../providers/alert.service';

@Component({
  selector: 'page-user-bank-list',
  templateUrl: 'user-bank-list.html',
  providers:[UserBankService,LoaddingService,StorageService]
})
export class UserBankListPage {

  constructor(
    private userbank: UserBankService,
    private loadding: LoaddingService,
    private storage: StorageService,
    private modalCtrl: ModalController,
    private alert: AlertService,
    private viewCtrl: ViewController) { }

modelList = [];
isHave = true;
uBankInput=new UserBankInput();
excludeTracks = [];
load;

ionViewDidLoad() {
    this.load = this.loadding.showLoding();
    this.getUserBanks(this.uBankInput).then(s => {
        this.loadding.closeLoading(this.load);
    });
}

//下拉重新加载
doRefresh(refresher) {
    this.uBankInput.pageIndex = 1;
    this.getUserBanks(this.uBankInput).then(s => {
        refresher.complete();
    });
}

//添加用户银行
addBank() {
    let modal = this.modalCtrl.create(AddUserBankPage, this.excludeTracks);
    modal.present();
    modal.onWillDismiss((data) => {
        if (data != undefined && data.Result) {
            this.uBankInput.pageIndex = 1;
            this.getUserBanks(this.uBankInput);
        }
    });

}

//获取用户银行列表
getUserBanks(obj) {
    return this.userbank.getUserBanks(obj.pageIndex, obj.pageSize).then(s => {
        if (obj.pageIndex == 1) {
            this.modelList = [];
            this.modelList = s;
        } else {
            this.modelList = this.modelList.concat(s);
        }
        if (this.modelList == null || this.modelList.length < 1) {
            this.isHave = false;
        } else {
            this.isHave = true;
        }
    }).catch(c => {
        this.loadding.closeLoading(this.load);
    });
}

//设为默认银行
setDefaultBank(bankid) {
    let load = this.loadding.showLoding();
    this.userbank.setDefaultBank(bankid).then(s => {
        if (s.Result) {
            this.getUserBanks(this.uBankInput);
        } else {
            this.alert.showAlert(s.Error);
        }
        this.loadding.closeLoading(load);
    }).catch(c => {
        this.loadding.closeLoading(load);
    });
}

//页面返回
close() {
    this.viewCtrl.dismiss();
}

}


export class UserBankInput{
  pageIndex: number = PageDefault.PageIndex();
  pageSize: number = PageDefault.PageSize()
} 