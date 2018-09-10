import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, NotAuthGuard, CreatorGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomeModule', canActivate: [NotAuthGuard] },
  { path: 'jobs', loadChildren: './jobs/jobs.module#JobsModule', canActivate: [AuthGuard] },
  { path: 'algorithms', loadChildren: './algorithms/algorithms.module#AlgorithmsModule', canActivate: [AuthGuard, CreatorGuard] },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
