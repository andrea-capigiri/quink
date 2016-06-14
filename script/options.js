
var opt = [
    { 'use-favicon':        true  },
    { 'show-mostvisited':   false },
    { 'show-notepad':       false }];


chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);
    console.log(allKeys);
    for (var i=0; i<Object.keys(items); i++)
    {
        if (opt.Object.keys[i]) {

        }
    }
});





chrome.storage.sync.get("opt_autoexpanded", function(obj) { $("[name='optAutoExpanded']").prop("checked", obj.opt_autoexpanded); });
chrome.storage.sync.get("opt_usefavicon", function(obj) { $("[name='optUseFavicon']").prop("checked", obj.opt_usefavicon); });

$("checkbox").change(function() { chrome.storage.sync.set({ 'opt_showmostvisited': $("[name='optShowMostVisited']").prop("checked") }, Alert()); });
$("checkbox").change(function() { chrome.storage.sync.set({ 'opt_autoexpanded': $("[name='optAutoExpanded']").prop("checked") }, Alert()); });
$("checkbox").change(function() { chrome.storage.sync.set({ 'opt_usefavicon': $("[name='optUseFavicon']").prop("checked") }, Alert()); });
//$("checkbox").change(function() { chrome.storage.sync.set({ 'opt_showmostvisited': $("[name='optShowMostVisited']").prop("checked") }, Alert()); });

$(".goto").click(function() { chrome.tabs.update({ url: $(this).data("url") }); });
function Alert() { $(".popup").fadeIn(); setTimeout(function() { $(".popup").fadeOut(); }, 750); }
