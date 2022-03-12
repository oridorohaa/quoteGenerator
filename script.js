// window.console.log ---- helpful when we are calling an API and want to see how the data is formatted
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  showLoadingSpinner();
  //Pick a ramdom quote from api array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blank and replace with "unknown"
  if (!quote.author) auotherText.textContent = "unknown";
  else authorText.textContent = quote.author;

  //Check Quote length to determine styling
  if (quote.text.length > 70) quoteText.classList.add("long-quote");
  else quoteText.classList.remove("long-quote");

  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}
// Get Quotes From API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    // convert what we fetched from a string into a json that we can use
    // JSON JS Object Notation
    apiQuotes = await response.json();
    // console.log(apiQuotes[4]);
    newQuote();
  } catch (error) {
    //   alert(error) another way of generating the error
    //Catch Error Here
  }
}

//On Load
getQuotes();

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  //   '_blank' allows for a new window to open
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
//  COMMAND + D highlight all same words
