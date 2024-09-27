import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {

    public env: any = environment;

    public editBookmarks() {
        location.href = environment.favoriteEditorPath;
    }
}
