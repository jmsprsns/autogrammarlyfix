var refreshTimer;
var lastValue = null;
var unchangedCount = 0;
var observer;

function refreshData() {
    console.log("Running refreshData function");
    x = 1; 
    try {
        var itemRemove = document.querySelector('.cards-replacements_labels-itemRemove');
        var dismissButton = document.querySelector('button[data-name="card/ignore"]');
        var updateAllButton = document.querySelector('button[data-name="card/update-all"]');

        if (itemRemove) {
            console.log("Clicking itemRemove");
            itemRemove.click();
        } else if (dismissButton) {
            console.log("Dismiss button found, clicking");
            dismissButton.click();
        } else {
            console.log("itemRemove and Dismiss button not found, checking for itemInsert");
            var itemInsert = document.querySelector(".cards-replacements_labels-itemInsert");
            if (itemInsert) {
                console.log("Clicking itemInsert");
                itemInsert.click();
            } else {
                console.log("itemInsert is undefined");
            }
        }

        if (updateAllButton) {
            console.log("Clicking updateAllButton");
            updateAllButton.click();
        } else {
            console.log("updateAllButton is undefined");
        }

        var currentValue = document.querySelector('.counterText').textContent;
        console.log("Current Value: ", currentValue);

        if (currentValue === lastValue) {
            unchangedCount++;
            console.log("Unchanged Count: ", unchangedCount);
            if (unchangedCount >= 5) {
                alert("No new errors to fix after 5 attempts, stopping script.");
                clearTimeout(refreshTimer);
                observer.disconnect(); // Disconnect observer when stopping
                return; 
            }
        } else {
            unchangedCount = 0; 
            lastValue = currentValue; 
        }

    } catch (error) {
        console.log("Error in refreshData: ", error);
        // Additional error handling as required
    }

    refreshTimer = setTimeout(refreshData, x * 1000);
}

function checkForChanges() {
    console.log("Running checkForChanges function");
    refreshData(); // Call refreshData to handle dynamic content
}

function startObserving() {
    console.log("Starting to observe");
    var targetNode = document.querySelector('.counterText'); // Adjust if a different parent element is more appropriate

    if (!targetNode) {
        console.log("Target node not found");
        return;
    }

    var config = { childList: true, subtree: true };

    observer = new MutationObserver(function(mutations) {
        console.log("Mutation observed");
        checkForChanges();
    });

    observer.observe(targetNode, config);
}

// Start the process
console.log("Starting the process");
refreshData();
startObserving();
