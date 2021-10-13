import { Component, OnInit } from '@angular/core';
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ConstantService } from '../../../services/constant.service';
import { UserService } from '../../../services/user.service';

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-users-master',
  templateUrl: './users-master.component.html',
  styleUrls: ['./users-master.component.css']
})
export class UsersMasterComponent implements OnInit {

    userForm!: FormGroup;
	submitted = false;

	fileData!: File;
	allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
	isImageExistsFlag = false;
	imageUrl = '';
	imageName = '';
	isImageInvalid = false;

	isUserIdProvidedFlag = false;
	userId: any;
	userData: any;

	public userImageLink;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder,
		private userService: UserService,
		private constantService: ConstantService,
		private ngxSpinnerService: NgxSpinnerService
	) {
		this.userImageLink = this.userService.userImageLink;
	}

	ngOnInit(): void {
		this.setUserId();
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.userForm.controls;
	}

	setUserId() {
		try {
			this.activatedRoute.params.subscribe((params) => {
				this.userId = params.userId;
				this.isUserIdProvidedFlag = this.userId ? true : false;

				if (this.isUserIdProvidedFlag) {
					this.getUserById();

					this.userForm = this.formBuilder.group({
						email: ['', [Validators.required, Validators.email]],
						password: [],
						phone: ['',[Validators.required, Validators.minLength(10)]],
						first_name: ['', [Validators.required]],
						role: ['', [Validators.required]],
						status: ['', [Validators.required]],
						last_name: [],
						imageLink: [],
						deals_in: [],
					});
				} else {
					this.userForm = this.formBuilder.group({
						email: ['', [Validators.required, Validators.email]],
						password: ['', [Validators.required, Validators.minLength(6)]],
						phone: ['',[Validators.required, Validators.minLength(10)]],
						first_name: ['', [Validators.required]],
						role: ['', [Validators.required]],
						status: ['', [Validators.required]],
						last_name: [],
						imageLink: [],
					});
				}
                this.setFormData();
			});
		} catch (ex :any) {
			console.log('ex', ex);
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	getUserById() {

		try {

			this.ngxSpinnerService.show();
			this.userService.getUserById(this.userId).subscribe(
				(result) => {
					if (result.success) {
						this.userData = result.data.user;
						this.imageName = this.userData.profilePic;
						this.userImageLink = result.data.userImagePath + '/';
						this.setFormData();
					} else {
						Swal.fire('User not found!', 'Status 404.', 'success');
						this.constantService.handleResCode(result);
					}
				},
				(error) => {
					
					this.ngxSpinnerService.hide();
					console.log('error');
					console.log(error);

					let obj = {
						resCode: 400,
						msg: error.toString(),
					};
					this.constantService.handleResCode(obj);
				},
				() => {
					// inside complete
					this.ngxSpinnerService.hide();
				}
			);
		} catch (ex :any) {

			this.ngxSpinnerService.hide();
			console.log('ex', ex);
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	setFormData() {

		try {

			this.userForm.patchValue({
				first_name: this.userData?.first_name,
				last_name: this.userData?.last_name,
				phone: this.userData?.phone,
				email: this.userData?.email,
				role: this.userData?.role,
				status: this.userData?.status,
			});
			let profilePic = this.userData?.profilePic;
			this.imageName = this.userData?.profilePic;
			console.log('profilePic', profilePic);

			this.imageUrl = this.userImageLink + profilePic;
			console.log('this.imageUrl', this.imageUrl);
			// this.spinner.hide();
		} catch (ex :any) {
			console.log('ex', ex);
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	onSubmit() {
		try {
			this.submitted = true;
			// stop here if form is invalid
			if (this.userForm.invalid) {
				return;
			}

			let in_data = this.userForm.value;
			in_data.email = in_data.email.toLowerCase();
            console.log('in_data', in_data);

			if (this.isUserIdProvidedFlag) {
				this.updateUser(in_data);
			} else {
				this.insertUser(in_data);
			}
		} catch (ex :any) {
			console.log('ex', ex);
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	insertUser(in_data: any) {
		try {

			console.log('insertUser');
			this.ngxSpinnerService.show();
			this.userService.insertUser(in_data).subscribe(
				(result) => {
					console.log('result', result);

					this.ngxSpinnerService.hide();

					if (result.success) {
						// this.toastr.success(result.message, 'Success!');
						this.router.navigate(['/users']);
					} else {
						// this.toastr.error(result.errorArr[0], 'Request Error!');
						this.constantService.handleResCode(result);
					}
				},
				(error) => {
					
					this.ngxSpinnerService.hide();
					let obj = {
						resCode: 400,
						msg: error.message.toString(),
					};
					this.constantService.handleResCode(obj);
					// this.toastr.error(error.msg, 'Request Error!');
				},
				() => {
					// inside complete
					this.ngxSpinnerService.hide();
				}
			);
		} catch (ex :any) {

			this.ngxSpinnerService.hide();
			console.log('ex', ex);
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	updateUser(in_data: any) {

		try {

			this.ngxSpinnerService.show();
			let data = this.userForm.value;

			data.id = this.userId;
			delete data.imageLink;

			if (!data.password) {
				delete data.password;
			}

			this.userService.updateUser(data, this.userId).subscribe(
				(result) => {
					console.log(result);

					if (result.success) {
						// this.toastr.success(result.message, 'Success!');
						this.router.navigate(['/users']);
					} else {
						// this.toastr.error(result.errorArr[0], 'Request Error!');
						this.constantService.handleResCode(result);
					}
				},
				(error) => {
					
					this.ngxSpinnerService.hide();
					console.log('error');
					console.log(error);
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: error,
					});
				},
				() => {
					// inside complete
					this.ngxSpinnerService.hide();
				}
			);
		} catch (ex :any) {

			this.ngxSpinnerService.hide();
			console.log('ex', ex);
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	onChange(event: any) {
		try {
			// console.log('inside');
			// console.log('event.target.files[0]', event.target.files[0]);
			this.fileData = <File>event.target.files[0];
			// console.log('this.fileData', this.fileData);
			// console.log('this.allowedFormats.indexOf( this.fileData.type )', this.allowedFormats.indexOf( this.fileData.type ));
			if (this.allowedFormats.indexOf(this.fileData.type) == -1) {
				this.setInvalidImageErr(true);
				return;
			}

			this.setInvalidImageErr(false);

			if (this.isUserIdProvidedFlag) {
				this.modifyUserProfilePic();
			}
		} catch (ex :any) {
			console.log('ex', ex);
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	setInvalidImageErr(flag: boolean) {
		try {
			if (flag) {
				// this.fileData = null;
				this.isImageInvalid = true;
				// this.enableSubmitButton = false;

				Swal.fire('info', 'Only PNG/JPEG/JPG files allowed!');
			} else {
				this.isImageInvalid = false;
				// this.enableSubmitButton = true;
			}
		} catch (ex :any) {
			console.log('ex', ex);
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	modifyUserProfilePic() {
		try {
			// this.spinner.show();

			if (this.allowedFormats.indexOf(this.fileData.type) == -1) {
				// this.fileData = null;
				// alert('Only PNG/JPEG/JPG files allowed!');
				this.setInvalidImageErr(true);
				// this.spinner.hide();
				return;
			}

			this.setInvalidImageErr(false);

			this.ngxSpinnerService.show();
			this.userService.modifyUserProfilePic(this.userId, this.fileData).subscribe(
				(result) => {
					console.log(result);

					if (result.success) {

						this.isImageExistsFlag = true;
						this.imageName = this.userData.profilePic;
						this.imageUrl = this.userImageLink + result.data.user.profilePic;
						Swal.fire(
							'Profile Pic Updated!',
							'User has been updated succesfully.',
							'success'
						);
					} else {
						Swal.fire(
							'Error!',
							'An error occured while upload.',
							'error'
						);
					}
				},
				(error) => {

					this.ngxSpinnerService.hide();
					console.log('error');
					console.log(error);
					Swal.fire('error', error, error);
				},
				() => {
					// inside complete
					this.ngxSpinnerService.hide();
				}
			);
		} catch (ex :any) {

			this.ngxSpinnerService.hide();
			console.log('ex', ex);
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	deleteImage( in_imageUrl: any ) {

		try {
			Swal.fire({
				title: 'Are you sure?',
				icon: 'question',
				iconHtml: '?',
				confirmButtonText: 'Yes',
				cancelButtonText: 'No',
				showCancelButton: true,
				showCloseButton: true,
			}).then((result) => {
				if (result.value) {
					this.deleteUserImage(in_imageUrl);
				}
			});
		} catch (ex :any) {
			console.log('ex', ex);
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	deleteUserImage( in_imageName: any ) {

		try {

			this.ngxSpinnerService.show();
			this.userService.deleteImageByUserId(in_imageName, this.userId).subscribe(
				(result) => {
					if (result.success) {
						this.isImageExistsFlag = false;
						this.imageName = '';
						this.imageUrl = this.userImageLink + result.data.user.profilePic;
						Swal.fire(
							'Deleted!',
							'User profile pic has been deleted succesfully.',
							'success'
						);
					} else {
						this.constantService.handleResCode(result);
					}
				},
				(error) => {

					this.ngxSpinnerService.hide();
					console.log(error.message);
					let obj = {
						resCode: 400,
						msg: error.message.toString(),
					};
					this.constantService.handleResCode(obj);
				},
				() => {
					// inside complete
					this.ngxSpinnerService.hide();
				}
			);
		} catch (ex :any) {

			this.ngxSpinnerService.hide();
			console.log('ex', ex);
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	goToLink( in_imageUrl: string | undefined ) {
		window.open( in_imageUrl, "_blank");
	}
}
