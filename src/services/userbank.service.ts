import { Injectable } from '@angular/core';
import { HttpService } from '../providers/http.service';
import { AppConfig } from '../app/app.config';



@Injectable()
export class UserBankService {
    constructor(
        private httpService: HttpService) { }
    /** 
     * 判断是否绑定银行卡
     * @author Steven
     */
    getBindInfo(){
        let url = AppConfig.GetProdUrl + "/account/get-bind-status";
        return this.httpService.get(url);
    }
    /**
     * 准备提现
     * @author Steven
     * 2018-04-16
     */
    prepareWithdraw(){
        let url = AppConfig.GetProdUrl() + "/account/prepare-withdraw";
        return this.httpService.get(url);
    }
    /**
     * 提现申请
     * @author Steven
     * 2018-04-16
     */
    applyWithdraw(cardId: number, amount: number, withdrawPassword: string, googleKey: number){
        let url = AppConfig.GetProdUrl() + "/account/apply-withdraw";
        let params = "cardId=" + cardId + "&amount=" + amount + "&withdrawPassword=" + withdrawPassword + "&googleKey=" + googleKey;
        return this.httpService.post(url,params,AppConfig.getHttpRequestOptions());

    }

    
    //判断是否有银行卡，有则返回持卡人姓名
    getUserBankUserName() {
        let url = AppConfig.GetProdUrl() + "/User/GetUserBankUserName";
        return this.httpService.get(url);
    }

    /**
     * 获取用户银行信息
     * @author Steven
     * @param pageIndex 
     * @param pageSize 
     */
    getUserBanks(pageIndex: number, pageSize: number) {
        let param = "pageIndex=" + pageIndex + "&pageSize=" + pageSize;
        let url = AppConfig.GetProdUrl() + "/User/GetUserBanks";
        return this.httpService.get(url + "?" + param);
    }

    //设为默认银行
    //TQQ 2017-01-03
    setDefaultBank(bankid) {
        let param = "id=" + bankid;
        let url = AppConfig.GetProdUrl() + "/User/SetDefaultCard";
        return this.httpService.get(url + "?" + param);
    }


    //验证用户是否绑定银行卡
    //chen 2017-01-03
    getUserBank() {
        let url = AppConfig.GetProdUrl() + "/User/ExistUserBank" ;
        return this.httpService.get(url);
    }

    //查询可提现的银行列表
    //TQQ 2017-01-03
    queryDrawBanks() {
        let url = AppConfig.GetProdUrl() + "/User/QueryDrawBanks";
        return this.httpService.get(url);
    }

    //省列表
    //TQQ 2017-01-03
    proList() {
        let url = AppConfig.GetProdUrl() + "/User/ProList";
        return this.httpService.get(url);
    }

    //市列表
    //TQQ 2017-01-03
    cityList(procode: string) {
        let url = AppConfig.GetProdUrl() + "/User/CityList?proCode=" + procode;
        return this.httpService.get(url);
    }

    //区列表
    //TQQ 2017-01-03
    areaList(cityCode: string) {
        let url = AppConfig.GetProdUrl() + "/User/AreaList?cityCode=" + cityCode;
        return this.httpService.get(url);
    }

    //添加银行卡 
    //TQQ 2017-01-03
    addUserBank(bank){
        let url = AppConfig.GetProdUrl() + "/User/AddUserBank";
        return this.httpService.post(url,bank);
    }
}

