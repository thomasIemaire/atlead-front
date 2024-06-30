import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthentificationComponent } from './authentification/authentification.component';
import { SignupViewComponent } from './authentification/signup-view/signup-view.component';
import { SigninViewComponent } from './authentification/signin-view/signin-view.component';

import { NavigationComponent } from './navigation/navigation.component';
import { FeedViewComponent } from './navigation/feed-view/feed-view.component';
import { UserViewComponent } from './navigation/user-view/user-view.component';
import { SearchViewComponent } from './navigation/search-view/search-view.component';
import { AdvicePostComponent } from './commons/posts/advice-post/advice-post.component';
import { PicturePostComponent } from './commons/posts/picture-post/picture-post.component';
import { UserAdviceContentComponent } from './navigation/user-view/user-advice-content/user-advice-content.component';
import { UserPictureContentComponent } from './navigation/user-view/user-picture-content/user-picture-content.component';
import { PostAdviceComponent } from './commons/posts/post-advice/post-advice.component';
import { UserBadgeComponent } from './commons/user-badge/user-badge.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    SignupViewComponent,
    SigninViewComponent,
    NavigationComponent,
    FeedViewComponent,
    UserViewComponent,
    SearchViewComponent,
    AdvicePostComponent,
    PostAdviceComponent,
    PicturePostComponent,
    UserAdviceContentComponent,
    UserPictureContentComponent,
    UserBadgeComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot({animated: false}),
    RouterModule.forRoot([])
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }