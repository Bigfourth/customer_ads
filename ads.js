    function showAdFromMeta() {
        var metaTag = document.querySelector('meta[name="ad-slot-info"]');
        if (!metaTag || !metaTag.content) {
            console.error("Ad slot info not found in meta tag");
            return;
        }
        var adEntries = metaTag.content.split("; ");
        adEntries.forEach(function (entry) {
            var [adSlotId, adDivId] = entry.split(", ").map(str => str.trim());
            if (!adSlotId || !adDivId) {
                console.error("Invalid ad entry:", entry);
                return;
            }
            var adDivElement = document.getElementById(adDivId);
            if (!adDivElement) {
                console.error(`Ad div ${adDivId} not found`);
                return;
            }
            console.log(`Displaying ad: ${adSlotId} in ${adDivId}`);
            googletag.cmd.push(function () {
                googletag.defineSlot(adSlotId, [[300, 250]], adDivId).addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
                googletag.display(adDivId);
            });
        });
    }
    function showAnchorAd(anchorSlotId) {
        if (!anchorSlotId) return;
        console.log("Show anchor ad");

        googletag.cmd.push(function () {
            const slot = googletag.defineOutOfPageSlot(
                anchorSlotId,
                googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR
            );
            if (slot) slot.addService(googletag.pubads());
            googletag.enableServices();
            googletag.display(slot);
        });
    }

    function showInterstitialAd(interstitialSlotId) {
        if (!interstitialSlotId) return;
        console.log("Show interstitial ad");

        googletag.cmd.push(function () {
            const slot = googletag.defineOutOfPageSlot(
                interstitialSlotId,
                googletag.enums.OutOfPageFormat.INTERSTITIAL
            );
            if (slot) slot.addService(googletag.pubads());
            googletag.enableServices();
            googletag.display(slot);
        });
    }
    (function () {
        window.googletag = window.googletag || { cmd: [] };
        showAdFromMeta();
        var anchorSlotId = "";
        var intertialsSlotId = "";
        showAnchorAd(anchorSlotId);
        showInterstitialAd(intertialsSlotId);
    })();
