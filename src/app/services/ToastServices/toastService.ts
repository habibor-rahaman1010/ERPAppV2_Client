import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ToastService {
    private toast: any = null

    setToast(toast: any) {
        this.toast = toast
    }

    getToast(): any {
        const storeToast = this.toast;
        this.toast = null
        return storeToast;
    }
}