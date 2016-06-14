$('.goto').click(function() { chrome.tabs.update({ url: $(this).data('url') }); });
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
    QueryInput:         $('.search-input'),
    notepad:            $('section#notepad'),
    mostvisited:        $('section#mostvisited')
}
var opt = {
    usefavicon:         true,
    mostvisited:        true,
    autoexpanded:       false,
    notepad:            true,
    notepad_content:    '',
};
chrome.storage.sync.get('options', function (data) {
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

    chrome.topSites.get(function (items) {
        if (opt.mostvisited) DOM.mostvisited.html(Generate_Bookmark_Item(items));
    });
    chrome.bookmarks.getSubTree('1', function(items) {
        $(".bookmark-bar").html(Generate_Bookmark_Item(items[0].children));
    });



});
$(function() {
    DOM.QueryInput.on('focusin',  function(e) { $(".search-result").fadeIn(100);  });
    DOM.QueryInput.on('focusout', function(e) { $(".search-result").fadeOut(100); });
    DOM.QueryInput.on('keyup',    function(e) {
        $(".search-result-content").toggle(DOM.QueryInput.val().length > 0);
        if (DOM.QueryInput.val().length > 0 && e.keyCode == 13)
            chrome.tabs.update({ url: 'https://google.com/search?q=' + encodeURIComponent(this.value) });
        else if (DOM.QueryInput.val().length > 1)
            chrome.bookmarks.search(this.value, function (data) {
                var HTML = '\
                    <a class="md-table" href="https://google.com/search?q=' + encodeURIComponent(this.value) + '">\
                        <div class="md-row">\
                            <div class="md-item-icon"><span class="mdi mdi-magnify"></span></div>\
                            <div class="md-item-title">' + DOM.QueryInput.val() + '</div>\
                        </div>\
                    </a>';
                HTML += Generate_Bookmark_Item(data, false);
                $(".search-result-content").html(HTML);
            });
    });
});



/*
Object.observe(opt, function(changes) {
    console.log(changes[0]);

});


///
/// ON LOAD
/*chrome.storage.sync.get("optShowMostVisited", function(obj) {

});
*/

$(".bookmark-bar").html("");


/*
$(".other-bookmark").html("");
chrome.bookmarks.getSubTree("2", function(items) {
    $(".other-bookmark").html( $(".other-bookmark").html() + Generate_Bookmark_Item(items) );
});*/

///
///   FUNCTIONS
var MostVisited_Count = 0;
function Generate_MostVisited_Item(item) {
    if (item == undefined || item == null) return "";
    /// Array di elementi
    //if (MostVisited_Count == 7) return "";
    MostVisited_Count ++;
    if (item instanceof Array) {
        var HTML = "";
        item.forEach(function(obj) {
            HTML +=  Generate_MostVisited_Item(obj);
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
        if (opt.autoexpanded) { item.expandicon = "<span class='mdi mdi-minus'></span>"; item.expanddisplay = ""; }

        return "<div class='md-table' data-folder='" + item.id + "'>\
                    <div class='md-row md-folder'>\
                        <div class='md-item-title'>" + item.title + "</div>\
                        <div class='md-item-expand'>" + item.expandicon + "</div>\
                    </div>\
                </div>\
                <div class='md-folder-exploded' data-folder='" + item.id + "' " + item.expanddisplay + " >\
                    " + Generate_Bookmark_Item(item.children, showFolder) + "\
                </div>";
    }
    return " ";
}
