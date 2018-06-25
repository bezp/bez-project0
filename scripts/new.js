

var submitButton = document.querySelector('#addButton');

var sectionOne = document.querySelector('#sectionOne');
var sectionTwo = document.querySelector('#sectionTwo');

var userCardTerm = document.querySelector('#cardTerm');
var userCardDefinition = document.querySelector('#cardDefinition');

// var objDeck = {};
// var counter = 1;

submitButton.addEventListener('click', () => {
  var cTerm = userCardTerm.value;
  var cDefinition = userCardDefinition.value;

  
  console.log(cTerm, cDefinition);

  // objDeck.counter += {cTerm:cDefinition};

  userCardTerm.value = '';
  userCardDefinition.value= '';
  // console.log('obj' + objDeck);
  // counter++;
})





