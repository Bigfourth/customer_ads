function showAds(adUnitId) {
        // Tách chuỗi adUnitId thành các phần tử slot/div
        var adEntries = adUnitId.split("; ");

        // Duyệt qua từng entry và hiển thị quảng cáo
        adEntries.forEach(function (entry) {
            var [adSlotId, adDivId] = entry.split(", ").map(str => str.trim());

            // Kiểm tra nếu adDivId tồn tại trên trang trước khi tiếp tục
            var adDivElement = document.getElementById(adDivId);
            if (!adDivElement) {
                console.error(`Ad div ${adDivId} not found`);
                return;
            }

            // Hiển thị quảng cáo cho từng slot
            googletag.cmd.push(function () {
                var slot = googletag.defineSlot(adSlotId, [[300, 250]], adDivId).addService(googletag.pubads());

                if (slot) {
                    googletag.pubads().enableSingleRequest();
                    googletag.enableServices();
                    googletag.display(adDivId); // Gọi display sau khi defineSlot thành công
                    console.log(`Displaying ad: ${adSlotId} in ${adDivId}`);
                } else {
                    console.error(`Slot not defined for ${adSlotId}`);
                }
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
        var adUnitId = "";
        var anchorSlotId = "";
        var intertialsSlotId = "";
        showAds(adUnitId);
        showAnchorAd(anchorSlotId);
        showInterstitialAd(intertialsSlotId);
    })();
