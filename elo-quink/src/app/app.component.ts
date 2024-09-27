import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookmarksTopComponent } from './bookmarks-top/bookmarks-top.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { FooterComponent } from './footer/footer.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        BookmarksComponent,
        BookmarksTopComponent,
        FooterComponent,
    ],
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: []
})
export class AppComponent {
    title = 'elo-quink';

    constructor() {    }
}

export class BookmarkItem {
    public type: 'folder' | 'bookmark' = 'folder';
    public expanded: boolean = false;
    public dateAdded: Date | null = null;
    public id: string | null = null;
    public index: number | null = null;
    public parentId: string | null = null;
    public title: string | null = null;
    public iconSrc: string | null = null;
    public url: string | null = null;
    public children: BookmarkItem[] = [];
}
