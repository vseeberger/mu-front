import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from './shared/services/crud.service';
import * as _ from 'lodash';
import { CustomError } from './shared/util/custom-error';
import { ToastrService } from 'ngx-toastr';
import {WEB_URL} from './shared/util/url.domain';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'myShort';
  loading = false;
  editForm: FormGroup = this.getFormEndereco();
  urlEncurtada = "";
  urlSite = WEB_URL;

  constructor(
    private service: CrudService,
    private notifications: ToastrService,
    private fb: FormBuilder,
    // private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.route.params.subscribe(async params => {
    //   var short = params['short'];
    //   debugger
    //   if(!_.isNil(short) && short !== '') {
    //     // pega a url de destino 
    //     await this.service.getOne('ShortURLs', short).subscribe(result => {
    //       debugger
    //       if(result) {
    //         let res: any = result;
    //         let destino: any = res.url;
    //         if(!(destino.indexOf('http')>= 0)) {
    //           destino = `http://${destino}`;
    //         }

    //         window.location.href = destino;
    //       } else {
    //         this.notifications.error("URL não identificada...");
    //       }
    //     }, error => {
    //       console.error(error);
    //       this.notifications.error(`${CustomError.serviceError(error)}`);
    //     }, () => {
    //       this.loading = false;
    //     });
    //   }
    // });
  }

  getFormEndereco(item?: any) {
    return this.fb.group({
      url: [_.isNil(item) ? undefined : item.url, [Validators.required, Validators.maxLength(250)]],
      shortUrl: [_.isNil(item) ? undefined : item.shortUrl, [Validators.maxLength(250)]]
    });
  }

  async submit(close?, clear?) {
    this.loading = true;
    let objSave = this.editForm;
    await this.service.insert('ShortURLs', objSave.getRawValue()).subscribe(result => {
      if(result) {
        let res: any = result;
        this.urlEncurtada = res.shortUrl;
      }
        this.notifications.success("URL encurtada com sucesso! Confira como ficou o link...");
    }, error => {
      console.error(error);
      this.notifications.error(`${CustomError.serviceError(error)}`);
    }, () => {
      this.loading = false;
    });
  }

}
