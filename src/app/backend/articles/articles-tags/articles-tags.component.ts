import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ArticleService } from "../../../services/article.service";
import Swal from 'sweetalert2';
import { ConstantService } from '../../../services/constant.service';

import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from "../../../interfaces/article";

@Component({
    selector: 'app-articles-tags',
    templateUrl: './articles-tags.component.html',
    styleUrls: ['./articles-tags.component.css']
})
export class ArticlesTagsComponent implements OnInit {

    articleId: any;
    isArticleIdProvidedFlag!: boolean;
    articleData!: Article;

    articleTagsForm!: FormGroup;
    submitted = false;
    showSubmitBtn = true;
    originalTags = [];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private articleService: ArticleService,
		private constantService: ConstantService,
		private ngxSpinnerService: NgxSpinnerService
    ) { }

    ngOnInit(): void {

        this.articleTagsForm = this.formBuilder.group({
            tags: ['', [Validators.required]],
        });
        this.setArticleId();
    }

    // convenience getter for easy access to form fields
	get f() { return this.articleTagsForm.controls; }

    setArticleId() {
		try {
			this.activatedRoute.params.subscribe((params) => {
				this.articleId = params.articleId;
				this.isArticleIdProvidedFlag = this.articleId ? true : false;

				if (this.isArticleIdProvidedFlag) {
					this.getArticleById();
				} else {}
                // this.setFormData();
			});
		} catch (ex) {
			console.log('ex', ex);
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

    getArticleById() {

		try {

			this.ngxSpinnerService.show();
			this.articleService.getArticleById(this.articleId).subscribe(
				(result) => {
					if (result.success) {
						this.articleData = result.data.article;
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
		} catch (ex) {

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

            this.originalTags = this.articleData?.tags;
            let tagsObj: { display: never; value: never; }[] = [];
            this.articleData?.tags.forEach(element => {
                tagsObj.push({
                    display: element,
                    value: element
                });
            });
			this.articleTagsForm.patchValue({
                tags: tagsObj
			});
			// this.spinner.hide();
		} catch (ex) {
			console.log('ex', ex);
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

    onSubmit() {
		this.submitted = true;
        let tagsArr = [];

		let in_data = this.articleTagsForm.value;
        if( in_data ) {
            tagsArr = in_data.tags.map( (obj: any) => obj.value );
            // [...tagsArr, ...this.originalTags];
            this.originalTags.concat(tagsArr);
        } else {
            tagsArr = this.originalTags.map( (obj: any) => obj.value );
            [...tagsArr, ...this.originalTags];
        }
        let tagsUniqueArr = [...new Set(tagsArr)];
        in_data.tags = tagsUniqueArr;
  
		// stop here if form is invalid
		if (this.articleTagsForm.invalid) {
		  return;
		}

        this.updateArticle(in_data);
	}

    updateArticle(in_data: any) {

        this.ngxSpinnerService.show();
        this.articleService.updateArticle(in_data, this.articleId).subscribe(
            (result) => {

                this.ngxSpinnerService.hide();

                if (result.success) {
                    // this.toastr.success(result.message, 'Success!');
                    this.router.navigate(['/articles']);
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
    }
}