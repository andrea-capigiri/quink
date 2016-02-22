///
/// ON LOAD
$(".most-visited").html("");
chrome.topSites.get(function (items) {
    $(".most-visited").html( $(".most-visited").html() +  Generate_MostVisited_Item(items) );
});

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
        return "<a href='" + item.url + "'>\
                    <div class='md-item'>\
                        <div class='md-item-icon'><span class='mdi mdi-bookmark-outline'></span></div>\
                        <div class='md-item-title'>\
                            <div class='docs-homescreen-list-item-title-value'>" + item.title + "</div>\
                            <span class='docs-homescreen-list-item-shared-icon' title='Shared'>\
                                <div class='docs-homescreen-icon docs-homescreen-icon-medium'>\
                                    <div class='docs-homescreen-img docs-homescreen-shared-black-24'></div>\
                                </div>\
                            </span>\
                        </div>\
                        <div class='docs-homescreen-item-overflow' id=':42.d-h-iv-of' tabindex='-1' role='button' aria-haspopup='true' aria-label='More actions. Popup button.'>\
                            <div class='docs-homescreen-icon docs-homescreen-icon-medium'>\
                                <div class='docs-homescreen-img docs-homescreen-item-overflow-24'></div>\
                            </div>\
                        </div>\
                        <div class='docs-homescreen-dummyanchor'></div>\
                    </div>\
                </a>";
    } /// Cartella
    else {
        var a = "<a href='" + item.url + "'>\
                    <div class='md-item'>\
                        <div class='md-item-icon'><span class='mdi mdi-folder-outline'></span></div>\
                        <div class='md-item-title'>\
                            <div class='docs-homescreen-list-item-title-value'>" + item.title + "</div>\
                            <span class='docs-homescreen-list-item-shared-icon' title='Shared'>\
                                <div class='docs-homescreen-icon docs-homescreen-icon-medium'>\
                                    <div class='docs-homescreen-img docs-homescreen-shared-black-24'></div>\
                                </div>\
                            </span>\
                        </div>\
                        <div class='docs-homescreen-item-overflow' id=':42.d-h-iv-of' tabindex='-1' role='button' aria-haspopup='true' aria-label='More actions. Popup button.'>\
                            <div class='docs-homescreen-icon docs-homescreen-icon-medium'>\
                                <div class='docs-homescreen-img docs-homescreen-item-overflow-24'></div>\
                            </div>\
                        </div>\
                        <div class='docs-homescreen-dummyanchor'></div>\
                    </div>\
                </a>"
                + Generate_Bookmark_Item(item.children);
        /*var a = "<tr>\
                    <td class='favicon'><i class='ico mdi mdi-folder-outline'></i></td>\
                    <td class='mdl-data-table__cell--non-numeric'><a href='" + item.url + "'>" + item.title + "</a></td>\
                    <td style='width: 20px;'><i class='mdi mdi-chevron-right'></i></td>\
                </tr>"
                + Generate_Bookmark_Item(item.children);
        return chrome.bookmarks.getChildren(item.id, function(ls) {
            a+= "<tr>\
                    <td><i class='ico mdi mdi-folder-outline'></i></td>\
                    <td class='mdl-data-table__cell--non-numeric'><a href='" + item.url + "'>" + item.title + "</a></td>\
                    <td style='width: 20px;'><i class='mdi mdi-chevron-right'></i></td>\
                </tr>"
                + Generate_Bookmark_Item(ls);
                    //<a class='ico mdi mdi-folder-outline'></a>\
                    //<td style='width: 20px;'><i class='mdi mdi-chevron-right'></i></td>
        });*/
        return a;
    }
}

$(".goto").click(function() { chrome.tabs.update({ url: $(this).data("url") }); });
