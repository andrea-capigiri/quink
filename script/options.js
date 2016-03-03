
chrome.storage.sync.get("optShowMostVisited", function(obj) { $("[name='optShowMostVisited']").prop("checked", obj.optShowMostVisited); });
chrome.storage.sync.get("optUseFavicon", function(obj) { $("[name='optUseFavicon']").prop("checked", obj.optUseFavicon); });

$("input[name='optShowMostVisited']").change(function() {
    var data = {};
    data.optShowMostVisited = $("[name='optShowMostVisited']").prop("checked");
    chrome.storage.sync.set(data, Alert);
});
$("input[name='optUseFavicon']").change(function() {
    var data = {};
    data.optUseFavicon = $("[name='optUseFavicon']").prop("checked");
    chrome.storage.sync.set(data, Alert());
});

$(".goto").click(function() { chrome.tabs.update({ url: $(this).data("url") }); });
function Alert() { $(".popup").fadeIn(); setTimeout(function() { $(".popup").fadeOut(); }, 750); }
