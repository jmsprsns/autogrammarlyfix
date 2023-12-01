var refreshTimer;
var lastValue = null;
var unchangedCount = 0;
var observer;

function refreshData() {
	console.log("Running refreshData function");
	x = 1; 
	try {
		var newclass;
		if (document.querySelector('.cards-replacements_labels-itemRemove') !== null) {
			newclass = document.querySelector('.cards-replacements_labels-itemRemove');
		} else {
			newclass = document.getElementsByClassName("cards-replacements_labels-itemInsert");
			newclass = newclass[0];
		}

		if (newclass) {
			newclass.click();
		} else {
			console.log("newclass is undefined");
		}

		var updateAllButton = document.querySelector('button[data-name="card/update-all"]');
		if (updateAllButton) {
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
				return; 
			}
		} else {
			unchangedCount = 0; 
			lastValue = currentValue; 
		}

	} catch (error) {
		console.log("Error in refreshData: ", error);
		if (document.getElementsByClassName("wrapper_fipkee2") !== null) {
			var cli = document.getElementsByClassName("wrapper_fipkee2");
			var vli = cli[0];
			vli.click();
		}
	}

	refreshTimer = setTimeout(refreshData, x * 1000);
}

function checkForChanges() {
    console.log("Running checkForChanges function");
    var currentValue = document.querySelector('.counterText').textContent;
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

    var config = { characterData: true, childList: true, subtree: true };

    observer = new MutationObserver(function(mutations) {
        console.log("Mutation observed");
        mutations.forEach(function(mutation) {
            checkForChanges();
        });
    });

    observer.observe(targetNode, config);
}

// Start the process
console.log("Starting the process");
refreshData();
startObserving();
