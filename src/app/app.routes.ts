import { Routes } from '@angular/router';
import { RoutePaths } from '../shared/routes';
import { Alumnos } from './features/alumnos/alumnos';
import { NotFoundComponent } from './features/not-found-component/not-found-component';

export const routes: Routes = [
    {
        path: "", 
        component: Alumnos
    },
    {
        path: RoutePaths.ALUMNOS,
        component: Alumnos,
    },
    {
        path: RoutePaths.CURSOS,
        loadComponent: () => import('./features/cursos/cursos').then(m => m.Cursos)
    },
    {
        path: RoutePaths.INSCRIPCIONES,
        loadComponent: () => import('./features/inscripciones/inscripciones').then(m => m.Inscripciones)
    },
 
    {
        path: "**", component: NotFoundComponent
    }

];
