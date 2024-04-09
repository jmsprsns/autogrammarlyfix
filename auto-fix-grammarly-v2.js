var refreshTimer;
var refreshInterval = 2000;
var autoFixes = ['Correctness', 'Clarity', 'Engagement', 'Delivery']
var lastValue = null;
var unchangedCount = 0;
var observer;
window.grammer2active = true;

// wait for a sec
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));


//click a category and fix all its initially listed errors
async function fixSection(category) {
  
	  let cardsListBoxes = document.querySelectorAll('div[data-purpose="card-list-connector"] div[data-role="animation-wrapper"] div[role="button"]');

	
		let correctness = document.querySelector('div[aria-label="'+category+'"]');

		let correctnessScore = correctness.ariaValueNow;
		

		
		// if we have "correctness" fixes
  		console.log(`correctness score ${category}`, correctnessScore);
		if((autoFixes.indexOf(category) > - 1) && correctnessScore && parseInt(correctnessScore, 10) < 100) {

		  correctness.click(); // switch to crrectness suggestions
		  await wait(1000); // let it load
		  
		  let cardsListBoxes = document.querySelector('div[data-purpose="card-list-connector"] div[data-role="animation-wrapper"] div[role="button"]');
		  console.log('suggestions...', cardsListBoxes)
		  
		  
		  // accept suggestions until done
		  while(true && window.grammer2active) {
  		  let nextSuggestion = document.querySelector('div[data-purpose="card-list-connector"] div[data-role="animation-wrapper"] div[role="button"]');
  		  if(nextSuggestion) nextSuggestion.click();
  		  
  		  // accept fix
  		  await wait(500);
  		  let acceptFix = document.querySelector('button[data-name = "card/button:accept"]');
  		  let dismissFix = document.querySelector('button[data-name = "card/button:dismiss"]');
  		  
  		  if(acceptFix) {
  		    //  if no accept button click dissmiss
  		    acceptFix.click();
  		  } else {
  		    if(dismissFix) dismissFix.click();
  		  };
  		  
  		  // count suggestions left
  		  let cardsListBoxes = document.querySelectorAll('div[data-purpose="card-list-connector"] div[data-role="animation-wrapper"] div[role="button"]');
  		  
  		  
  		  // if none left or elem not rendered anymore leave(refresh will catch and laggers)
  		  if(!cardsListBoxes || cardsListBoxes.length == 0)  {
  		    break; // leave if none or elem null(refresh will catch laggers)
  		  } else {
  		    await wait(500); // wait some secs before next one
  		  }
		  }
    }
}

async function refreshData() {
	if(window.grammer2active) {
  	  console.log(`"Running refreshData function"`);
  		let counterText = document.querySelector('.counterText');
  		
  		// nothing to do
  		if(!counterText) return rePoll();
  		
    		// // fix spelling 
    		await fixSection('Correctness');
  		
      	// fix Clarity/grammer
      	 await fixSection('Clarity');
    		
    		// Engagement
    		if(window.grammarlyPremium) await fixSection('Engagement');
    		
    		// Delivery
    		if(window.grammarlyPremium) await fixSection('Delivery');

  		
  	return rePoll();
		
	} else {
	  console.log('grammer2 set to inactive')
		return;
	}
}

function rePoll() {
  setTimeout(refreshData, refreshInterval);
}



// Start the process
console.log("Starting the process");
if(!document.querySelector('div[data-name = "lens-premium"]')) window.grammarlyPremium = true;

refreshData();
