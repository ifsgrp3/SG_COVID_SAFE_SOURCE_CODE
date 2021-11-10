import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { Covid19TestComponent } from 'app/components/covid19/covid19-test/covid19-test.component';
import { Covid19HistoryComponent } from 'app/components/covid19/covid19-history/covid19-history.component';
import { HealthDeclarationComponent } from 'app/health-declaration/health-declaration.component';
import { HealthRecordComponent } from 'app/health-record/health-record.component';
import { StatisticsComponent } from 'app/statistics/statistics.component';
import { NewsComponent } from 'app/news/news.component';
import { AccountsComponent } from 'app/accounts/accounts.component';
import { UserRegistrationComponent } from 'app/user-registration/user-registration.component';
import { AccountLoggingComponent } from 'app/logs/account-logs/account-logs.component';
import { RecordLoggingComponent } from 'app/logs/record-logs/record-logs.component';
import { VaccinationStatusComponent } from 'app/vaccination-status/vaccination-status.component';
import { Covid19DeclarationComponent } from 'app/components/covid19/covid19-declaration/covid19-declaration.component';
import { UpdateComponent } from 'app/components/update/update.conponent';
import { IsPublicGuard } from 'app/is-public.guard';
import { IsCovidPersonnelGuard } from 'app/is-cp.guard';
import { IsAdminGuard } from 'app/is-admin.guard';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent, canActivate:[IsPublicGuard] },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'covid-test',     component: Covid19TestComponent, canActivate:[IsCovidPersonnelGuard] },
    { path: 'covid-history',     component: Covid19HistoryComponent, canActivate:[IsPublicGuard] },
    { path: 'health-declaration', component: HealthDeclarationComponent, canActivate:[IsPublicGuard]},
    { path: 'health-record', component: HealthRecordComponent, canActivate:[IsPublicGuard]},
    { path: 'statistics', component: StatisticsComponent ,canActivate:[IsPublicGuard]}, 
    { path: 'news', component: NewsComponent},
    { path: 'accounts', component: AccountsComponent, canActivate:[IsAdminGuard]},
    { path: 'registration', component: UserRegistrationComponent, canActivate:[IsAdminGuard]},
    { path: 'account-logs', component: AccountLoggingComponent, canActivate:[IsAdminGuard]},
    { path: 'record-logs', component: RecordLoggingComponent, canActivate:[IsAdminGuard]},
    { path: 'vaccination', component: VaccinationStatusComponent, canActivate:[IsCovidPersonnelGuard]},
    { path: 'covid-declaration', component: Covid19DeclarationComponent, canActivate:[IsCovidPersonnelGuard]},
    { path: 'update', component: UpdateComponent, canActivate:[IsAdminGuard] }
];
