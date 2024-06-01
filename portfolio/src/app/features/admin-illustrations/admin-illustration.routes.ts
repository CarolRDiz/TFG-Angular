import { Routes } from "@angular/router";
import { AdminIllustrationComponent } from "./pages/admin-illustration/admin-illustration.component";
import { AdminCreateIllustrationComponent } from "./pages/admin-create-illustration/admin-create-illustration.component";
import { AdminEditIllustrationComponent } from "./pages/admin-edit-illustration/admin-edit-illustration.component";

const routes: Routes = [
  {
    path: "",
    children: [
        {
            path: '',
            loadComponent: () => import("./pages/admin-illustration/admin-illustration.component")
                    .then(mod => mod.AdminIllustrationComponent)
        },
        {
        path: 'create-illustration',
        loadComponent: () => import("./pages/admin-create-illustration/admin-create-illustration.component")
                    .then(mod => mod.AdminCreateIllustrationComponent)
        },
        {
        path: 'edit-illustration/:id',
        loadComponent: () => import("./pages/admin-edit-illustration/admin-edit-illustration.component")
                    .then(mod => mod.AdminEditIllustrationComponent)
        },
    ]
  },
];

export default routes;