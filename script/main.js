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

var opt = {
    usefavicon:       true,
    mostvisited:      true,
    notepad:          true,
    autoexpanded:     false
};
chrome.storage.sync.get('options', function (data) {
    /// GETTING OPTIONS FROM STORAGE
    if (data == null) chrome.storage.sync.set('options', opt);
    else opt = $.extend({}, opt, data);

    chrome.bookmarks.getSubTree('1', function(items) {
        $(".bookmark-bar").html(Generate_Bookmark_Item(items[0].children));
    });



});


///
/// ON LOAD
/*chrome.storage.sync.get("optShowMostVisited", function(obj) {
    chrome.topSites.get(function (items) {
        $(".most-visited").html( $(".most-visited").html() +  Generate_MostVisited_Item(items) );
        if(obj.optShowMostVisited) $(".most-visited").show();
    });
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
    if (MostVisited_Count == 7) return "";
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
function Generate_Bookmark_Item(item) {
    if (item == undefined || item == null) return "";
    /// Array di elementi
    if (item instanceof Array) {
        var HTML = "";
        item.forEach(function(obj) {
            HTML += Generate_Bookmark_Item(obj);
        });
        return HTML;
    } /// Bookmark
    else if (item.url != undefined) {
        item.icon = "<span class='mdi mdi-bookmark-outline'>";
        if (opt.usefavicon) item.icon = "<img src='chrome://favicon/" + item.url + "'>";

        return "<a class='md-table' href='" + item.url + "'>\
                    <div class='md-row'>\
                        <div class='md-item-icon'>" + item.icon + "</div>\
                        <div class='md-item-title'>" + item.title + "</div>\
                    </div>\
                </a>";
    } /// Cartella
    else {
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
                    " + Generate_Bookmark_Item(item.children) + "\
                </div>";
    }
}
