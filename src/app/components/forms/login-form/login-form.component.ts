import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../../../interfaces/forms-data/user-login';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../../services/user.service.spec';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  showLoginForm: boolean = true;
  hidePassword: boolean = true;

  ngOnInit() {}

  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private cookies: CookieService,
    private router: Router
  ) {}

  loginForm: FormGroup = this.formbuilder.group({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  onSubmit() {
    if (this.showLoginForm && this.loginForm.valid) {
      const data: UserLogin = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };

      this.userService.login(data).subscribe({
        next: (res: any) => {
          this.userService.setTokenRole(res.token, res.role),
            this.router.navigate(['/']); //navega a la ruta privada que tenda destinada ese rol
          console.log(res);
        },
        error: (err) => console.log(err),
      });
    }
  }
}
