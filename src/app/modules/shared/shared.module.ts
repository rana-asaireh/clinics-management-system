import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { AuthSideBarComponent } from './components/auth-side-bar/auth-side-bar.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AuthHeaderComponent,
    AuthFooterComponent,
    AuthLayoutComponent,
    AuthSideBarComponent,
  ],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [
    AuthLayoutComponent,
    AuthFooterComponent,
    AuthHeaderComponent,
    AuthSideBarComponent,
  ],
})
export class SharedModule {}
