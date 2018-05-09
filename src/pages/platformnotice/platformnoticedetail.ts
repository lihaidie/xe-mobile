import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'platformnoticedetail',
    templateUrl: 'platformnoticedetail.html',
})
export class platformnoticedetailPage {

    article;
    constructor(
        private navPar: NavParams,
        private sanitizer: DomSanitizer
    ) { }

    ionViewDidLoad() {
        this.getDetail();
    }

   /**mango查看公告详情 */
    getDetail() {
        this.article = this.sanitizer.bypassSecurityTrustHtml(this.navPar.get("content"));
    }


}
