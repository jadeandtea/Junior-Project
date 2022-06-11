//Code is copy-pasted from text-to-ipa.js and renamed to VocabList

//  This file creates a global VocabList object containing the public loadDict
//  and lookup methods as well as the associated private helper objects and methods.

//  The purpose of this program is to look up an english word in a word list for a certain
//  grade via lookup() and return a Word to tell if an english word
//  has multiple parts of speech, as well as the etymology 
//
//      VocabList.loadDict(location)
//          location    Location to load the dictionary from. Since it's gotten
//                      with an XMLHttpRequest, it can be on the local machine or
//                      remote
//          This method produces no output, but will take the location of the
//          dictionary and parse it into the _WordList object for fast lookups
//          with the lookup method. This method _NEEDS_ to be ran before lookup(),
//          so ideally you would want to run this when the window loads.

//      TextToIPA.lookup(word, vocabListLocation)
//          word        English word that will be searched for in the vocabListLocation
//          This method returns a word that has an error attribute, and
//          a text attribute. The error determines if the word exists in VocabList
//          and if the word has multiple pronunciations. The text is the resulting
//          etymology text of the lookup. 
//          return      Word Object with text under the `text` attribute
//          and and errors under the `error` attribute.

// ESLint settings. We want console logging and some problems may exist
// with undefined objects (VocabList) but we check for these
// beforehand
/* eslint-disable no-console, no-undef */

// Create a VocabLIst object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof VocabList !== 'object') {
    VocabList = {};
}

(function () {
    'use strict';
  
    // Objects
  
    // Create the WordList if one does not currently exist. This is important,
    // as reloading the dict takes long, so if one already exists, let it be.
    if (typeof VocabList._WordList !== 'object') {
      VocabList._WordList = {};
    }
  
    // Create a constructor for a Word that makes displaying them and
    // associated errors much easier. 
    function Word(error, text) {
      this.error = error;
      this.text = text;
    }
  
    // Functions
  
    // Parse the dictionary. Only used by `loadDict`.
    if (typeof VocabList._parseDict !== 'function') {
      VocabList._parseDict = function (lines) {
        console.log('VocabList: Beginning parsing to dict...');
  
        // Fill out the WordList by
        // 1) regexing the word and it's corresponding parts of speech into an array
        // 2) using the word as the key and the result as the pair
        for (var i in lines) {
          var arr = lines[i].split('      ');
          VocabList._WordList[arr[0]] = arr[1];
        }
  
        console.log('VocabList: Done parsing.');
      };
    }
  
    // Load the dictionary. Can be on the local machine or from a GET request.
    if (typeof VocabList.loadDict !== 'function') {
      VocabList.loadDict = function (location) {
        console.log('VocabList: Loading dict from ' + location + '...');
  
        if (typeof location !== 'string') {
          console.log('VocabList Error: Location is not valid!');
        } else {
  
          //possibly can use fetch? don't really want to touch rn
          var txtFile = new XMLHttpRequest(); 
  
          txtFile.open('GET', location, true);
  
          txtFile.onreadystatechange = function() {
            // If document is ready to parse...
            if (txtFile.readyState == 4) {
              // And file is found...
              if (txtFile.status == 200 || txtFile.status == 0) {
                // Load up the ipa dict
                VocabList._parseDict(txtFile.responseText.split('\n'));
              }
            }
          };
  
          txtFile.send(null);
  
        }
  
      };
  
    }
  
    // Lookup function to find an english word's corresponding IPA text
    // NOTE: This method implies that a specific dictionary has been loaded by
    // VocabList.loadDict(). This will not work with other dictionaries.
    if (typeof VocabList.lookup !== 'function') {
  
      VocabList.lookup = function (word) {
  
        if (Object.keys(VocabList._WordList).length === 0) {
          console.log('VocabList Error: No data in VocabList._WordList. Did "VocabList.loadDict()" run?');
        } else {
          // It is possible to return undefined, so that case should not be ignored
          if ( typeof VocabList._WordList[word + ' (0)'] != 'undefined' ) {
  
            // Some words in english have multiple definitions/etymology(max of 6)
            // Therefore we use a trick to get all of them
  
            // Resulting error, null since we don't know if this word has multiple
            // pronunciations
            var error = null;
            // Text, defaults to the first definition. We build on this if multiple
            // pronunciations exist
            var text = VocabList._WordList[word + ' (0)'];
  
            // Iterate from 1 - 5. There are no more than 5 extra definitions.
            for (var i = 1; i < 5; i++) {
              // See if definition i exists...
              if ( typeof VocabList._WordList[word + ' (' + i + ')'] != 'undefined' ) {
                // ...If it does we know that the error should be multi and the text
                // is always itself plus the new definition
                error = 'multi';
                text += '<br><br>' + VocabList._WordList[word + ' (' + i + ')'];
              // ...Otherwise no need to keep iterating
              } else {
                break;
              }
            }
  
            // Return the new word
            return new Word(error, text);
  
          // Otherwise the word isn't in the dictionary
          } else {
  
            return new Word('undefined', word);
  
          }
  
        }
  
      };
  
    }

    if(typeof VocabList.getRandomElement !== 'function'){

      VocabList.getRandomElement = function () {

        if (Object.keys(VocabList._WordList).length == 0){

          console.log('VocabList Error: No data in VocabList.WordList. Did "VocabList.loadDict()" run?');

        } else {

          var keys = Object.keys(VocabList);
          return VocabList._WordList[keys[Math.floor(keys.length * Math.random())]];

        }
      }
    }
  
  }());