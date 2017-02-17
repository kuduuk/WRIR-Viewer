define(function() {
    var a = "_asyncApiLoaderCallback";
    return {
        load: function(b, c, d) {
            a && (dojoConfig[a] = function() {
                delete dojoConfig[a], a = null, d()
            }, require([b + "&callback=dojoConfig." + a]))
        }
    }
});
//# sourceMappingURL=async.map
