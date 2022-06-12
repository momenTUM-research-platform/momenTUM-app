
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildrenOutletContexts, UrlSerializer } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateCompiler, TranslateLoader, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateConfigService } from '../translate-config.service';
import { TabsPage } from './tabs.page';

describe('TabsPage', () => {
  let component: TabsPage;
  let fixture: ComponentFixture<TabsPage>;
  let service: TranslateConfigService;


  beforeEach( waitForAsync(() => {


    TestBed.configureTestingModule({
      declarations: [TabsPage],
      imports: [IonicModule.forRoot()],
      
    }).compileComponents();
  
      fixture = TestBed.createComponent(TabsPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
      service = TestBed.inject(TranslateConfigService);
    
  }));

  it('should create TabsPage', () => {
    expect(component).toBeTruthy();
  });
});
