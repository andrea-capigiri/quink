import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: []
})
export class AppComponent {
    title = 'elo-quink';
    public bookmarks: BookmarkItem[] = [];

    constructor() {
        window.chrome.bookmarks.getTree()
            .then((items) => {
                this.bookmarks = (items.at(0)?.children ?? []) //this.bookmarks_source
                    .map(item => this._mapData(item))[0]
                    .children;
            });
    }

    private _mapData(item: any): BookmarkItem {
        return <BookmarkItem>{
            type: (!!item.children && item.children.length > 0 && !item.url) ? 'folder' : 'bookmark',
            expanded: false,
            id: item.id,
            parentId: item.parentId,
            title: item.title,
            iconSrc: this.getFaviconURL(item.url),
            url: item.url,
            children: (!!item.children && item.children.length > 0) ? Object.values(item.children).map(c => this._mapData(c)) : []
        };
    }

    private getFaviconURL(u: string) {
        const url = new URL(chrome.runtime.getURL("/_favicon/"));
        url.searchParams.set("pageUrl", u);
        url.searchParams.set("size", "32");
        return url.toString();
    }

    private getBrowserInstance(): typeof chrome {
        // Get extension api Chrome or Firefox
        const browserInstance = window.chrome || (window as any)['browser'];
        return browserInstance;
    }
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
