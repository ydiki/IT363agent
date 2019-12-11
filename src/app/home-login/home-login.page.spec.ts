import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeLoginPage } from './home-login.page';

describe('HomeLoginPage', () => {
  let component: HomeLoginPage;
  let fixture: ComponentFixture<HomeLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
