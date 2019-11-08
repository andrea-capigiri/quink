/*/ Link Trick ====================================================== /*/ {
    $('.goto').click(function() {
        chrome.tabs.update({
            url: $(this).data('url')
        });
    });
}
/*/ Popover ========================================================= /*/ {
    $('.popover').hover(function() {
        $('.popover-content').remove();
        var content = $(this).attr('data-popovermsg');
        $('body').append('<span class="popover-content">' + content + '</span>');
    }, function () {
        $('.popover-content').remove();
    });
    $('body').mousemove(function(e) {
        var popover = $('.popover-content');
        if (popover != undefined) {
            if (e.pageX + popover.outerWidth() >= $(window).outerWidth()-5)
                popover.css({ top: e.pageY+22, left: e.pageX-popover.outerWidth()+10 });
            else popover.css({ top: e.pageY+22, left: e.pageX-10 });
        }
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

    chrome.topSites.get(function(items) {
        if (opt.mostvisited) DOM.mostvisited.html(Generate_Bookmark_Item(items));
    });
    chrome.bookmarks.getSubTree('1', function(items) {
        $(".bookmark-bar").html(Generate_Bookmark_Item(items[0].children));
    });
});

DOM.QueryInput.on('focusin', function(e) {
    $(".search-result").fadeIn(100);
    DOM.QueryInput.trigger('keyup');
});
DOM.QueryInput.on('focusout', function(e) {
    if (!opt.DEBUG) $(".search-result").fadeOut(100);
});
DOM.QueryInput.on('keydown', function(e) {
    var lsItem = $('.md-table.highlight');
    switch (e.keyCode) {
        case 27:
            e.preventDefault();
            DOM.QueryInput.val('').trigger('focusout');
            break;
        case 38:
            var lsPrev = lsItem.prev();
            if (lsPrev.length != 0) {
                e.preventDefault();
                lsItem.removeClass('highlight');
                lsPrev.addClass('highlight');
            }
            break;
        case 40:
            var lsNext = lsItem.next();
            if (lsNext.length != 0) {
                e.preventDefault();
                lsItem.removeClass('highlight');
                lsNext.addClass('highlight');
            }
            break;
    }
});
DOM.QueryInput.on('keyup', function(e) {
    if (e.keyCode === 38 || e.keyCode === 40) return;
    else if (e.keyCode === 13) {
        var url = $('.md-table.highlight').prop('href');
        chrome.tabs.update({
            url: url
        });
        return;
    } else chrome.bookmarks.search(DOM.QueryInput.val(), function(data) {
        var table_class = 'highlight';
        var query = DOM.QueryInput.val();
        var HTML = '';

        if (query.length != 0) {
            if (IsUrl(query)) {
                if (query.indexOf('http://' == -1) && query.indexOf('https://' == -1))
                    query = 'http://' + query;
                HTML += '\
                    <a class="md-table ' + table_class + ' goto" href="' + query + '" data-url="' + query + '">\
                        <div class="md-row">\
                            <div class="md-item-icon"><span class="mdi mdi-link"></span></div>\
                            <div class="md-item-title">Go to: ' + query + '</div>\
                        </div>\
                    </a>';
            } else {
                HTML += '\
                    <a class="md-table ' + table_class + '" href="https://google.com/search?q=' + encodeURIComponent(query) + '">\
                        <div class="md-row">\
                            <div class="md-item-icon"><span class="mdi mdi-magnify"></span></div>\
                            <div class="md-item-title">Search on Google: ' + query + '</div>\
                        </div>\
                    </a>';
            }
            table_class = '';
        }
        HTML += Generate_Bookmark_Item(data, false);
        HTML += '\
            <a class="md-table donate " href="https://andreacapigiri.com/quink?scope=donate&src=quink-search">\
                <div class="md-row">\
                    <div class="md-item-icon"><span class="mdi mdi-currency-usd"></span></div>\
                    <div class="md-item-title">Please donate to help the project!</div>\
                </div>\
            </a>';
        $(".search-result-content").html(HTML);
    });
});

DOM.SearchResult.on('hover', 'a.md-table', function() {
    debugger;
    $(this).addClass('highlight');
}, function() {
    $(this).removeClass('highlight');
});

///
///   FUNCTIONS
var MostVisited_Count = 0;

function Generate_MostVisited_Item(item) {
    if (item == undefined || item == null) return "";
    /// Array di elementi
    //if (MostVisited_Count == 7) return "";
    MostVisited_Count++;
    if (item instanceof Array) {
        var HTML = "";
        item.forEach(function(obj) {
            HTML += Generate_MostVisited_Item(obj);
        });
        return HTML;
    } /// Bookmark
    else if (item.url != undefined) {
        return "<a href='" + item.url + "'>\
                        <div class='item'>\
                            <img src='' />\
                            <div class='label'>" + item.title + "</div>\
                        </div>\
                    </a>";
    }
}

function Generate_Bookmark_Item(item, showFolder) {
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

function IsUrl(s) {
    return s.match(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi);
}