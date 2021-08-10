import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from '../shared/services/crud.service';
import { CustomError } from '../shared/util/custom-error';
import { WEB_URL } from '../shared/util/url.domain';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'myShort';
  loading = false;
  urlEncurtada = "";
  urlSite = WEB_URL;

  constructor(
    private service: CrudService,
    private notifications: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      var short = params['short'];
      debugger
      if(!_.isNil(short) && short !== '') {
        // pega a url de destino 
        await this.service.getOne('ShortURLs', short).subscribe(result => {
          debugger
          if(result) {
            let res: any = result;
            let destino: any = res.url;
            if(!(destino.indexOf('http')>= 0)) {
              destino = `http://${destino}`;
            }

            window.location.href = destino;
          } else {
            this.notifications.error("URL não identificada...");
          }
        }, error => {
          console.error(error);
          this.notifications.error(`${CustomError.serviceError(error)}`);
        }, () => {
          this.loading = false;
        });
      }
    });
  }

}
