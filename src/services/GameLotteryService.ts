import { Injectable } from '@angular/core';
import { HttpService } from '../providers/http.service';
import { AppConfig } from '../app/app.config';
import { PageDefault } from '../pages/PageDefault';

/**
 * @author Steven
 */
@Injectable()
export class GameLotteryService {

    constructor(
        private httpService: HttpService) { }

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
    /**
     * @description 投注
     * @author Steven 20180503
     * @param list 
     */
    addOrder(list){
        var url = AppConfig.GetProdUrl() + "/game-lottery/add-order";
        let params = "text=" + JSON.stringify(list);
        return this.httpService.post(url, params, AppConfig.getHttpRequestOptions());
    }

}


