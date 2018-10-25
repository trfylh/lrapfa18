// Writen by Teela Huff (thuff@berkeley.edu) for LRAP on 19 September 2018
// Must be in JavaScript in order to be implemented as a script in Google Sheets

// Returns a dict of Panãra consonants orthography conventions
function GETC(INPUT1) {
    var cons;
    cons = {}; // all consonants except ɲ (done after syllabification)
    cons["p"] = "p"; // singleton obstruent
    cons["t"] = "t";
    cons["s"] = "s";
    cons["k"] = "k";
    cons["pp"] = "pp"; // geminate obstruent
    cons["tt"] = "tt";
    cons["ss"] = "ss";
    cons["kk"] = "kk";
    cons["m"] = "m"; // singleton nasal
    cons["n"] = "n";
    cons["j"] = "ŋ"; // ŋ<j> == ["j"] = "ŋ"
    cons["mm"] = "mm"; // geminate nasal
    cons["nn"] = "nn";
    cons["np"] = "mp"; // post-oralized nasal
    cons["nt"] = "nt";
    cons["ns"] = "ns";
    cons["nk"] = "ŋk";
    cons["w"] = "w"; // approximant
    cons["r"] = "ɾ";
    cons["j"] = "j";
    return cons;
}

// Returns a dict of Panãra vowels orthography conventions
function GETV(INPUT1) {
    var vowels;
    vowels = {};
    vowels["i"] = "i"; // short oral
    vowels["y"] = "ɯ";
    vowels["u"] = "u";
    vowels["ê"] = "e";
    vowels["â"] = "ɤ";
    vowels["ô"] = "o";
    vowels["e"] = "ɛ";
    vowels["a"] = "a";
    vowels["o"] = "ɔ";
    vowels["ii"] = "i:"; // long oral
    vowels["yy"] = "ɯ:";
    vowels["uu"] = "u:";
    vowels["êê"] = "e:";
    vowels["ââ"] = "ɤ:";
    vowels["ôô"] = "o:";
    vowels["ee"] = "ɛ:";
    vowels["aa"] = "a:";
    vowels["oo"] = "ɔ:";
    vowels["ĩ"] = "ĩ"; // short nasal
    vowels["ỹ"] = "ɯ̃";
    vowels["ũ"] = "ũ";
    vowels["ẽ"] = "ẽ";
    vowels["ã"] = "ã";
    vowels["õ"] = "õ";
    vowels["ĩĩ"] = "ĩ:"; // long nasal
    vowels["ũũ"] = "ũ:";
    vowels["ẽẽ"] = "ẽ:";
    vowels["ãã"] = "ã:";
    vowels["õõ"] = "õ:";
    return vowels;
}

function GETCPOA(INPUT1) {
    var cons;
    cons = {};
    cons["p"] = "bilabial"; // singleton obstruents
    cons["t"] = "alveolarandpalatal";
    cons["s"] = "alveolarandpalatal";
    cons["k"] = "velar";
    cons["m"] = "bilabial"; // singleton nasals
    cons["n"] = "alveolarandpalatal";
    cons["ɲ"] = "alveolarandpalatal";
    cons["ŋ"] = "velar";
    cons["w"] = "bilabial"; // approximants
    cons["ɾ"] = "alveolarandpalatal";
    cons["j"] = "alveolarandpalatal";
    return cons;
}

function GETSYLLV(INPUT1) {
    var vowels;
    vowels = [];
    vowels.push("i"); // short oral
    vowels.push("ɯ");
    vowels.push("u");
    vowels.push("e");
    vowels.push("ɤ");
    vowels.push("o");
    vowels.push("ɛ");
    vowels.push("a");
    vowels.push("ɔ");
    vowels.push("i:"); // long oral
    vowels.push("ɯ:");
    vowels.push("u:");
    vowels.push("e:");
    vowels.push("ɤ:");
    vowels.push("o:");
    vowels.push("ɛ:");
    vowels.push("a:");
    vowels.push("ɔ:");
    vowels.push("ĩ"); // short nasal
    vowels.push("ɯ̃");
    vowels.push("ũ");
    vowels.push("ẽ");
    vowels.push("ã");
    vowels.push("õ");
    vowels.push("ĩ:"); // long nasal
    vowels.push("ũ:");
    vowels.push("ẽ:");
    vowels.push("ã:");
    vowels.push("õ:");
    return vowels;
}

function GETNASALV(INPUT1) {
    var vowels;
    vowels = [];
    vowels.push("ĩ"); // short nasal
    vowels.push("ɯ̃");
    vowels.push("ũ");
    vowels.push("ẽ");
    vowels.push("ã");
    vowels.push("õ");
    vowels.push("ĩ:"); // long nasal
    vowels.push("ũ:");
    vowels.push("ẽ:");
    vowels.push("ã:");
    vowels.push("õ:");
    return vowels;
}

// Preceding V for n in coda that becomes ŋ {u, u:, ũ, ũ:, o, o:, õ, õ:, ɔ, ɔ:}
function GETENGMAV(INPUT1) {
    var vowels;
    vowels = [];
    vowels.push("u"); // short oral
    vowels.push("o");
    vowels.push("ɔ");
    vowels.push("u:"); // long oral
    vowels.push("o:");
    vowels.push("ɔ:");
    vowels.push("ũ"); // short nasal
    vowels.push("õ");
    vowels.push("ũ:"); // long nasal
    vowels.push("õ:");
    return vowels;
}

// Takes in a phonetic form without syllabification and returns one with syllabification
function SYLLABIFYPHONETIC(INPUT1) {
    var phon, syll, cPOA, syllV, afterV;
    phon = INPUT1;
    syll = "";
    cPOA = GETCPOA(1);
    syllV = GETSYLLV(1);
    afterV = 0;
    // move consider current two, if not in cons or vowels, then assign first
    // and move one forward, repeat
    for (i = 0; i < phon.length; i++) {
        var first = phon.charAt(i);
        if (first == ":") {
            syll += first;
            continue;
        }
        if (syllV.indexOf(first) >= 0) { // if is a V
            if (afterV == 1) {
                syll += "." + first;
            } else {
                afterV = 1;
                syll += first;
            }
        }
        else if (afterV == 1) { // if in syllable coda, at potential C3
            if (i != phon.length - 1) { // if two or more C left
                var next = phon.charAt(i + 1);
                if (cPOA[first] == cPOA[next]) { // if POA matches, then VC3.
                    syll += first + ".";
                    afterV = 0;
                } else { // if POA does not match, then V.C1
                    syll += "." + first;
                    afterV = 0;
                }

            } else { // if only one C left
                syll += first;
                afterV = 0;
            }
        } else {
            syll += first;
        }
    }
    return syll;
}

// Takes in an unfilled string panãra /phonemic/[phonetic]<orthography>(author,year,page){POR,ENG}|note|
// and a filler string to be placed between the left input3 and right input4 (ex. "<" and ">")
function FILLAT(INPUT1, INPUT2, INPUT3, INPUT4) {
    var unfilled, filler, leftLim, rightLim, prevBracket, postBracket;
    unfilled = INPUT1;
    filler = INPUT2;
    leftLim = INPUT3;
    rightLim = INPUT4;
    prevBracket = -1;
    postBracket = -1;
    if (filler == "") {
      return unfilled;
    }
    for (i = 0; i < unfilled.length; i++) {
        if (unfilled.charAt(i) == leftLim && prevBracket == -1) {
            prevBracket = i;
        }
        else if (unfilled.charAt(i) == rightLim) {
            postBracket = i;
        }
    }
    return unfilled.slice(0, prevBracket + 1) + filler + unfilled.slice(postBracket, unfilled.length);
}

// Takes in a string of panãra orthography and returns the wide phonetic form.
// ex. takes in "nãnsy" and returns "nãn.sɯ"
function ORTHTOPHONETIC(INPUT1) {
    var orth, phon, cons, vowels;
    orth = INPUT1;
    phon = "";
    cons = GETC(1);
    vowels = GETV(1);
    // move consider current two, if not in cons or vowels, then assign first
    // and move one forward, repeat
    for (i = 0; i < orth.length; i++) {
        if (i != orth.length - 1) { // if two or more letters left
            var first = orth.charAt(i);
            var pair = first + orth.charAt(i + 1);
            if (pair in cons) {
                phon += cons[pair];
                i += 1;
            } else if (pair in vowels) {
                phon += vowels[pair];
                i += 1;
            } else if (first in cons) {
                phon += cons[first];
            } else if (first in vowels) {
                phon += vowels[first];
            } else {
                phon += first;
            }
        } else { // if only one letter left
            var first = orth.charAt(i);
            if (first in cons) {
                phon += cons[first];
            } else if (first in vowels) {
                phon += vowels[first];
            } else {
                phon += first;
            }
        }
    }
    return phon;
}

// NOT FINISHED
// Takes in a string of panãra /phonemic/[phonetic]<orthography>(author,year,page) {POR,ENG}|note|
// and returns the string with the [phonetic] portion (and /phonemic/ portion todo) filled based off of the orthography
function PHONFILL(INPUT1){
    var filled;
    filled = INPUT1;
    filled = PHONETICFILL(filled);
    filled = PHONEMICFILL(filled);
    filled = NFILL(filled);
    return filled;
}

// Takes in a string of panãra /phonemic/[phonetic]<orthography>(author,year,page) {POR,ENG}|note|
// and returns the string with the [phonetic] portion filled based off of the orthography
function PHONETICFILL(INPUT1) {
    var unfilled, filler, isOrtho;
    unfilled = INPUT1;
    filler = "";
    isOrtho = 0;
    for (i = 0; i < unfilled.length; i++) {
        if (unfilled.charAt(i) == "<") {
            isOrtho = 1;
        }
        else if (unfilled.charAt(i) == ">") {
            break;
        }
        else if (isOrtho == 1) {
            filler += unfilled.charAt(i);
        }
    }
    filler = ORTHTOPHONETIC(filler);
    filler = SYLLABIFYPHONETIC(filler);
    Utilities.sleep(1000);
    return FILLAT(unfilled, filler, "[", "]");
}

// Takes in a string of panãra /phonemic/[phonetic]<orthography>(author,year,page) {POR,ENG}|note|
// and returns the string with the [phonetic] portion with ɲ in place of j in onset
// and ɲ or ŋ in place of n in coda (given correct environments).
function NFILL(INPUT1) {
    var unfilled, filler, isPhon;
    unfilled = INPUT1;
    filler = "";
    isPhon = 0;
    for (i = 0; i < unfilled.length; i++) {
        if (unfilled.charAt(i) == "[") {
            isPhon = 1;
        }
        else if (unfilled.charAt(i) == "]") {
            break;
        }
        else if (isPhon == 1) {
            filler += unfilled.charAt(i);
        }
    }
    filler = PHONETICN(filler);
    Utilities.sleep(1000);
    return FILLAT(unfilled, filler, "[", "]");
}

// Takes in a string of panãra syllabified panãra phonetic form and returns it with ɲ
// in place of j in onset and ɲ or ŋ in place of n in coda (given correct environments).
function PHONETICN(INPUT1) {
    var oldphon, nphon, vowels, nasalvowels, engmavowels, incoda;
    oldphon = INPUT1;
    nphon = "";
    vowels = GETSYLLV(1);
    nasalvowels = GETNASALV(1);
    engmavowels = GETENGMAV(1);
    incoda = 0;
    for (i = 0; i < oldphon.length - 1; i++) { // includes penultimate final sound
        var curr = oldphon.charAt(i);
        if (curr == "j" && incoda == 0) { // if j and in onset
            // if j is first, or if j is preceded by a syllable break (making it C1V)
            if (i == 0 || (i != 0 && oldphon.charAt(i - 1) == ".")) {
                // if following V is nasal
                if (i != oldphon.length - 1 && nasalvowels.indexOf(oldphon.charAt(i + 1)) >= 0) {
                    nphon += "ɲ";
                } else {
                    nphon += curr;
                }
            } else {
                nphon += curr;
            }
        } else if (vowels.indexOf(curr) >= 0) { // if V, set in coda to 1
            incoda = 1;
            nphon += curr;
        } else if (curr == ".") { // if at syllable break, set in coda to 0
            incoda = 0;
            nphon += curr;
        } else {
            nphon += curr;
        }
    }
    if (oldphon.charAt(oldphon.length - 1) == "n") { // checking ultimate sound, if n word final
        if (engmavowels.indexOf(oldphon.charAt(oldphon.length - 2)) >= 0) { // n is [ŋ] due to preceding V
            nphon += "ŋ";
        } else { // n is [ɲ] due to preceding V
            nphon += "ɲ";
        }
    } else {
        nphon += oldphon.charAt(oldphon.length - 1); // if not n, add ultimate sound
    }
    return nphon;
}

// NOT FINISHED
// Takes in a string of panãra /phonemic/[phonetic]<orthography>(author,year,page) {POR,ENG}|note|
// and returns the string with the /phonemic/ portion filled based off of the orthography
function PHONEMICFILL(INPUT1) {
    return INPUT1;
}
