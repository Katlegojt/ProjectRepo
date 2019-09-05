import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChatPage } from './user-chat.page';

describe('UserChatPage', () => {
  let component: UserChatPage;
  let fixture: ComponentFixture<UserChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
