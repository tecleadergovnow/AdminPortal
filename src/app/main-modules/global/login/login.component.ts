import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/security/authentication.service";
import {Router} from "@angular/router";
import {finalize, take, tap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage?: string
  loading = false;

  constructor(private formBuilder: FormBuilder, private authentication: AuthenticationService, private router: Router) {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get userName() {
    return this.form?.get('userName');
  }

  get password() {
    return this.form?.get('password');
  }

  ngOnInit(): void {

  }

  login() {
    if (this.userName && this.password) {
      this.loading = true;
      this.authentication.login(this.userName.value, this.password.value).pipe(
        tap(() => {
          const storedRedirect = sessionStorage.getItem('gv.redirect');
          if (storedRedirect) {
            try {
              const route = JSON.parse(storedRedirect);
              this.router.navigate([route.path], {queryParams: route.query});
              sessionStorage.removeItem('gv.redirect');
            } catch (e) {
              this.router.navigate(['/search']);
            }
          } else {
            this.router.navigate(['/search']);
          }
        }),
        take(1),
        finalize(() => this.loading = false)
      ).subscribe(
        {
          error: (err) => {
            this.errorMessage = err.error.error.message;
          }
        }
      );
    }
  }
}
