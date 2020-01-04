import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DialogChatPage } from './dialog-chat.page';

describe('DialogChatPage', () => {
  let component: DialogChatPage;
  let fixture: ComponentFixture<DialogChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
