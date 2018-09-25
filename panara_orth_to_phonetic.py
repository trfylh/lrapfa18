# Takes in a string of panãra orthography and returns the phonetic form.
# ex. takes in "nãnsy" and returns "nãnsɯ"
# TO DO: checking for <j> in onset and <n> in coda
def orth_to_phonetic(orth):
    phon = ""
    is_skip = 0
    for i in range(len(orth)):
        if is_skip == 1:
            is_skip = 0
            continue
        # consonants
        # bilabials
        elif (i != len(orth) - 1) and orth[i] == "n" and (orth[i + 1] == "p"): # <np>
            phon += "m͡p"
            is_skip = 1
        # alveolars
        elif (i != len(orth) - 1) and orth[i] == "n" and (orth[i + 1] == "t"): # n͡t <nt>
            phon += "n͡t"
            is_skip = 1
        elif orth[i] == "r": # ɾ <r>
            phon += "ɾ"
        # velars
        elif (orth[i] == "j"): # ŋ <j>
            phon += "ŋ"
        elif (i != len(orth) - 1) and orth[i] == "n" and (orth[i + 1] == "k"): # ŋ͡k <nk>
            phon += "ŋ͡k"
        # vowels
        # orals
        elif orth[i] == "i":
            if (i != len(orth) - 1) and (orth[i + 1] == "i"): # i: <ii>
                phon += "i:"
                is_skip = 1
        elif orth[i] == "ê":
            if (i != len(orth) - 1) and (orth[i + 1] == "ê"): # e: <êê>
                phon += "e:"
                is_skip = 1
            else: # e <ê>
                phon += "e"
        elif orth[i] == "e":
            if (i != len(orth) - 1) and (orth[i + 1] == "e"): # ɛ: <ee>
                phon += "ɛ:"
                is_skip = 1
            else: # ɛ <e>
                phon += "ɛ"
        elif orth[i] == "y":
            if (i != len(orth) - 1) and (orth[i + 1] == "y"): # ɯ: <yy>
                phon += "ɯ:"
                is_skip = 1
            else: # ɯ <y>
                phon += "ɯ"
        elif orth[i] == "â":
            if (i != len(orth) - 1) and (orth[i + 1] == "â"): # ɤ: <ââ>
                phon += "ɤ:"
                is_skip = 1
            else: # ɤ <â>
                phon += "ɤ"
        elif orth[i] == "ô":
            if (i != len(orth) - 1) and (orth[i + 1] == "ô"): # o: <ôô>
                phon += "o:"
                is_skip = 1
            else: # o <ô>
                phon += "o"
        elif orth[i] == "o":
            if (i != len(orth) - 1) and (orth[i + 1] == "o"): # ɔ: <oo>
                phon += "ɔ:"
                is_skip = 1
            else: # ɔ <o>
                phon += "ɔ"
        # nasals
        elif orth[i] == "ỹ":
            if (i != len(orth) - 1) and (orth[i + 1] == "ỹ"): # ɯ̃: <ỹỹ>
                phon += "ɯ̃:"
                is_skip = 1
            else: # ɯ̃ <ỹ>
                phon += "ɯ̃"
        else:
            phon += orth[i]
        print(phon)
    return phon

# Takes in a string of panãra phonetic without syllable and stress marks
# and returns the phonetic form.
# ex. takes in "nãnsy" and returns "nãn.ˈsɯ"
def phonetic_to_syllable(phon):
    phon_syll = ""
    return phon_syll

# Takes in a string of panãra /phonemic/[phonetic]<orthography>(author,year,page){POR,ENG}|note|
# and returns the string with the [phonetic] portion filled based off of the orthography
def format_phonetic_fill(format):
    prev_bracket = -1
    post_bracket = -1
    is_ortho = 0
    ortho = ""
    for i in range(len(format)):
        if format[i] == "[":
            prev_bracket = i
        elif format[i] == "]":
            post_bracket = i
        elif format[i] == "<":
            is_ortho = 1
        elif format[i] == ">":
            break
        elif is_ortho == 1:
            ortho += format[i]
    return format[:prev_bracket + 1] + orth_to_phonetic(ortho) + format[post_bracket:]
