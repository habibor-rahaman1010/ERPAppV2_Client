import { Injectable } from "@angular/core";
import { AuthService } from './../authServices/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isLoggedIn()) {

            return true;
        }
        else {
            this.router.navigate(['/']);
            return false;
        }
    }
} 