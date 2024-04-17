var refreshTimer;
var refreshInterval = 2000;
// var autoFixes = ['Correctness', 'Clarity', 'Engagement', 'Delivery']
var autoFixes = ['Correctness']
var lastValue = null;
var unchangedCount = 0;
var observer;
window.grammer2active = true;

// wait for a sec
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// set multi attributs at once
function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}


// get suggestions list minus whatever junk
function getSuggestions() {
  let suggestions = Array.prototype.slice.call(document.querySelectorAll('div[aria-label="Suggestions"] div[role="listitem"] > div > div > button'));

  if(window.grammarlyPremium) {
    return suggestions;
  } else {
    suggestions.shift();
    return suggestions;
  }
}

//click a category and fix all its initially listed errors
async function fixSection(category) {
  
	  let cardsListBoxes = document.querySelectorAll('div[aria-label="Suggestions"] div[role="listitem"] > div > div > button');

	
		let correctness = document.querySelector(`button[data-name="${category}-button"]`);

    // have to hadve a try catch here cuz grammerly removes premium tag sometimes too...
    try {
      correctness.click(); // switch to crrectness suggestions
  	  await wait(1000); // let it load
    }catch(e) {
      return;
    }

		let suggestions = getSuggestions();
		
		// if suggestions length but also include accept or diss since this thing auto opens and disqualifies current from sugg list when category first opens
		if(suggestions.length || document.querySelector('button[data-name = "button:accept"]') || document.querySelector('button[data-name = "button:dismiss"]')) {

	//	  correctness.click(); // switch to crrectness suggestions
	//	  await wait(1000); // let it load
		  
	//	  let cardsListBoxes = document.querySelectorAll('div[aria-label="Suggestions"] div[role="listitem"]');
		  console.log('suggestions...', suggestions)
		  
		  
		  // accept suggestions until done
		  while(true && window.grammer2active) {
  		  let nextSuggestion = getSuggestions()[0];
  		  if(nextSuggestion) nextSuggestion.click();
  //		  debugger;
  		  
  		  // accept fix
  //		  await wait(500);
  		  let acceptFix = document.querySelector('button[data-name = "button:accept"]');
  		  let dismissFix = document.querySelector('button[data-name = "button:dismiss"]');
  		  
  		  if(acceptFix) {
  		    //  if no accept button click dissmiss
  		    acceptFix.click();
  		  } else {
  		    if(dismissFix) dismissFix.click();
  		  };
  		  
  		  // count suggestions left
  		  let cardsListBoxes = getSuggestions();
  		  
  		  
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
  	  
      // ended up then have to being a dynmaic check too cuz this thing changes like bitch every min what its structure is..
      if(!document.querySelector('div[data-name = "lens-premium"]')) window.grammarlyPremium = true; else window.grammarlyPremium = false;

  		let counterText = getSuggestions();
  		
  		// nothing to do if no suggestions and no click
  		if(counterText.length == 0) {
  		  if(!(document.querySelector('button[data-name = "button:accept"]') || document.querySelector('button[data-name = "button:dismiss"]'))) {
  		    return rePoll();
  		  }
  		} 
  		
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
if(!document.querySelector('div[data-name = "lens-premium"]')) window.grammarlyPremium = true; else window.grammarlyPremium = false;

refreshData();

// replace script
// refresh page
