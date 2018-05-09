import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PromotionService } from '../../services/promotion.service';
import { LoaddingService } from '../../providers/loadding.service';
import { platformnoticedetailPage } from './platformnoticedetail';



@Component({
  selector: 'page-platformnotice',
  templateUrl: 'platformnotice.html',
  providers: [PromotionService]
})
export class platformnoticePage {

  articles = [];
  constructor(
    private promotionService: PromotionService,
    private loadding: LoaddingService,
    private navCtrl: NavController
  ) { }

  ionViewDidLoad() {
    this.getAnnounce();
  }

  /** mango获取公告列表 */
  getAnnounce() {
    let load = this.loadding.showLoding("加载中..");
    this.promotionService.getAnnounces().then(s => {
      this.articles = s;
      this.loadding.closeLoading(load);
    });
  }


 /** mango 查看公告详情 */
  goDetail(detail) {
    this.navCtrl.push(platformnoticedetailPage, { content: detail });
  }

}
