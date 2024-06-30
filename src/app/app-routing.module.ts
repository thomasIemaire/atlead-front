import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthentificationComponent } from './authentification/authentification.component';
import { SignupViewComponent } from './authentification/signup-view/signup-view.component';
import { SigninViewComponent } from './authentification/signin-view/signin-view.component';

import { NavigationComponent } from './navigation/navigation.component';
import { FeedViewComponent } from './navigation/feed-view/feed-view.component';
import { UserViewComponent } from './navigation/user-view/user-view.component';
import { SearchViewComponent } from './navigation/search-view/search-view.component';
import { UserAdviceContentComponent } from './navigation/user-view/user-advice-content/user-advice-content.component';
import { UserPictureContentComponent } from './navigation/user-view/user-picture-content/user-picture-content.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/authentification',
    pathMatch: 'full'
  },
  {
    path: 'authentification',
    component: AuthentificationComponent,
    children: [
      { path: 'signup', component: SignupViewComponent },
      { path: 'signin', component: SigninViewComponent }
    ]
  },
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: 'feed', component: FeedViewComponent },
      {
        path: 'user/:identifiant',
        component: UserViewComponent,
        children: [
          {
            path: '',
            redirectTo: 'advice',
            pathMatch: 'full'
          },
          { path: 'advice', component: UserAdviceContentComponent },
          { path: 'picture', component: UserPictureContentComponent }
        ]
      },
      { path: 'search', component: SearchViewComponent },
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
