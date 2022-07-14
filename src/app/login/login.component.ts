import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../servicios/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {

    this.formControl();

  }

  formControl(): void {
		this.loginForm = new FormGroup({
			user: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
			password: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(5)])
		});
	}

  get error(): any {
		return this.loginForm.controls;
	}

  loginAuth(loginForm){

    const resp = this.loginService.Authentification(loginForm.value.user, loginForm.value.password);

    if(!resp){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario Invalido!',
      })
    } else {
      this.router.navigate(['/prueba']);
    }

  }

}
