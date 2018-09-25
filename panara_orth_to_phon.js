// Writen by Teela Huff (thuff@berkeley.edu) for LRAP on 19 September 2018
// Must be in JavaScript to be implemented as a function in Google Sheets

// Takes in a string of panãra orthography and returns the phonetic form.
// ex. takes in "nãnsy" and returns "nãnsɯ"
// TO DO: checking for <j> in onset and <n> in coda
function ORTHTOPHONETIC(INPUT1) {
    var orth, phon, is;
    orth = INPUT1;
    phon = "";
    skip = 0;
    for (i = 0; i < orth.length; i++) {
        if (skip == 1) {
            skip = 0;
            continue;
        }
        // consonants
        // bilabials
        else if ((i != orth.length - 1) && orth.charAt(i) == "n" && (orth.charAt(i + 1) == "p")) { // <np>
            phon += "m͡p";
            skip = 1;
        }
        // alveolars
        else if ((i != orth.length - 1) && orth.charAt(i) == "n" && (orth.charAt(i + 1) == "t")) { // n͡t <nt>
            phon += "n͡t";
            skip = 1;
        }
        else if (orth.charAt(i) == "r") { // ɾ <r>
            phon += "ɾ";
        }
        // velars
        else if (orth.charAt(i) == "j") { // ŋ <j>
            phon += "ŋ";
        }
        else if ((i != orth.length - 1) && orth.charAt(i) == "n" && (orth.charAt(i + 1) == "k")) { // ŋ͡k <nk>
            phon += "ŋ͡k";
        }
        // vowels
        // orals
        else if (orth.charAt(i) == "i") {
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "i")) { // i: <ii>
                phon += "i:";
                skip = 1;
            }
        }
        else if (orth.charAt(i) == "ê") {
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "ê")) { // e: <êê>
                phon += "e:";
                skip = 1;
            }
            else { // e <ê>
                phon += "e";
            }
        }
        else if (orth.charAt(i) == "e") {
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "e")) { // ɛ: <ee>
                phon += "ɛ:";
                skip = 1;
            }
            else { // ɛ <e>
                phon += "ɛ";
            }
        }
        else if (orth.charAt(i) == "y") {
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "y")) { // ɯ: <yy>
                phon += "ɯ:";
                skip = 1;
            }
            else { // ɯ <y>
                phon += "ɯ";
            }
        }
        else if (orth.charAt(i) == "â") {
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "â")) { // ɤ: <ââ>
                phon += "ɤ:";
                skip = 1;
            } else { // ɤ <â>
                phon += "ɤ";
            }
        }
        else if (orth.charAt(i) == "ô") {
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "ô")) { // o: <ôô>
                phon += "o:";
                skip = 1;
            }
            else { // o <ô>
                phon += "o";
            }
        }
        else if (orth.charAt(i) == "o") {
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "o")) { // ɔ: <oo>
                phon += "ɔ:";
                skip = 1;
            }
            else { // ɔ <o>
                phon += "ɔ";
            }
        }
        // nasals
        else if (orth.charAt(i) == "ỹ") {
            if ((i != orth.length - 1) && (orth.charAt(i + 1) == "ỹ")) { // ɯ̃: <ỹỹ>
                phon += "ɯ̃:";
                skip = 1;
            }
            else { // ɯ̃ <ỹ>
                phon += "ɯ̃";
            }
        }
        else {
            phon += orth.charAt(i);
        }
    }
    return phon;
}

// Takes in a string of panãra phonetic without syllable and stress marks
// and returns the phonetic form.
// ex. takes in "nãnsy" and returns "nãn.ˈsɯ"
function PHONETICTOSYLLABLE(INPUT1) {
    syll = "";
    return syll;
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
    var unfilled, prevBracket, postBracket;
    unfilled = INPUT1;
    prevBracket = -1;
    postBracket = -1;
    isOrtho = 0;
    ortho = ""
    for (i = 0; i < unfilled.length; i++) {
        if (unfilled.charAt(i) == "[") {
            prevBracket = i;
        }
        else if (unfilled.charAt(i) == "]") {
            postBracket = i;
        }
        else if (unfilled.charAt(i) == "<") {
            isOrtho = 1;
        }
        else if (unfilled.charAt(i) == ">") {
            break;
        }
        else if (isOrtho == 1) {
            ortho += unfilled.charAt(i);
        }
    }
    return unfilled.slice(0, prevBracket + 1) + ORTHTOPHONETIC(ortho) + unfilled.slice(postBracket, unfilled.length);
}

// NOT FINISHED
// Takes in a string of panãra /phonemic/[phonetic]<orthography>(author,year,page) {POR,ENG}|note|
// and returns the string with the /phonemic/ portion filled based off of the orthography
function PHONEMICFILL(INPUT1) {
    return INPUT1;
}
