import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { ConstantService } from "../../../services/constant.service";
import { DepartmentService } from "../../../services/department.service";

import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector: 'app-department-list',
    templateUrl: './department-list.component.html',
    styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

    public deptSearchForm!: FormGroup;
    public isAuthLoading = false;
    public submitted = false;

    public depts: any;
    public txtSearch: undefined;

    constructor(
        private toastr: ToastrService,
        private constantService: ConstantService,
        private departmentService: DepartmentService,
        private router: Router,
        private ngxSpinnerService: NgxSpinnerService
    ) { }

    ngOnInit(): void {

        this.deptSearchForm = new FormGroup({
            searchTxt: new FormControl(null, Validators.required)
        });

        this.getAllDepartments(this.txtSearch);
    }

    getAllDepartments(txtSearch: any) {
        try {

            this.ngxSpinnerService.show();
            this.departmentService.getAllDepartments(this.txtSearch).subscribe(
                (result) => {
                    console.log('result', result);
                    if (result.success) {
                        // this.toastr.success( result.message, 'Success!');
                        // this.router.navigate(['/depts/list']);
                        this.depts = result.data.departments;
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

    softDelete(deptId: any) {

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
                    this.deleteDepartmentByDeptId(deptId);
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

    deleteDepartmentByDeptId(deptId: any) {
        try {

            this.ngxSpinnerService.show();
            this.departmentService.deleteDepartmentByDepartmentId(deptId).subscribe(
                (result) => {
                    if (result.success) {
                        this.getAllDepartments(this.txtSearch);
                        Swal.fire(
                            'Deleted!',
                            'User has been deleted succesfully.',
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

    confirmBlockUnblockDepartment(deptId: any, title: any, in_status: any) {
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
                    this.blockUnblockDepartment(deptId, title, status);
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

    blockUnblockDepartment(deptId: any, title: any, in_status: string) {
        try {

            let in_data = {
                department_title: title,
                department_status: in_status
            };
            console.log('in_data', in_data);
            this.ngxSpinnerService.show();

            this.departmentService.blockUnblockDepartment(deptId, in_data).subscribe(
                (result) => {
                    // this.spinner.hide();
                    if (result.success) {
                        this.getAllDepartments(this.txtSearch);
                        Swal.fire({
                            icon: 'success',
                            title: `Department ${in_status}`,
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

    searchDepartment(txtSearch: any) {

        try {

            this.txtSearch = txtSearch;
            console.log('txtSearch', txtSearch);
            this.getAllDepartments(txtSearch);
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
