var refreshTimer;
var lastValue = null;
var unchangedCount = 0;
var observer;
var active = true;

function refreshData() {
    if (active) {
        console.log("Running refreshData function");
        try {
            var allButtons = document.querySelectorAll('button[data-name="button:accept"]');

            var foundAndClicked = false;

            setTimeout(function() {
                if (!active) {
                    console.log("Script is no longer active.");
                    return;
                }

                for (let button of allButtons) {
                    var span = button.querySelector('span');
                    var spanText = span ? span.innerText || span.textContent : "";
                    if (spanText.includes("Accept") || spanText.includes("Rephrase")) {
                        console.log(`Attempting to click the first span: ${spanText}`);
                        
                        // Create a mouse event and dispatch it to simulate a click
                        var evt = new MouseEvent("click", {
                            bubbles: true,
                            cancelable: true,
                            view: window
                        });
                        span.dispatchEvent(evt);

                        foundAndClicked = true;
                        unchangedCount = 0;
                        break;
                    }
                }

                if (!foundAndClicked) {
                    unchangedCount++;
                    console.log(`Unchanged Count: ${unchangedCount}. No matching spans found.`);
                    if (unchangedCount >= 10) {
                        wrapUp();
                        return;
                    }
                } else {
                    unchangedCount = 0;
                }

            }, 150);

            refreshTimer = setTimeout(refreshData, 500);
        } catch (error) {
            console.error("Error in refreshData: ", error);
        }
    } else {
        console.log("Refresh data function called while script is inactive.");
    }
}



function wrapUp() {
    clearTimeout(refreshTimer);
    if (observer) observer.disconnect();
    active = false;
    alert("Success, zero errors! Stopping script.");
    console.log("GrammarlyAutofix: Success, zero errors! Stopping script.");
}

// Initial call for testing purposes
console.log("Initializing script...");
refreshData();





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
