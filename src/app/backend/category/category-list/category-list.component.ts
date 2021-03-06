import { Component, OnInit } from '@angular/core';
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { ConstantService } from "../../../services/constant.service";
import { CategoryService } from "../../../services/category.service";

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    public catgSearchForm!: FormGroup;
	public isAuthLoading = false;
	public submitted = false;

	public isDeptIdProvidedFlag = false;
	public deptId: any;

	public isCatgIdProvidedFlag = false;
	public catgs: any;
	public catgId: any;
	public txtSearch: undefined;

	constructor(
		private activatedRoute: ActivatedRoute,
		private toastr: ToastrService,
		private constantService: ConstantService,
		private categoryService: CategoryService,
		private router: Router,
		private ngxSpinnerService: NgxSpinnerService
	) { }

  	ngOnInit(): void {
		
		try {
			this.activatedRoute.params.subscribe( async (params) => {
				this.deptId = params.departmentId;
				this.isDeptIdProvidedFlag = this.deptId ? true : false;

				if( this.isDeptIdProvidedFlag ) {
					await this.categoryService.setCatgApiEndPoint( this.deptId );
					this.catgSearchForm = new FormGroup({
						searchTxt: new FormControl(null, Validators.required)
					});
			
					this.getAllCategories(this.txtSearch);
				} else {
					let obj = {
						resCode: 400,
						msg: 'Department ID is missing.',
					};
					this.constantService.handleResCode(obj);
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

	getAllCategories(txtSearch: any) {
		try {

			this.ngxSpinnerService.show();
			this.categoryService.getAllCategories(this.txtSearch).subscribe(
				(result) => {
					if (result.success) {
						// this.toastr.success( result.message, 'Success!');
						// this.router.navigate(['/catgs/list']);
						this.catgs = result.data.categories;
					} else {
						// this.toastr.error( result.errorArr[0], 'Request Error!');
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

	softDelete(catgId: any) {

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
					this.deleteCategoryBycatgId(catgId);
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

	deleteCategoryBycatgId(catgId: any) {
		try {

			this.ngxSpinnerService.show();
			this.categoryService.deleteCategoryByCategoryId(catgId).subscribe(
				(result) => {
					if (result.success) {
						this.getAllCategories(this.txtSearch);
						Swal.fire(
							'Deleted!',
							'Category has been deleted succesfully.',
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

	confirmBlockUnblockCategory(catgId: any, title: any, in_status: any) {
		try {

			let statusTxt = in_status ? 'BLOCK' : 'UNBLOCK';
			let status = in_status ? 'CLOSE' : 'OPEN';

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
					this.blockUnblockCategory(catgId, title, status);
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

	blockUnblockCategory(catgId: any, title: any, in_status: string) {
		try {

			let in_data = {
				category_title: title,
				category_status: in_status
			};
			this.ngxSpinnerService.show();

			this.categoryService.blockUnblockCategory(catgId, in_data).subscribe(
				(result) => {
					// this.spinner.hide();
					if (result.success) {
						this.getAllCategories(this.txtSearch);
						Swal.fire({
							icon: 'success',
							title: `Category ${in_status}`,
							text: result.msg.toString(),
						});
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

	searchCategory(txtSearch: any) {

		try {

			this.txtSearch = txtSearch;
			console.log('txtSearch', txtSearch);
			this.getAllCategories(txtSearch);
		} catch (ex :any) {
			console.log('ex', ex);
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}
}
