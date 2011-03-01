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
            e.hover(function() {
                var self = this;
                function checkMe(elem) {
                    $(elem).find(".button").addClass("installable").text("Install")
                        .click(function() {
                            
                        });
                    
                }

                $(this).unbind('mouseenter mouseleave');
                if (installed === null) {
                    navigator.apps.getInstalledBy(function(i) {
                        installed = i;
                        checkMe(self);
                    });
                } else {
                    checkMe(self);
                }
            });

            e.addClass("singleColumn").appendTo(d);

        }
    });
});
