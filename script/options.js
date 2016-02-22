
chrome.storage.sync.get("optShowMostVisited", function(obj) { $("[name='optShowMostVisited']").prop("checked", obj.optShowMostVisited); });
chrome.storage.sync.get("optUseFavicon", function(obj) { $("[name='optUseFavicon']").prop("checked", obj.optUseFavicon); });

// Saves options to chrome.storage
$("input, checkbox").change(function() {

    var data = {
        "optShowMostVisited": $("[name='optShowMostVisited']").is("checked"),
        "optUseFavicon": $("[name='optUseFavicon']").is("checked")
    };
    chrome.storage.sync.set(data, function() {
        $(".popup").fadeIn();
        setTimeout(function() { $(".popup").fadeOut(); }, 750);
    });
});

$(".goto").click(function() { chrome.tabs.update({ url: $(this).data("url") }); });
