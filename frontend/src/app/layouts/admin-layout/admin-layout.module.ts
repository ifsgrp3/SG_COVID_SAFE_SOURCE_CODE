import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { Covid19TestComponent } from 'app/components/covid19/covid19-test/covid19-test.component';
import { Covid19HistoryComponent } from 'app/components/covid19/covid19-history/covid19-history.component';
import { HealthDeclarationComponent } from 'app/health-declaration/health-declaration.component';
import { HealthRecordComponent } from 'app/health-record/health-record.component';
import { AccountsComponent } from 'app/accounts/accounts.component';
import { UserRegistrationComponent } from 'app/user-registration/user-registration.component';
import { AccountLoggingComponent } from 'app/logs/account-logs/account-logs.component';
import { RecordLoggingComponent } from 'app/logs/record-logs/record-logs.component';
import { VaccinationStatusComponent } from 'app/vaccination-status/vaccination-status.component';
import { Covid19DeclarationComponent } from 'app/components/covid19/covid19-declaration/covid19-declaration.component';
import { StatisticsComponent } from 'app/statistics/statistics.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateComponent } from 'app/components/update/update.conponent';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgxPaginationModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    UpgradeComponent,
    Covid19TestComponent,
    Covid19HistoryComponent,
    HealthDeclarationComponent,
    HealthRecordComponent,
    AccountsComponent,
    UserRegistrationComponent,
    AccountLoggingComponent,
    RecordLoggingComponent,
    VaccinationStatusComponent,
    Covid19DeclarationComponent,
    StatisticsComponent,
    UpdateComponent
  ]
})

export class AdminLayoutModule {}
