var refreshTimer;
var lastValue = null;
var unchangedCount = 0;
var observer;

function refreshData() {
    console.log("Running refreshData function");
    try {
        var itemRemove = document.querySelector('.cards-replacements_labels-itemRemove, .cards-replacements_labels-deleteAll');
        var dismissButton = document.querySelector('button[data-name="card/ignore"], button[data-name="card/bulk-accept-apply"]');
        var updateAllButton = document.querySelector('button[data-name="card/update-all"]');
        var actionable = false; // Flag to check if there are actions to perform

        setTimeout(function() {
            
            if (itemRemove) {
                console.log("Grammar mistake fixed!");
                itemRemove.click();
                actionable = true; // There is an action, so set flag to true
            } else {
                console.log("Dismissed item without any solution.");
                dismissButton.click();
                actionable = true;
            }
    
            if (updateAllButton) {
                console.log("Clicking updateAllButton");
                updateAllButton.click();
                actionable = true;
            }
    
            if (!actionable) {
                unchangedCount++;
                console.log("Unchanged Count: ", unchangedCount);
                if (unchangedCount >= 10) {
                    clearTimeout(refreshTimer);
                    if (observer) {
                        observer.disconnect();
                    }
                    alert("Success, zero errors! Stopping script.");
                    return;
                }
            } else {
                unchangedCount = 0;
            }
            
        }, 250); // Timeout
        
    } catch (error) {
        console.log("Error in refreshData: ", error);
    }

    refreshTimer = setTimeout(refreshData, 500);
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
