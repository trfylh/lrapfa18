// Writen by Teela Huff (thuff@berkeley.edu) for LRAP on 19 September 2018
// Must be in JavaScript to be implemented as a function in Google Sheets

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

// Takes in a string of panãra orthography and returns the phonetic form.
// ex. takes in "nãnsy" and returns "nãn.sɯ"
// TO DO: checking for <j> in onset and <n> in coda
function ORTHTOPHONETIC(INPUT1) {
    var orth, phon, skip, isV;
    orth = INPUT1;
    phon = "";
    skip = 0; // in the case of repeated C or V in orthography
    isV = 0; // for adding syllave breaks after VC on VC.CCVC etc.
    for (i = 0; i < orth.length; i++) {
        if (skip == 1) {
            skip = 0;
            continue;
        }
        // consonants with different phonetic and orthographic transcriptions
        if ((i != orth.length - 1) && orth.charAt(i) == "n" && (orth.charAt(i + 1) == "p")) { // <np>
            phon += "m͡p";
            skip = 1;
            if (isV) {
                phon += ".";
                isV = 0;
            }
        }
        else if ((i != orth.length - 1) && orth.charAt(i) == "n" && (orth.charAt(i + 1) == "t")) { // n͡t <nt>
            phon += "n͡t";
            skip = 1;
            if (isV) {
                phon += ".";
                isV = 0;
            }
        }
        else if (orth.charAt(i) == "r") { // ɾ <r>
            phon += "ɾ";
            if (isV) {
                phon += ".";
                isV = 0;
            }
        }
        else if (orth.charAt(i) == "j") { // ŋ <j>
            phon += "ŋ";
            if (isV) {
                phon += ".";
                isV = 0;
            }
        }
        else if ((i != orth.length - 1) && orth.charAt(i) == "n" && (orth.charAt(i + 1) == "k")) { // ŋ͡k <nk>
            phon += "ŋ͡k";
            if (isV) {
                phon += ".";
                isV = 0;
            }
        }
        // all vowels
        // orals
        else if (orth.charAt(i) == "i") {
            isV = 1;
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "i")) { // i: <ii>
                phon += "i:";
                skip = 1;
            }
            else { // i <i>
                phon += "i";
            }
        }
        else if (orth.charAt(i) == "ê") {
            isV = 1;
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "ê")) { // e: <êê>
                phon += "e:";
                skip = 1;
            }
            else { // e <ê>
                phon += "e";
            }
        }
        else if (orth.charAt(i) == "e") {
            isV = 1;
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "e")) { // ɛ: <ee>
                phon += "ɛ:";
                skip = 1;
            }
            else { // ɛ <e>
                phon += "ɛ";
            }
        }
        else if (orth.charAt(i) == "y") {
            isV = 1;
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "y")) { // ɯ: <yy>
                phon += "ɯ:";
                skip = 1;
            }
            else { // ɯ <y>
                phon += "ɯ";
            }
        }
        else if (orth.charAt(i) == "â") {
            isV = 1;
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "â")) { // ɤ: <ââ>
                phon += "ɤ:";
                skip = 1;
            } else { // ɤ <â>
                phon += "ɤ";
            }
        }
        else if (orth.charAt(i) == "a") {
            isV = 1;
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "a")) { // a: <aa>
                phon += "a:";
                skip = 1;
            }
            else { // a <a>
                phon += "a";
            }
        }
        else if (orth.charAt(i) == "u") {
            isV = 1;
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "u")) { // u: <uu>
                phon += "u:";
                skip = 1;
            }
            else { // u <u>
                phon += "u";
            }
        }
        else if (orth.charAt(i) == "ô") {
            isV = 1;
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "ô")) { // o: <ôô>
                phon += "o:";
                skip = 1;
            }
            else { // o <ô>
                phon += "o";
            }
        }
        else if (orth.charAt(i) == "o") {
            isV = 1;
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "o")) { // ɔ: <oo>
                phon += "ɔ:";
                skip = 1;
            }
            else { // ɔ <o>
                phon += "ɔ";
            }
        }
        // nasals
        else if (orth.charAt(i) == "ĩ") {
            isV = 1;
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "ĩ")) { // ĩ: <ĩĩ>
                phon += "ĩ:";
                skip = 1;
            }
            else { // ĩ <ĩ>
                phon += "ĩ";
            }
        }
        else if (orth.charAt(i) == "ẽ") {
            isV = 1;
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "ẽ")) { // ẽ: <ẽ>
                phon += "ẽ:";
                skip = 1;
            }
            else { // ẽ <ẽ>
                phon += "ẽ";
            }
        }
        else if (orth.charAt(i) == "ỹ") {
            isV = 1;
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "ỹ")) { // ɯ̃: <ỹỹ>
                phon += "ɯ̃:";
                skip = 1;
            }
            else { // ɯ̃ <ỹ>
                phon += "ɯ̃";
            }
        }
        else if (orth.charAt(i) == "ã") {
            isV = 1;
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "ã")) { // ã: <ã>
                phon += "ã:";
                skip = 1;
            }
            else { // ã <ã>
                phon += "ã";
            }
        }
        else if (orth.charAt(i) == "ũ") {
            isV = 1;
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "ũ")) { // ũ: <ũ>
                phon += "ũ:";
                skip = 1;
            }
            else { // ũ <ũ>
                phon += "ũ";
            }
        }
        else if (orth.charAt(i) == "õ") {
            isV = 1;
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "õ")) { // õ: <õ>
                phon += "õ:";
                skip = 1;
            }
            else { // õ <õ>
                phon += "õ";
            }
        }
        // all consonants with the same phonetic and orthographic transcription
        else {
            phon += orth.charAt(i);
            if (isV && (i != orth.length - 1)) {
                isV = 0;
                if (orth.charAt(i) != "," && orth.charAt(i) != " ") { // in case of multiple words separated by comma
                    phon += ".";
                }
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
    return FILLAT(unfilled, filler, "[", "]");
}

// NOT FINISHED
// Takes in a string of panãra /phonemic/[phonetic]<orthography>(author,year,page) {POR,ENG}|note|
// and returns the string with the /phonemic/ portion filled based off of the orthography
function PHONEMICFILL(INPUT1) {
    return INPUT1;
}
