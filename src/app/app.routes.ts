import { Routes } from '@angular/router';
import { RoutePaths } from '../shared/routes';
import { Alumnos } from './features/alumnos/alumnos';
import { NotFoundComponent } from './features/not-found-component/not-found-component';
import { AuthGuard } from '../shared/guards/auth-guard-guard';


export const routes: Routes = [
    {
        path: "", 
        redirectTo: RoutePaths.CURSOS,
        pathMatch: "full"
    },
    {
        path: RoutePaths.CURSOS,
        loadComponent: () => import('./features/cursos/cursos').then(m => m.Cursos)
    },


    {
        path: RoutePaths.ALUMNOS,
        component: Alumnos,
        canActivate: [AuthGuard],
    },
 
    {
        path: RoutePaths.INSCRIPCIONES,
        loadComponent: () => import('./features/inscripciones/inscripciones').then(m => m.Inscripciones)
    },
    {
        path: RoutePaths.VIEW_STUDENTS,
        loadComponent: () => import('./features/alumnos/view-students/view-students').then (m => m.ViewStudents),
        canActivate: [AuthGuard],
    },
    {
        path: RoutePaths.REGISTRATION,
        loadComponent: () => import('./features/inscripciones/inscripciones').then(m => m.Inscripciones)
    },
    {
        path: "**", component: NotFoundComponent
    }

];
