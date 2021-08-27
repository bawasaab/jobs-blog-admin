import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesSeoComponent } from './articles-seo.component';

describe('ArticlesSeoComponent', () => {
  let component: ArticlesSeoComponent;
  let fixture: ComponentFixture<ArticlesSeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesSeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesSeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
