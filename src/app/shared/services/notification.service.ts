import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class NotificationService {

    constructor(private toastr: ToastrService) {
    }

    success() {
        this.successText('Sucesso');
    }

    successText(text: string) {
        this.toastr.success(text);
    }

    error(text: string) {
        this.toastr.error(text);
    }

    warning(text: string) {
        this.toastr.warning(text);
    }

    info(text: string) {
        this.toastr.info(text);
    }

}
