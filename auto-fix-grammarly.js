var refreshTimer;
var lastValue = null;
var unchangedCount = 0;
var observer;

function refreshData() {
    console.log("GrammarlyAutofix: Running refreshData function");
    try {
        var itemRemove = document.querySelector('.cards-replacements_labels-itemRemove, .cards-replacements_labels-deleteAll');
        var dismissButton = document.querySelector('button[data-name="card/ignore"], button[data-name="card/bulk-accept-apply"]');
        var updateAllButton = document.querySelector('button[data-name="card/update-all"]');
        var actionable = false; // Flag to check if there are actions to perform

        setTimeout(function() {
            
            if (itemRemove) {
                console.log("GrammarlyAutofix: Grammar mistake fixed!");
                itemRemove.click();
                actionable = true; // There is an action, so set flag to true
            } else {
                console.log("GrammarlyAutofix: Dismissed item without any solution.");
                dismissButton.click();
                actionable = true;
            }
    
            if (updateAllButton) {
                console.log("GrammarlyAutofix: Clicking updateAllButton");
                updateAllButton.click();
                actionable = true;
            }
    
            if (!actionable) {
                unchangedCount++;
                console.log("GrammarlyAutofix: Unchanged Count: ", unchangedCount);
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
        console.log("GrammarlyAutofix: Error in refreshData: ", error);
    }

    refreshTimer = setTimeout(refreshData, 500);
}


function checkForChanges() {
    console.log("GrammarlyAutofix: Running checkForChanges function");
    refreshData(); // Call refreshData to handle dynamic content
}

function startObserving() {
    console.log("GrammarlyAutofix: Starting to observe");
    var targetNode = document.querySelector('.counterText'); // Adjust if a different parent element is more appropriate

    if (!targetNode) {
        console.log("GrammarlyAutofix: Target node not found");
        return;
    }

    var config = { childList: true, subtree: true };

    observer = new MutationObserver(function(mutations) {
        console.log("GrammarlyAutofix: Mutation observed");
        checkForChanges();
    });

    observer.observe(targetNode, config);
}

// Start the process
console.log("GrammarlyAutofix: Starting the process");
refreshData();
startObserving();
