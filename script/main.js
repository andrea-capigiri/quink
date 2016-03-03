///
/// ON LOAD
chrome.storage.sync.get("optShowMostVisited", function(obj) {
    chrome.topSites.get(function (items) {
        $(".most-visited").html( $(".most-visited").html() +  Generate_MostVisited_Item(items) );
        if(obj.optShowMostVisited) $(".most-visited").show();
    });
});
var optUseFavicon = false;
chrome.storage.sync.get("optUseFavicon", function(obj) { optUseFavicon = obj.optUseFavicon; });

$(".bookmark-bar").html("");
chrome.bookmarks.getChildren("1", function(items) {
    $(".bookmark-bar").html( $(".bookmark-bar").html() + Generate_Bookmark_Item(items) );
});

$(".other-bookmark").html("");
chrome.bookmarks.getChildren("2", function(items) {
    $(".other-bookmark").html( $(".other-bookmark").html() + Generate_Bookmark_Item(items) );
});

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
                        <img src='chrome://thumb/" + item.url + "' />\
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
        if (optUseFavicon) item.icon = "<img src='chrome://favicon/" + item.url + "'>";

        return "<a href='" + item.url + "'>\
                    <div class='md-item'>\
                        <div class='md-item-icon'>" + item.icon + "</div>\
                        <div class='md-item-title'>" + item.title + "</div>\
                    </div>\
                </a>";
    } /// Cartella
    else {
        return "<a href='" + item.url + "'>\
                    <div class='md-item'>\
                        <div class='md-item-icon'><span class='mdi mdi-folder-outline'></div>\
                        <div class='md-item-title'>" + item.title + "</div>\
                    </div>\
                </a>"
                + Generate_Bookmark_Item(item.children);
        return a;
    }
}

$("main").masonry({
    itemSelector: ".flex-item",
    columnWidth: ".flex-item",
    gutter: 10,
    fitWidth: true
});

$(".goto").click(function() { chrome.tabs.update({ url: $(this).data("url") }); });
