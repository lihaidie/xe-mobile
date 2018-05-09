import { Injectable } from '@angular/core';
import { HttpService } from '../providers/http.service';
import { AppConfig } from '../app/app.config';

@Injectable()
export class UserVarifyService {
    constructor(
        private httpService: HttpService) { }
 
     //验证用户资金密码
    getUserVarify(bankPassW: string) {
        let url = AppConfig.GetProdUrl() + "/User/VarifyBankPassword?bankPassword=" + bankPassW;
        let param = { "bankPassword": bankPassW };
        return this.httpService.post(url, param);
    }

    //查询可否提现
    getCashEnable() {
        let url = AppConfig.GetProdUrl() + "/Index/QueryCashEnable";
        return this.httpService.get(url);
    }

    //查询剩余提现次数
    getCashTime() {
        let url = AppConfig.GetProdUrl() + "/Index/QueryRemainCashTime";
        return this.httpService.get(url);
    }

    //提交提现申请
    getDrawMoney(moneyPwd: string, money: string, bankId: Number) {
        let param = "moneyPwd=" + moneyPwd + "&money=" + money + "&bankId=" + bankId;
        let url = AppConfig.GetProdUrl() + "/Index/WithDrawMoney";
        return this.httpService.get(url + "?" + param);
    }

   
    /**查询用户可用余额 */
    getAvailableBalance() {
        let url = AppConfig.GetProdUrl() + "/webajax/loop";
        return this.httpService.get(url);
    }

    //获取所有密保问题
    getSecurityQuestions() {
        let url = AppConfig.GetProdUrl() + "/User/GetSecurityQuestions";
        return this.httpService.get(url);
    }

    //判断是否设置密保
    ckkUserSecurityQuestion() {
        let url = AppConfig.GetProdUrl() + "/User/CheckUserSecurityQuestion";
        return this.httpService.get(url);
    }
    //设置密保
    setSecurityInfo(question) {
        let url = AppConfig.GetProdUrl() + "/User/SetUserSecurityInfo";
        return this.httpService.post(url, question);
    }

    //验证密保是否正确
    ckUserQuestion(question) {
        let url = AppConfig.GetProdUrl() + "/Log/CkUserQuestion";
        return this.httpService.post(url, question);
    }

    //获取密保问及答案
    getMiBaoQuestion(name) {
        let url = AppConfig.GetProdUrl() + "/Log/forgetPwdck";
        return this.httpService.post(url, name);
    }

    //修改资金密码
    updateBankPwd(bankpwd) {
        let url = AppConfig.GetProdUrl() + "/account/modify-withdraw-password";
        return this.httpService.post(url, bankpwd);
    }
}

