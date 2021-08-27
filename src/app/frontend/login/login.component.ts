import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ConstantService } from "../../services/constant.service";
import { UserService } from "../../services/user.service";
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm!: FormGroup;
	submitted = false;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService,
		private constantService: ConstantService,
		private spinner: NgxSpinnerService,
		private toastr: ToastrService,
	) { }

	ngOnInit(): void {

		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	// convenience getter for easy access to form fields
	get f() { return this.loginForm.controls; }

	onSubmit() {
		
		this.submitted = true;
  
		// stop here if form is invalid
		if (this.loginForm.invalid) {
		  return;
		}
  
		this.spinner.show();
  
		let in_data = this.loginForm.value;
		this.userService.login( in_data )
		  .subscribe(
			result => {
  
			  this.spinner.hide();
  
				if (result.success) {
					localStorage.setItem(
						'currentUser',
						JSON.stringify({
							token: result.data.token,
							user: result.data.user,
						})
					);
					this.toastr.success(result.message, 'Success!');
					this.router.navigate(['/dashboard']);
				} else {
					// this.toastr.error(result.errorArr[0], 'Request Error!');
					this.constantService.handleResCode(result);
				}
			},
			error => {
			  this.spinner.hide();
			  console.log('error');
			  console.log(error);
			}
		);
	}
}
