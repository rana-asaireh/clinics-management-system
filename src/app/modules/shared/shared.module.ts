import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { AuthSideBarComponent } from './components/auth-side-bar/auth-side-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthHeaderComponent,
    AuthFooterComponent,
    AuthLayoutComponent,
    AuthSideBarComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [AuthLayoutComponent],
})
export class SharedModule {}
