var refreshTimer;
var lastValue = null;
var unchangedCount = 0;
var observer;

function refreshData() {
	console.log("Running refreshData function");
	x = 1; 
	try {
		if (document.querySelector('.cards-replacements_labels-itemRemove') !== null) {
			// Click the '.cards-replacements_labels-itemRemove' if it exists
			var itemRemove = document.querySelector('.cards-replacements_labels-itemRemove');
			itemRemove.click();
		} else {
			// Click the button with aria-label="Dismiss" if '.cards-replacements_labels-itemRemove' is null
			var dismissButton = document.querySelector('button[aria-label="Dismiss"]');
			if (dismissButton) {
				dismissButton.click();
				console.log("Dismiss button clicked");
			} else {
				console.log("Dismiss button not found");
	
				// Click the first '.cards-replacements_labels-itemInsert', if present
				var itemInsert = document.querySelector(".cards-replacements_labels-itemInsert");
				if (itemInsert) {
					itemInsert.click();
				} else {
					console.log("itemInsert is undefined");
				}
			}
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
