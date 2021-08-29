import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ArticleService } from "../../../services/article.service";
import Swal from 'sweetalert2';
import { ConstantService } from '../../../services/constant.service';

import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-articles-seo',
  templateUrl: './articles-seo.component.html',
  styleUrls: ['./articles-seo.component.css']
})
export class ArticlesSeoComponent implements OnInit {

    articleSeoForm!: FormGroup;
    submitted = false;
    slug: any;
    showSubmitBtn = true;
    articleId: any;
    isArticleIdProvidedFlag!: boolean;
    articleData: any;

    constructor(
		private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private articleService: ArticleService,
		private constantService: ConstantService,
		private ngxSpinnerService: NgxSpinnerService
    ) { }

    ngOnInit(): void {

        this.articleSeoForm = this.formBuilder.group({
            article_id: ['', [Validators.required]],
            name: ['', [Validators.required]],
            content: ['', [Validators.required]],
            status: ['', [Validators.required]],
        });
        this.setArticleId();
    }

    // convenience getter for easy access to form fields
	get f() { return this.articleSeoForm.controls; }

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
						// this.setFormData();
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

    onSubmit() {}
}
