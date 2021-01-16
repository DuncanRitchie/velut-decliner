const buttonClearInputs = document.getElementById("clear-inputs");
const buttonLoadSampleData = document.getElementById("load-sample-data");
const textareaInput = document.getElementById("textarea-input");
const buttonGenerateSelectDeclensionsTable = document.getElementById("generate-select-declensions-table");
const textBeforeTable = document.getElementById("text-before-table");
const tbody = document.getElementById("tbody");
const declensionsDataList = document.getElementById("declension-descriptions");
const textBySelectDeclensions = document.getElementById("text-by-select-declensions");
const tickboxOutputLemma = document.getElementById("output-lemma");
const buttonDecline = document.getElementById("decline");
const textareaOutput = document.getElementById("textarea-output");
const textByCopyToClipboard = document.getElementById("text-by-copy-to-clipboard");
const buttonCopyToClipboard = document.getElementById("copy-to-clipboard");

const sampleData = "terra Ariadnē corvus cerebrum fīlius officium puer avis cōnsul amor/amōris genus/generis animal/animālis manus/manūs cornū diēs probus[adj] signifer[adj] tenāx/tenācis[adj] probē tenāciter cōnstanter libenter";

const schemata = [
    {
        "Description":           "1st, noun, Latin-style",
        "Unstressed endings":    ["a","ae","am","ā","ās","īs"],
        "Stressed endings":      ["ārum"],
        "Principal part ending": "a",
    },
    {
        "Description":           "1st, noun, Greek-style",
        "Unstressed endings":    ["ē","ēs","ēn","ae","ās","īs"],
        "Stressed endings":      ["ārum"],
        "Principal part ending": "ē",
    },
    {
        "Description":           "2nd, noun, masculine/feminine, -ius",
        "Unstressed endings":    ["ius","iī","ī","iō","ium","iōs","iīs"],
        "Stressed endings":      ["iōrum"],
        "Principal part ending": "ius",
    },
    {
        "Description":           "2nd, noun, masculine/feminine, -us",
        "Unstressed endings":    ["us","ī","e","ō","um","ōs","īs"],
        "Stressed endings":      ["ōrum"],
        "Principal part ending": "us",
    },
    {
        "Description":           "2nd, noun, neuter, -ium",
        "Unstressed endings":    ["ium","iī","ī","iō","ium","ia","iīs"],
        "Stressed endings":      ["iōrum"],
        "Principal part ending": "ium",
    },
    {
        "Description":           "2nd, noun, neuter, -um",
        "Unstressed endings":    ["um","ī","ō","um","a","īs"],
        "Stressed endings":      ["ōrum"],
        "Principal part ending": "um",
    },
    {
        "Description":           "3rd, noun, masculine/feminine, consonant stem",
        "Unstressed endings":    ["","is","em","ī","e","ēs","um","ibus"],
        "Stressed endings":      [],
        "Principal part ending": "is",
    },
    {
        "Description":           "3rd, noun, masculine/feminine, -i stem",
        "Unstressed endings":    ["","is","em","ī","ēs","ium","ibus"],
        "Stressed endings":      [],
        "Principal part ending": "is",
    },
    {
        "Description":           "3rd, noun, neuter, consonant stem",
        "Unstressed endings":    ["","is","ī","a","um","ibus"],
        "Stressed endings":      [],
        "Principal part ending": "is",
    },
    {
        "Description":           "3rd, noun, neuter, -i stem",
        "Unstressed endings":    ["","is","ī","ia","ium","ibus"],
        "Stressed endings":      [],
        "Principal part ending": "is",
    },
    {
        "Description":           "4th, noun, -us nominative",
        "Unstressed endings":    ["us","ūs","um","uī","ū","uum","ibus"],
        "Stressed endings":      [],
        "Principal part ending": "ūs",
    },
    {
        "Description":           "4th, noun, -ū nominative",
        "Unstressed endings":    ["ū","ūs","ua","uum","ibus"],
        "Stressed endings":      [],
        "Principal part ending": "ū",
    },
    {
        "Description":           "5th, noun",
        "Unstressed endings":    ["ēs","em","ē"],
        "Stressed endings":      ["ēī","ērum","ēbus"],
        "Principal part ending": "ēs",
    },
    {
        "Description":           "1st/2nd, adjective, -us",
        "Unstressed endings":    ["us","ī","e","ō","um","ōs","a","ae","am","ā","ās","īs","ior","ius"],
        "Stressed endings":      ["ārum","ōrum"],
        "Principal part ending": "us[adj]",
    },
    {
        "Description":           "1st/2nd, adjective, -er/erī",
        "Unstressed endings":    ["er","erī","ere","erō","erum","erōs","era","erae","eram","erā","erās","erīs","erior","erius"],
        "Stressed endings":      ["erārum","erōrum"],
        "Principal part ending": "er[adj]",
    },
    {
        "Description":           "1st/2nd, adjective, -er/rī",
        "Unstressed endings":    ["er","rī","re","rō","rum","rōs","ra","rae","ram","rā","rās","rīs","rior","rius"],
        "Stressed endings":      ["rārum","rōrum"],
        "Principal part ending": "er[adj]",
    },
    {
        "Description":           "3rd, adjective, -āns nominative singular",
        "Unstressed endings":    ["āns","antis","ante","antem","antī","antēs","antia","antium","antibus","antior","antius"],
        "Stressed endings":      [],
        "Principal part ending": "antis[adj]",
    },
    {
        "Description":           "3rd, adjective, -ēns nominative singular",
        "Unstressed endings":    ["ēns","entis","ente","entem","entī","entēs","entia","entium","entibus","entior","entius"],
        "Stressed endings":      [],
        "Principal part ending": "entis[adj]",
    },
    {
        "Description":           "3rd, adjective, one-form nominative singular",
        "Unstressed endings":    ["","is","em","ī","ēs","ia","ium","ibus","ior","ius"],
        "Stressed endings":      [],
        "Principal part ending": "is[adj]",
    },
    {
        "Description":           "3rd, adjective, two-form nominative singular",
        "Unstressed endings":    ["","is","e","em","ī","ēs","ia","ium","ibus","ior","ius"],
        "Stressed endings":      [],
        "Principal part ending": "is[adj]",
    },
    {
        "Description":           "Adverb, -ē",
        "Unstressed endings":    ["ē","ius"],
        "Stressed endings":      ["issimē"],
        "Principal part ending": "ē",
    },
    {
        "Description":           "Adverb, -iter",
        "Unstressed endings":    ["iter","ius"],
        "Stressed endings":      ["issimē"],
        "Principal part ending": "iter",
    },
    {
        "Description":           "Adverb, -nter",
        "Unstressed endings":    ["nter","ntius"],
        "Stressed endings":      ["ntissimē"],
        "Principal part ending": "nter",
    },
    {
        "Description":           "2nd, noun, -er/-erī",
        "Unstressed endings":    ["er","erī","ere","erō","erum","erōs","erīs"],
        "Stressed endings":      ["erōrum"],
        "Principal part ending": "er",
    },
]

const getDescriptionsFromSchemata = () => {
    return schemata.map(schema => {
        return schema.Description;
    })
}

const getSchemaDescriptionForPrincipalParts = (principalParts) => {
    for (let i = 0; i < schemata.length; i++) {
        if (principalParts.endsWith(schemata[i]["Principal part ending"])) {
            return schemata[i].Description;
        }
    }
    return "3rd, noun, masculine/feminine, consonant stem";
}

const getSchemaFromDescription = (declensionDescription) => {
    for (let i = 0; i < schemata.length; i++) {
        if (schemata[i].Description === declensionDescription) {
            return schemata[i];
        }
    }
}

//// ("amor/amōris", "is") => "amōr"
//// ("cōnsul", "is") => "cōnsul"
//// ("avis", "is") => "av"
//// ("hiātus", "ūs") => "hiāt"
const getStemFromPrincipalParts = (principalParts, principalPartEnding) => {
    //// If `principalParts` contains a slash, remove anything up to it.
    principalParts = principalParts.substr(principalParts.indexOf("/") + 1);

    //// If either parameter contains an opening square bracket, remove it and anything after it.
    if (principalParts.includes("[")) {
        principalParts = principalParts.substr(0, principalParts.indexOf("["));
    }
    if (principalPartEnding.includes("[")) {
        principalPartEnding = principalPartEnding.substr(0, principalPartEnding.indexOf("["));
    }

    //// If `principalParts` ends with the ending, remove the ending.
    if (principalParts.endsWith(principalPartEnding)) {
        return principalParts.substr(0, principalParts.length - principalPartEnding.length);
    }
    //// Handle 4th declension nouns in -us/-ūs correctly.
    if (principalPartEnding === "ūs" && principalParts.endsWith("us")) {
        return principalParts.substr(0, principalParts.length - 2);
    }
    return principalParts;
}

//// "amor/amōris" => "amor"
//// "cōnsul" => "cōnsul"
//// "avis" => "avis"
//// "probus[adj]" => "probus"
//// "tenāx/tenācis[adj]" => "tenāx"
const getLemmaFromPrincipalParts = (principalParts) => {
    //// If `principalParts` contains a slash or opening square bracket, the lemma is anything up to it.
    if (principalParts.includes("/")) {
        principalParts = principalParts.substr(0, principalParts.indexOf("/"));
    }
    if (principalParts.includes("[")) {
        return principalParts.substr(0, principalParts.indexOf("["));
    }
    //// Otherwise, the lemma is the entirity of `principalParts`.
    else {
        return principalParts;
    }
}

const getPrincipalPartsFromInput = () => {
    if (!textareaInput.value) {
        return [];
    }

    const principalPartsArray = textareaInput.value.split(/[\s,;\.]+/);
    console.log(principalPartsArray);
    return principalPartsArray;
}

const refreshDataList = () => {
    declensionsDataList.innerHTML = "";
    getDescriptionsFromSchemata().map(description => {
        const newOption = document.createElement("option");
        newOption.value = description;
        declensionsDataList.append(newOption);
    });
}

const clearInputs = () => {
    textareaInput.value = "";
    tbody.innerHTML = "";
    textareaOutput.value = "";
    clearTextMessages();
}

const generateSelectDeclensionsTable = () => {
    const principalPartsArray = getPrincipalPartsFromInput();
    const descriptions = getDescriptionsFromSchemata();
    console.log(descriptions);

    let innerHtml = "";
    principalPartsArray.map(principalPart => {
        const declensionDescription = getSchemaDescriptionForPrincipalParts(principalPart);

        innerHtml = `${innerHtml}
        <tr>
        <td>
        ${principalPart}
        </td>
        <td>
        <input id="declension-input-${principalPart}" list="declension-descriptions" value="${declensionDescription}"/>
        </td>
        </tr>`;
    });

    tbody.innerHTML = innerHtml;
    announceDeclensionsTable();
}

const decline = () => {
    const countLemmata = tbody.children.length;
    let declinedForms = [];
    const pushToDeclinedForms = (form, lemma) => {
        declinedForms.push({Form: form, Lemma: lemma});
    }

    for (let i = 0; i < countLemmata; i++) {
        const principalParts = tbody.children[i].children[0].textContent.trim();
        const declensionDescription = tbody.children[i].children[1].children[0].value;
        const schema = getSchemaFromDescription(declensionDescription);
        const stem = getStemFromPrincipalParts(principalParts, schema["Principal part ending"]);
        const lemma = getLemmaFromPrincipalParts(principalParts);

        schema["Unstressed endings"].map(ending => {
            //// If `ending` is the empty string, we are looking at the lemma of the 3rd declension.
            //// If the lemma is the same as the genitive singular (eg “avis”) we don’t push it as a form, to avoid duplicates.
            //// If the lemma is different to the genitive singular (eg “rēx/rēgis” or “genus/generis”), we push the lemma.
            if (ending === "") {
                if (lemma !== `${stem}is`) {
                    pushToDeclinedForms(lemma, lemma);
                }
            }
            else {
                const form = `${stem}${ending}`;
                pushToDeclinedForms(form, lemma);
            }
        })

        schema["Stressed endings"].map(ending => {
            const form = `${stem}${ending}`;
            pushToDeclinedForms(form, lemma);
        })
    }

    console.log("declinedForms", declinedForms);

    if (tickboxOutputLemma.checked) {
        textareaOutput.value = declinedForms.map(object=>`${object.Form}\t${object.Lemma}`).join("\n");
    }
    else {
        textareaOutput.value = declinedForms.map(object=>`${object.Form}`).join("\n");
    }
}

const clearTextMessages = () => {
    textBySelectDeclensions.textContent = "";
    textByCopyToClipboard.textContent = "";
}

const announceDeclensionsTable = () => {
    clearTextMessages();
    textBeforeTable.textContent = "The table below describes how this page will decline your words. You can edit the right-hand column before clicking “Decline”.";
}

const warnOfEmptyInput = () => {
    clearTextMessages();
    textBySelectDeclensions.textContent = "Nothing to decline!";
}

const warnOfEmptyOutput = () => {
    clearTextMessages();
    textByCopyToClipboard.textContent = "Nothing to copy or download!";
}

const copyToClipboard = () => {
    clearTextMessages();
    textByCopyToClipboard.textContent = "Copying to clipboard...";
    textareaOutput.select();
    document.execCommand("copy");
    textByCopyToClipboard.textContent = "Copied!";
}




refreshDataList();

buttonClearInputs.addEventListener("click", ()=>{
    clearInputs();
});

buttonLoadSampleData.addEventListener("click", ()=>{
    textareaInput.value = sampleData;
    clearTextMessages();
});

buttonGenerateSelectDeclensionsTable.addEventListener("click", () => {
    if (textareaInput.value === "") {
        warnOfEmptyInput();
    }
    else {
        clearTextMessages();
        generateSelectDeclensionsTable();
    }
});

buttonDecline.addEventListener("click", () => {
    if (textareaInput.value === "" || tbody.children.length === 0) {
        warnOfEmptyInput();
    }
    else {
        clearTextMessages();
        decline()
    };
});

buttonCopyToClipboard.addEventListener("click", () => {
    if (textareaOutput.value === "") {
        warnOfEmptyOutput();
    }
    else {
        clearTextMessages();
        copyToClipboard();
    }
});
