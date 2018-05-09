import { Injectable } from '@angular/core';
import { HttpService } from '../providers/http.service';
import { AppConfig } from '../app/app.config';
import { PageDefault } from '../pages/PageDefault';

/**
 * @author Steven
 */
@Injectable()
export class LotteryOpenService {

    constructor(
        private httpService: HttpService) { }


    /**
     * 获取各种彩种最新的开奖号码
     * Evan 2015-04-17
     */
    getLotteryOpenLatest(params) {
        var url = AppConfig.GetProdUrl() + "/game-lottery/static-open-code";
        return this.httpService.post(url, params, AppConfig.getHttpRequestOptions());
    }

    /**
     * 获取彩种的开奖号码
     * Evan 2015-04-17
     * @param params  需要传入的参数
     */
    getStaticOpenTime(params) {
        var url = AppConfig.GetProdUrl() + "/game-lottery/static-open-time";
        return this.httpService.post(url, params, AppConfig.getHttpRequestOptions());
    }

    /**
     * 获取彩种的开奖号码
     * @param lotteryCode 
     * @param pageIndex 
     * @param pageSize 
     * Steven 
     */
    getLotteryOpen(lotteryCode: string, pageIndex: number = PageDefault.PageIndex(), pageSize: number = PageDefault.PageSize()) {
        var url = AppConfig.GetProdUrl() + "/game-lottery/list-lottery-open-code";
        var params = "lottery=" + lotteryCode + "&page=" + pageIndex + "&size=" + pageSize;
        return this.httpService.post(url, params, AppConfig.getHttpRequestOptions());
    }

    /**
     * 
     * @param params 
     */
   /*  getStaticMethod(lotteryShortName: string) {
        var url = AppConfig.GetProdUrl() + "/game-lottery/static-method";
        var params = "lottery=" + lotteryShortName;
        return this.httpService.post(url, params, AppConfig.getHttpRequestOptions());
    } */
    /**
     * @description 获取彩种类别下的玩法类别 
     * @author Steven
     * 20180426
     */
    getLotteryMethodType(lotteryType: string){
        var url = AppConfig.GetProdUrl() + "/game-lottery/lottery-method-type";
        var params = "type=" + lotteryType;
        return this.httpService.post(url, params, AppConfig.getHttpRequestOptions());
    }
    /**
     * @description 获取玩法类别下的玩法明细
     * @author Steven
     * 20180426
     */
    getLotteryMethodDetail(lotteryType:string, group: string){
        var url = AppConfig.GetProdUrl() + "/game-lottery/lottery-method-detail?"+"type="+lotteryType+ "&group=" + group;
        //var params ="type="+lotteryType+ "&group=" + group;
        //return this.httpService.post(url, params, AppConfig.getHttpRequestOptions());
        return this.httpService.get(url);
    }
    /**
     * @description 初始化彩票页面
     * @author Steven 
     * 20180428
     * @param lotteryCode 
     */
    initGameLottery(lotteryCode){
        var url = AppConfig.GetProdUrl() + "/webajax/init-game-lottery";
        var params = "name=" + lotteryCode;
        return this.httpService.post(url, params, AppConfig.getHttpRequestOptions());
    }

}


