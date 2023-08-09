/*/ Link Trick ====================================================== /*/ {
    $('.goto').click(function() {
        chrome.tabs.update({
            url: $(this).data('url')
        });
    });
}

$('body').on('click', '.md-table', function() {
    var folderID = $(this).data('folder');
    var subContainer = $('.md-folder-exploded[data-folder="' + folderID + '"]');
    if (subContainer.is(':visible')) {
        $(this).find('.md-item-expand').html('<span class="mdi mdi-plus"></span>');
        subContainer.slideUp(100);
    } else {
        $(this).find('.md-item-expand').html('<span class="mdi mdi-minus"></span>');
        subContainer.slideDown(100);
    }
});

var DOM = {
    QueryInput: $('.search-input'),
    SearchResult: $('.search-result'),
    notepad: $('section#notepad'),
    mostvisited: $('section#mostvisited')
}
var opt = {
    DEBUG: false,
    usefavicon: true,
    mostvisited: true,
    autoexpanded: false,
    notepad: true,
    notepad_content: '',
};
chrome.storage.sync.get('options', function(data) {
    /// GETTING OPTIONS FROM STORAGE
    if (data == null) chrome.storage.sync.set('options', opt);
    else opt = $.extend({}, opt, data);

    /// NOTEPAD EVENTS
    if (opt.notepad) {
        DOM.notepad.html(opt.notepad_content);
        $('body').on('keydown', 'section#notepad', function() {
            opt.notepad_content = DOM.notepad.html();
        });
    }

    chrome.bookmarks.getSubTree('1', function(items) {
        $(".bookmark-bar").html(generate_Bookmark_Item(items[0].children));
        $('main').toggle(true);
    });
});

///
///   FUNCTIONS

function generate_Bookmark_Item(item, showFolder) {
    if (item == undefined || item == null) return "";
    if (showFolder == undefined) showFolder = true;

    /// Array di elementi
    if (item instanceof Array) {
        var HTML = "";
        item.forEach(function(obj) {
            HTML += generate_Bookmark_Item(obj, showFolder);
        });
        return HTML;
    } /// Bookmark
    else if (item.url != undefined) {
        item.icon = "<span class='mdi mdi-bookmark-outline'>";
        if (opt.usefavicon) item.icon = "<img src='" + getFaviconUrl(item.url) + "'>";

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
                        " + generate_Bookmark_Item(item.children, showFolder) + "\
                    </div>";
    }
    return " ";
}

function isUrl(s) {
    return s.match(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi);
}

function getFaviconUrl(u) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", u);
    url.searchParams.set("size", "16");
    return url.toString();
}
