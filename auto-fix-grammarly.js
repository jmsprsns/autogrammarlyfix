var refreshTimer;
var lastValue = null;
var unchangedCount = 0;
var observer;

function checkElements() {
    console.log("Checking for elements");
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
        console.log("itemRemove and Dismiss button not found");
    }

    if (updateAllButton) {
        console.log("Clicking updateAllButton");
        updateAllButton.click();
    } else {
        console.log("updateAllButton is undefined");
    }
}

function checkForChanges() {
    console.log("Running checkForChanges function");
    var currentValue = document.querySelector('.counterText')?.textContent;
    console.log("Current Value: ", currentValue);

    if (currentValue === lastValue) {
        unchangedCount++;
        console.log("Unchanged Count: ", unchangedCount);
        if (unchangedCount >= 5) {
            alert("No new errors to fix after 5 attempts, stopping script.");
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
    console.log("Starting to observe");
    var targetNode = document.querySelector('.counterText');

    if (!targetNode) {
        console.log("Target node not found");
        return;
    }

    var config = { childList: true, subtree: true };

    observer = new MutationObserver(function(mutations) {
        console.log("Mutation observed");
        checkElements();
        checkForChanges();
    });

    observer.observe(targetNode, config);
}

// Start the process
console.log("Starting the process");
checkElements();
startObserving();
