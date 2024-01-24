var refreshTimer;
var lastValue = null;
var unchangedCount = 0;
var observer;

function refreshData() {
    console.log("Running refreshData function");
    try {
        var itemRemove = document.querySelector(
            '.cards-replacements_labels-itemRemove, ' + // Correctness
            '.cards-replacements_labels-deleteAll, ' + // Clarity
            '.cards-replacements_labels-itemInsert' // Engagement / Delivery
        );
        var dismissButton = document.querySelector('button[data-name="card/ignore"], button[data-name="card/bulk-accept-apply"]');
        var updateAllButton = document.querySelector('button[data-name="card/update-all"]');
        var actionable = false; // Flag to check if there are actions to perform

        setTimeout(function() {
            
            if (itemRemove) {
                console.log("GrammarlyAutofix: Grammar mistake fixed!");
                itemRemove.click();
                actionable = true; // There is an action, so set flag to true
                unchangedCount = 0; // Reset the count that checks if its finished
            } else {
                setTimeout(function() {
                    itemRemove = document.querySelector(
                        '.cards-replacements_labels-itemRemove, ' + // Correctness
                        '.cards-replacements_labels-deleteAll, ' + // Clarity
                        '.cards-replacements_labels-itemInsert' // Engagement / Delivery
                    );
                    if (itemRemove) {
                        console.log("GrammarlyAutofix: Found after delay. Grammar mistake fixed!");
                        itemRemove.click();
                        actionable = true;
                        unchangedCount = 0;
                    } else {
                        if (dismissButton) {
                            dismissButton.click();
                            console.log("GrammarlyAutofix: No solutions found.");
                            actionable = true;
                            unchangedCount = 0;
                        } else {
                            console.log("GrammarlyAutofix: 0 errors detected, waiting...");
                            actionable = false;
                        }
                    }
                }, 250); // Retry delay
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
                    console.log("GrammarlyAutofix: Success, zero errors! Stopping script.");
                    return;
                }
            } else {
                unchangedCount = 0;
            }
            
        }, 150); // Timeout
        
    } catch (error) {
        console.log("Error in refreshData: ", error);
    }

    refreshTimer = setTimeout(refreshData, 50);
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
