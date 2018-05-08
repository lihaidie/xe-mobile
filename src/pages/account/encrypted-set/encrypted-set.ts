
import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { UserVarifyService } from '../../../services/userVarify.service'
import { AlertService } from '../../../providers/alert.service'
import { AppConfig } from '../../../app/app.config';
import { LoaddingService } from '../../../providers/loadding.service'

@Component({
  selector: 'page-encrypted-set',
  templateUrl: 'encrypted-set.html',
  providers:[
    UserVarifyService
  ]
})
export class EncryptedSetPage {
  constructor(
    private navCtrl: NavController,
    private alert: AlertService,
    private config: AppConfig,
    private userService: UserVarifyService,
    private loading: LoaddingService
) { }
questionPars = { questionList1: [], questionList2: [], questionList3: [], selectQuestion1: 0, selectQuestion2: 0, selectQuestion3: 0 };
bindQuestionPars = {Question1: 0, Question2: 0, Question3: 0, Answer1: '', Answer2: '', Answer3: '' };
isHasQuestion = false;//是否有密保
//页面加载
ionViewDidLoad() {
    this.ckkUserSecurityQuestion();
}

//判断是否已有密保
//TQQ 2017-06-06
ckkUserSecurityQuestion() {
    let load = this.loading.showLoding();
    this.userService.ckkUserSecurityQuestion().then(s => {
        this.isHasQuestion = s.Result;
        this.loading.closeLoading(load);
        if (!this.isHasQuestion) {
            this.getSecurityQuestions();
        }
    }).catch(() => {
        this.loading.closeLoading(load);
    });
}

//获取密保问题
//TQQ 2017-06-06
getSecurityQuestions() {
    this.userService.getSecurityQuestions().then(d => {
        d.forEach(s => {
            if (s.Type == '1') {
                this.questionPars.questionList1.push(s);
            } else if (s.Type == '2') {
                this.questionPars.questionList2.push(s);
            } else if (s.Type == '3') {
                this.questionPars.questionList3.push(s);
            }
        });
        this.bindQuestionPars.Question1 = this.questionPars.questionList1[0].Id;
        this.bindQuestionPars.Question2 = this.questionPars.questionList2[0].Id;
        this.bindQuestionPars.Question3 = this.questionPars.questionList3[0].Id;
    });
}

//设置密保问题
//TQQ 2017-06-06
setSecurityInfo() {
    if (this.bindQuestionPars.Answer1 == '' || this.bindQuestionPars.Answer2 == '' || this.bindQuestionPars.Answer3 == '') {
        this.alert.showAlert('密保答案不可为空');
        return;
    }
    let load = this.loading.showLoding();
    this.userService.setSecurityInfo(this.bindQuestionPars).then(s => {
        this.loading.closeLoading(load);
        this.alert.showAlert(s['Error']);
        if (s['Result']) {
            this.isHasQuestion = true;
        }
    }).catch(() => {
        this.loading.closeLoading(load);
    });

}

}
