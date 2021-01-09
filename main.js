const buttonClearInputs = document.getElementById("clear-inputs");
const textareaInput = document.getElementById("textarea-input");
const buttonGenerateSelectDeclensionsTable = document.getElementById("generate-select-declensions-table");
const tbody = document.getElementById("tbody");
const declensionsDataList = document.getElementById("declension-descriptions");
const textBySelectDeclensions = document.getElementById("text-by-select-declensions");
const buttonDecline = document.getElementById("decline");
const textareaOutput = document.getElementById("textarea-output");
const textByCopyToClipboard = document.getElementById("text-by-copy-to-clipboard");
const buttonCopyToClipboard = document.getElementById("copy-to-clipboard");

const schemata = [
    {
        "Description":        "1st, noun, Latin-style",
        "Unstressed endings": ["a","ae","am","ā","ās","īs"],
        "Stressed endings":   ["ārum"],
        "Lemma ending":       "a",
    },
    {
        "Description":        "1st, noun, Greek-style",
        "Unstressed endings": ["ē","ēs","ēn","ae"],
        "Stressed endings":   ["ārum"],
        "Lemma ending":       "ē",
    },
    {
        "Description":        "2nd, noun, masculine/feminine",
        "Unstressed endings": ["us","ī","e","ō","um","ōs","īs"],
        "Stressed endings":   ["ōrum"],
        "Lemma ending":       "us",
    },
    {
        "Description":        "2nd, noun, neuter",
        "Unstressed endings": ["um","ī","ō","um","a","īs"],
        "Stressed endings":   ["ōrum"],
        "Lemma ending":       "um",
    },
    {
        "Description":        "3rd, noun, consonant stem",
        "Unstressed endings": ["","is"],
        "Stressed endings":   [],
        "Lemma ending":       "is",
    },
    {
        "Description":        "3rd, noun, -i stem",
        "Unstressed endings": ["","is"],
        "Stressed endings":   [],
        "Lemma ending":       "is",
    },
    {
        "Description":        "4th, noun, -us nominative",
        "Unstressed endings": ["ūs"],
        "Stressed endings":   [],
        "Lemma ending":       "ūs",
    },
    {
        "Description":        "4th, noun, -ū nominative",
        "Unstressed endings": ["ūs"],
        "Stressed endings":   [],
        "Lemma ending":       "ū",
    },
    {
        "Description":        "5th, noun",
        "Unstressed endings": ["em","ē","ēs"],
        "Stressed endings":   ["ēī","ērum","ēbus"],
        "Lemma ending":       "ēs",
    },
    {
        "Description":        "1st/2nd, adjective",
        "Unstressed endings": ["us","ī","e","ō","um","ōs","a","ae","am","ā","ās","īs","ior","ē","ius"],
        "Stressed endings":   ["ārum","ōrum"],
        "Lemma ending":       "us",
    },
    {
        "Description":        "3rd, adjective, one-form nominative singular",
        "Unstressed endings": ["","is","em","ī","e","ēs","ia","um","ibus"],
        "Stressed endings":   [],
        "Lemma ending":       "is",
    },
    {
        "Description":        "3rd, adjective, two-form nominative singular",
        "Unstressed endings": ["","e","is","em","ī","ēs","ia","um","ibus"],
        "Stressed endings":   [],
        "Lemma ending":       "is",
    },
]

const getDescriptionsFromSchemata = () => {
    return schemata.map(schema => {
        return schema.Description;
    })
}

const getSchemaDescriptionForLemma = (lemma) => {
    for (let i = 0; i < schemata.length; i++) {
        if (lemma.endsWith(schemata[i]["Lemma ending"])) {
            return schemata[i].Description;
        }
    }
    return "3rd, noun, consonant stem";
}

const getSchemaFromDescription = (declensionDescription) => {
    for (let i = 0; i < schemata.length; i++) {
        if (schemata[i].Description === declensionDescription) {
            return schemata[i];
        }
    }
}

const getFormsFromLemmaAndDeclensionDescription = (lemma, declensionDescription) => {
    let forms = [];

    return forms;
}

const getStemFromLemma = (lemma, lemmaEnding) => {
    if (lemma.endsWith(lemmaEnding)) {
        return lemma.substr(0, lemma.length - lemmaEnding.length);
    }
    return lemma;
}

const getLemmataFromInput = () => {
    if (!textareaInput.value) {
        return [];
    }

    const lemmataArray = textareaInput.value.split(/[\s,;\.]+/);
    console.log(lemmataArray);
    return lemmataArray;
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
    const lemmataArray = getLemmataFromInput();
    const descriptions = getDescriptionsFromSchemata();
    console.log(descriptions);

    let innerHtml = "";
    lemmataArray.map(lemma => {
        const declensionDescription = getSchemaDescriptionForLemma(lemma);

        innerHtml = `${innerHtml}
        <tr>
        <td>
        ${lemma}
        </td>
        <td>
        <input id="declension-input-${lemma}" list="declension-descriptions" value="${declensionDescription}"/>
        </td>
        </tr>`;
    });

    tbody.innerHTML = innerHtml;
}

const decline = () => {
    const countLemmata = tbody.children.length;
    let declinedForms = [];

    for (let i = 0; i < countLemmata; i++) {
        const lemma = tbody.children[i].children[0].textContent.trim();
        const declensionDescription = tbody.children[i].children[1].children[0].value;
        const schema = getSchemaFromDescription(declensionDescription);
        const stem = getStemFromLemma(lemma, schema["Lemma ending"]);

        schema["Unstressed endings"].map(ending => {
            const form = `${stem}${ending}`
            declinedForms.push({Form: form, Lemma: lemma});
        })

        schema["Stressed endings"].map(ending => {
            const form = `${stem}${ending}`
            declinedForms.push({Form: form, Lemma: lemma});
        })
    }

    console.log("declinedForms", declinedForms);
    textareaOutput.value = declinedForms.map(object=>`${object.Form}\t${object.Lemma}`).join("\n");
}

const clearTextMessages = () => {
    textBySelectDeclensions.textContent = "";
    textByCopyToClipboard.textContent = "";
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
