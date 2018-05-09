import { Injectable } from '@angular/core';
import { HttpService } from '../providers/http.service';
import { AppConfig } from '../app/app.config';

@Injectable()
export class ChangeService {

    constructor(
        private httpService: HttpService) { }
    //帐变记录
    getChangeRecord(input:AccountSearchInput) {
        let param = "billno="+input.billno+"&accountType="+input.accountType+"&type="+input.type+"&sTime=" + input.sTime+"&eTime=" + input.eTime+"&page=" + input.page+"&size=" + input.size;
        let url = AppConfig.GetProdUrl()+ "/account/search-bill";
        // ?startDate="+obj.startDate+"&endDate="+obj.endDate+"&typeCode="+obj.typeCode+"&pageSize="+obj.pageSize+"&pageIndex="+obj.pageIndex+"&lotteryName="+obj.lotteryName+"&bettingId="+obj.bettingId+"&userName="+obj.userName;
        return this.httpService.post(url,param,AppConfig.getHttpRequestOptions());
    }
    //团队帐变列表
    queryTeamChange(input:TeamAccountInput){
        let param = "billno="+input.billno+"&account="+input.account+"&type=" + input.type +"&sTime=" + input.sTime+"&eTime=" + input.eTime+"&page=" + input.page+"&size=" + input.size;
        let url = AppConfig.GetProdUrl()+ "/agent/search-account-bill";
        // ?userName=" + obj.subUserName + "&start=" + obj.startDate + "&end=" + obj.endDate + "&typeCode=" + obj.typeCode + "&pageSize=" + obj.pageSize + "&pageIndex=" + obj.pageIndex;
        return this.httpService.post(url,param,AppConfig.getHttpRequestOptions());
    }

    //获取所有的账单类型
    getChangeType() {
        var url = AppConfig.GetProdUrl() + "/Report/ChangeType";
        return this.httpService.get(url);
    }
}

export class AccountSearchInput {
    billno:string;
    accountType: string;
    type: string;
    sTime: string ;
    eTime: string;
    size: number ;
    page: number;
}
export class TeamAccountInput {
    billno:string;
    account:string;
    type: string;
    sTime: string ;
    eTime: string;
    size: number ;
    page: number;
}

