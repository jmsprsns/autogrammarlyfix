var refreshTimer;
var lastValue = null;
var unchangedCount = 0;
var observer;

function refreshData() {
    x = 1; 
    try {
        if (document.querySelector('.cards-replacements_labels-itemRemove') !== null) {
            var newclass = document.querySelector('.cards-replacements_labels-itemRemove');
            newclass.click();
        } else {
            var newclass = document.getElementsByClassName("cards-replacements_labels-itemInsert");
            newclass = newclass[0];
            newclass.click();
        }

        var currentValue = document.querySelector('.counterText').textContent;
        if (currentValue === lastValue) {
            unchangedCount++;
            if (unchangedCount >= 5) {
                console.log("Value unchanged for 5 refreshes, stopping script.");
                clearTimeout(refreshTimer);
                return; 
            }
        } else {
            unchangedCount = 0; 
            lastValue = currentValue; 
        }

    } catch (error) {
        if (document.getElementsByClassName("wrapper_fipkee2") !== null) {
            var cli = document.getElementsByClassName("wrapper_fipkee2");
            var vli = cli[0];
            vli.click();
        }
    }

    refreshTimer = setTimeout(refreshData, x * 1000);
}

function checkForChanges() {
    var currentValue = document.querySelector('.counterText').textContent;
    if (currentValue === lastValue) {
        unchangedCount++;
        if (unchangedCount >= 5) {
            console.log("Value unchanged for 5 refreshes, stopping script.");
            clearTimeout(refreshTimer);
            observer.disconnect();
            return;
        }
    } else {
        unchangedCount = 0;
        lastValue = currentValue;
    }
}

function startObserving() {
    var targetNode = document.querySelector('.counterText');
    if (!targetNode) {
        console.log("Target node not found");
        return;
    }

    var config = { characterData: true, childList: true, subtree: true };

    observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            checkForChanges();
        });
    });

    observer.observe(targetNode, config);
}

// Start the process
refreshData();
startObserving();
