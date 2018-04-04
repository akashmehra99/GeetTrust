import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FindFalconeComponent } from './find-falcone/find-falcone.component';
import { SuccessFalconeComponent } from './success-falcone/success-falcone.component';
import { FailureFalconeComponent } from './failure-falcone/failure-falcone.component';
import { CommonServiceService } from './common-service.service';
import { Ng2CompleterModule } from 'ng2-completer';


@NgModule({
  declarations: [
    AppComponent,
    FindFalconeComponent,
    SuccessFalconeComponent,
    FailureFalconeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    Ng2CompleterModule
  ],
  providers: [CommonServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
