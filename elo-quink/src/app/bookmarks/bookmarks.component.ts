import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookmarkItem } from '../app.component';
import { ApplicationService } from '../_shared/application.service';

@Component({
    selector: 'app-bookmarks',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './bookmarks.component.html',
    styleUrl: './bookmarks.component.scss'
})
export class BookmarksComponent {

    public bookmarks: BookmarkItem[] = [];

    constructor(
        public _service: ApplicationService
    ) {
        this.bookmarks = this._service.bookmarks;
    }
}
