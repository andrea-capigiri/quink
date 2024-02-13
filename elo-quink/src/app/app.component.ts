import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: 'app.component.html'
    //styles: ['app.component.scss'],
})
export class AppComponent {
    title = 'elo-quink';
    public bookmarks_source: any[] = [
        {
            "children":
                [{ "dateAdded": 1617372255000, "id": "7", "index": 0, "parentId": "1", "title": "Digonos TimeTracking", "url": "https://timetracking.digonos.cloud/" },
                { "dateAdded": 1643822411000, "id": "8", "index": 1, "parentId": "1", "title": "Supporto Digonos/Ethea", "url": "https://support.digonos.com/" },
                { "dateAdded": 1615041460000, "id": "9", "index": 2, "parentId": "1", "title": "localhost UI", "url": "http://localhost:4200/" },
                { "dateAdded": 1615041475000, "id": "10", "index": 3, "parentId": "1", "title": "localhost API", "url": "https://localhost:44300/swagger" },
                { "dateAdded": 1657009491000, "id": "11", "index": 4, "parentId": "1", "title": "RabbitMQ", "url": "http://192.168.10.85:15672/#/" },
                {
                    "children": [{ "dateAdded": 1675765779308, "id": "13", "index": 0, "parentId": "12", "title": "Microsoft 365", "url": "https://www.office.com/" },
                    { "dateAdded": 1615040036000, "id": "14", "index": 1, "parentId": "12", "title": "Microsoft Teams", "url": "https://teams.microsoft.com/" },
                    { "dateAdded": 1675766041162, "id": "15", "index": 2, "parentId": "12", "title": "Outlook", "url": "https://outlook.office.com/mail/" },
                    { "dateAdded": 1675948721439, "id": "16", "index": 3, "parentId": "12", "title": "To Do", "url": "https://to-do.office.com/" }, { "dateAdded": 1675948823514, "id": "17", "index": 4, "parentId": "12", "title": "Calendario", "url": "https://outlook.office.com/calendar/view/month" }], "dateAdded": 1663369806687, "dateGroupModified": 1675948823514, "id": "12", "index": 5, "parentId": "1", "title": "Microsoft 365"
                },
                { "children": [{ "dateAdded": 1566805346000, "id": "19", "index": 0, "parentId": "18", "title": "DevOps", "url": "https://dev.azure.com/digonos/" }, { "dateAdded": 1615040449000, "id": "20", "index": 1, "parentId": "18", "title": "Open in all projects", "url": "https://dev.azure.com/digonos/Queries/_queries/query/488eafd2-cdd3-4775-94fe-ace43aa88ad7" }, { "dateAdded": 1615040456000, "id": "21", "index": 2, "parentId": "18", "title": "Open and assigned to me in all projects", "url": "https://dev.azure.com/digonos/Queries/_queries/query/c95069de-8658-4bc6-b2e6-5e712c2f4b9c" }], "dateAdded": 1663369806686, "dateGroupModified": 1663369806686, "id": "18", "index": 6, "parentId": "1", "title": "DevOps" }, { "children": [{ "children": [{ "dateAdded": 1622559448000, "id": "24", "index": 0, "parentId": "23", "title": "Leasequote PRD", "url": "https://leasequote.rentalsolutions.bnpparibas.it/" }, { "dateAdded": 1622559465000, "id": "25", "index": 1, "parentId": "23", "title": "Leasequote UAT", "url": "https://leasequotetest.rentalsolutions.bnpparibas.it/" }], "dateAdded": 1663369806685, "dateGroupModified": 1663369806685, "id": "23", "index": 0, "parentId": "22", "title": "BNP" }, { "children": [{ "dateAdded": 1670428291215, "id": "27", "index": 0, "parentId": "26", "title": "LendingPortal PRD", "url": "https://workflow.hypovbg.it/" }, { "dateAdded": 1653485582000, "id": "28", "index": 1, "parentId": "26", "title": "LendingPortal UAT", "url": "https://test-lendingportal.hypovbg.it/login" }, { "dateAdded": 1622800613000, "id": "29", "index": 2, "parentId": "26", "title": "CustomerPortal PRD", "url": "https://myhypoleasing.hypovbg.it/login" }, { "dateAdded": 1661505401000, "id": "30", "index": 3, "parentId": "26", "title": "CustomerPortal UAT", "url": "https://test-myhypoleasing.hypovbg.it/" }, { "dateAdded": 1677485717561, "id": "31", "index": 4, "parentId": "26", "title": "IDBook", "url": "https://www.hypovbgit.it/login?ref=%2F" }], "dateAdded": 1663369806685, "dateGroupModified": 1706525074303, "id": "26", "index": 1, "parentId": "22", "title": "HYPO" }, { "children": [{ "dateAdded": 1628496302000, "id": "33", "index": 0, "parentId": "32", "title": "B2B Esprinet UAT", "url": "https://b2b-uat.esprinet.com/" }, { "dateAdded": 1646298127000, "id": "34", "index": 1, "parentId": "32", "title": "EspriRent UAT IT", "url": "https://esprirent-it-uat.esprinet.com/login" }, { "dateAdded": 1646298111000, "id": "35", "index": 2, "parentId": "32", "title": "EspriRent UAT ES", "url": "https://esprirent-es-uat.esprinet.com/login" }], "dateAdded": 1663369806685, "dateGroupModified": 1663369806685, "id": "32", "index": 2, "parentId": "22", "title": "Esprinet UAT" }, { "children": [{ "dateAdded": 1616583986000, "id": "37", "index": 0, "parentId": "36", "title": "EspriRent PRD IT", "url": "https://esprirent-it.esprinet.com/login" }, { "dateAdded": 1648828859000, "id": "38", "index": 1, "parentId": "36", "title": "EspriRent PRD ES", "url": "https://esprirent-es.esprinet.com/login" }], "dateAdded": 1663369806686, "dateGroupModified": 1663369806686, "id": "36", "index": 3, "parentId": "22", "title": "Esprinet PRD" }, { "children": [{ "dateAdded": 1671440109906, "id": "40", "index": 0, "parentId": "39", "title": "UAT IDBook", "url": "https://idbook-solutionbank.digonos.cloud/login" }], "dateAdded": 1671440149137, "dateGroupModified": 1671440149137, "id": "39", "index": 4, "parentId": "22", "title": "SolutionBank" }, { "dateAdded": 1634118117000, "id": "41", "index": 5, "parentId": "22", "title": "Lending Portal", "url": "https://lendingportal.digonos.cloud/login" }], "dateAdded": 1663369806684, "dateGroupModified": 1663369806684, "id": "22", "index": 7, "parentId": "1", "title": "Ambienti" }, { "dateAdded": 1627655635000, "id": "42", "index": 8, "parentId": "1", "title": "P.IVA", "url": "https://www.icar.cnr.it/wp-content/uploads/2019/06/Elenco-ditte-invitate-alla-Rdo-N.-2322487.pdf" }, { "dateAdded": 1669644374067, "id": "43", "index": 9, "parentId": "1", "title": "Elenco Imprese AREZZO", "url": "https://www.visura.pro/provincia/arezzo/1.html" }, { "dateAdded": 1622726627000, "id": "44", "index": 10, "parentId": "1", "title": "IBAN", "url": "https://www.rgs.mef.gov.it/_Documenti/VERSIONE-I/CIRCOLARI/2007/20/Codici-IBAN-CC.pdf" }, { "dateAdded": 1665675524740, "id": "45", "index": 11, "parentId": "1", "title": "BPCE Lease LP", "url": "https://bpcelease.digonos.cloud/backoffice-area/dashboard" }], "dateAdded": 1704192352017, "dateGroupModified": 1669644374067, "id": "1", "index": 0, "parentId": "0", "title": "Favorites bar"
        }];
    public bookmarks: BookmarkItem[] = [];

    constructor() {
        window.chrome.bookmarks.getTree()
            .then((items) => {
                this.bookmarks = (items.at(0)?.children ?? []) //this.bookmarks_source
                    .map(item => this._mapData(item))[0]
                    .children;
            });

        //"chrome://favicon/",
        //"https://*/*",
        //"http://*/*"

        //  window.chrome.storage.sync.get('options', (data) => {
        //      debugger
        //      // /// GETTING OPTIONS FROM STORAGE
        //      // if (data == null) chrome.storage.sync.set('options', opt);
        //      // else opt = $.extend({}, opt, data);
        //      //
        //      // /// NOTEPAD EVENTS
        //      // if (opt.notepad) {
        //      //     DOM.notepad.html(opt.notepad_content);
        //      //     $('body').on('keydown', 'section#notepad', function () {
        //      //         opt.notepad_content = DOM.notepad.html();
        //      //     });
        //
        //      window.chrome.bookmarks.getSubTree('1', (items) => {
        //          debugger
        //          //    $(".bookmark-bar").html(Generate_Bookmark_Item(items[0].children));
        //          //    $('main').toggle(true);
        //      });
        //  });
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




/*
(item, showFolder) {
    if (item == undefined || item == null) return "";
    if (showFolder == undefined) showFolder = true;

    /// Array di elementi
    if (item instanceof Array) {
        var HTML = "";
        item.forEach(function(obj) {
            HTML += Generate_Bookmark_Item(obj, showFolder);
        });
        return HTML;
    } /// Bookmark
    else if (item.url != undefined) {
        item.icon = "<span class='mdi mdi-bookmark-outline'>";
        if (opt.usefavicon) item.icon = "<img src='chrome://favicon/" + item.url + "'>";

        return "<a class='md-table' href='" + item.url + "'>\
                        <div class='md-row'>\
                            <div class='md-item-icon'>" + item.icon + "</div>\
                            <div class='md-item-title'>" + item.title + "\
                                <div class='small'>" + item.url + "</div>\
                            </div>\
                        </div>\
                    </a>";
    } /// Cartella
    else if (showFolder) {
        item.expandicon = "<span class='mdi mdi-plus'></span>";
        item.expanddisplay = "style='display:none;'";
        if (opt.autoexpanded) {
            item.expandicon = "<span class='mdi mdi-minus'></span>";
            item.expanddisplay = "";
        }

        return "<div class='md-table' data-folder='" + item.id + "'>\
                        <div class='md-row md-folder'>\
                            <div class='md-item-expand'>" + item.expandicon + "</div>\
                            <div class='md-item-title'>" + item.title + "</div>\
                        </div>\
                    </div>\
                    <div class='md-folder-exploded' data-folder='" + item.id + "' " + item.expanddisplay + " >\
                        " + Generate_Bookmark_Item(item.children, showFolder) + "\
                    </div>";
    }
    return " ";
}
*/
