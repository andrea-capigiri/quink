import { Component } from '@angular/core';
import { ApplicationService } from '../_shared/application.service';
import { BookmarkItem } from '../app.component';

@Component({
    selector: 'app-bookmarks-top',
    standalone: true,
    imports: [],
    templateUrl: './bookmarks-top.component.html',
    styleUrl: './bookmarks-top.component.scss'
})
export class BookmarksTopComponent {

    public bookmarks: BookmarkItem[] = [];

    constructor(
        public _service: ApplicationService
    ) {
        this.bookmarks = this._service.topBookmarks;
    }
}
