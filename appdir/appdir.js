function extractIcon(manifest, origin) {
    var iconURL = "../i/openbox.png";
    if (manifest && manifest.icons) {
        if (manifest.icons["128"]) iconURL = manifest.icons["128"];
        else {

        }
    }
    if (iconURL.indexOf("/") === 0) iconURL = origin + iconURL;
    return iconURL;
}

$(document).ready(function() {
    var installed = null;

    $.getJSON( "db/apps.json", function(contents) {
        console.log("whee");
        // whee!  we got our app database.  let's rip through and add all them apps to the
        // directory
        var d = $("#contentWrap");
        d.empty();
        for (var k in contents) {
            var manifest = contents[k];
            var e = $("<div />");
            var button = $("<div />").addClass("button").text("Loading...");
            button.appendTo(e);
            var icon = $('<img />');
            icon.attr('src', extractIcon(manifest, k));
            icon.appendTo(e);

            // on load error, reset to default icon.
            icon.error(function() {
                $(this).unbind("error").attr("src", extractIcon());
            });
            var name = $("<div />").addClass("name").text(manifest.name);
            name.appendTo(e);
            if (manifest.developer && manifest.developer.name) {
                var attribution = $("<div />").addClass("attribution");
                attribution.append("<span/>").text("by ");
                if (manifest.developer.url) {
                    $("<a/>").attr("href", manifest.developer.url)
                        .text(manifest.developer.name).appendTo(attribution);
                } else {
                    $("<span/>").text(manifest.developer.name).appendTo(attribution);
                }
                attribution.appendTo(e);

            }

            function updateStatus(elem) { 
                function checkMe(elem) {
                    var origin = $(elem).attr("origin");
                    for (var i = 0; i < installed.length; i++) {
                        if (origin === installed[i].origin) break;
                    }
                    if (i === installed.length) {
                        $(elem).find(".button").addClass("installable").text("Install")
                            .click(function() {
                                $(elem).find(".button").unbind('click').removeClass("installable").text("Loading...");
                                navigator.apps.install(
                                    {
                                        url: $(elem).attr("appManifestURL"),
                                        onsuccess: function() {
                                            console.log("install clicked!");
                                            installed = null;
                                            updateStatus(elem);
                                        },
                                        onerror: function(errObj) {
                                            alert("oh no baby, business hours are over: " + errObj.code + " - " + errObj.message);
                                            console.log(errObj);
                                            updateStatus(elem);
                                        }
                                    }
                                );
                            });
                    } else {
                        $(elem).find(".button").addClass("installed").text("Installed!")
                    }
                }

                if (installed === null) {
                    navigator.apps.getInstalledBy(function(i) {
                        installed = i;
                        console.log(installed);
                        checkMe(elem);
                    });
                } else {
                    checkMe(elem);
                }
            }

            e.hover(function() {
                var self = this;
                $(this).unbind('mouseenter mouseleave');
                updateStatus(self);
           });
            console.log(manifest.src_url);
            e.attr("appManifestURL", manifest.src_url);
            e.attr("origin", k);
            e.addClass("singleColumn").appendTo(d);
        }
    });
});
