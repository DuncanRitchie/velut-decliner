const textareaInput = document.getElementById("textarea-input");
const buttonGenerateSelectDeclensionsTable = document.getElementById("generate-select-declensions-table");
const tbody = document.getElementById("tbody");
const buttonDecline = document.getElementById("decline");

const schemata = [
    {
        "Description":        "1st, noun, Latin-style",
        "Unstressed endings": ["a","ae","am","ā","ās","īs"],
        "Stressed endings":   ["ārum"],
    },
    {
        "Description":        "1st, noun, Greek-style",
        "Unstressed endings": ["ē","ēs","ēn","ae"],
        "Stressed endings":   ["ārum"],
    },
    {
        "Description":        "2nd, noun, masculine/feminine",
        "Unstressed endings": ["us","ī","e","ō","um","ōs","īs"],
        "Stressed endings":   ["ōrum"],
    },
    {
        "Description":        "2nd, noun, neuter",
        "Unstressed endings": ["um","ī","ō","um","a","īs"],
        "Stressed endings":   ["ōrum"],
    },
    {
        "Description":        "3rd, noun, -i stem",
        "Unstressed endings": ["","is"],
        "Stressed endings":   [],
    },
    {
        "Description":        "3rd, noun, consonant stem",
        "Unstressed endings": ["","is"],
        "Stressed endings":   [],
    },
    {
        "Description":        "4th, noun, -us nominative",
        "Unstressed endings": ["ūs"],
        "Stressed endings":   [],
    },
    {
        "Description":        "4th, noun, -ū nominative",
        "Unstressed endings": ["ūs"],
        "Stressed endings":   [],
    },
    {
        "Description":        "5th, noun",
        "Unstressed endings": ["em","ē","ēs"],
        "Stressed endings":   ["ēī","ērum","ēbus"],
    },
    {
        "Description":        "1st/2nd, adjective",
        "Unstressed endings": ["us","ī","e","ō","um","ōs","a","ae","am","ā","ās","īs","ior","ē","ius"],
        "Stressed endings":   ["ārum","ōrum"],
    },
    {
        "Description":        "3rd, adjective, one-form nominative singular",
        "Unstressed endings": ["","is","em","ī","e","ēs","ia","um","ibus"],
        "Stressed endings":   [],
    },
    {
        "Description":        "3rd, adjective, two-form nominative singular",
        "Unstressed endings": ["","e","is","em","ī","ēs","ia","um","ibus"],
        "Stressed endings":   [],
    },
]

const getDescriptionsFromSchemata = () => {
    return schemata.map(schema => {
        return schema.Description;
    })
}

const getSchemaDescriptionForLemma = (lemma) => {
    if (lemma.endsWith("a")) {
        return "1st, noun, Latin-style";
    }
    if (lemma.endsWith("us")) {
        return "2nd, noun, masculine/feminine";
    }
    if (lemma.endsWith("um")) {
        return "2nd, noun, neuter";
    }
    if (lemma.endsWith("ūs")) {
        return "4th, noun, -us nominative";
    }
    if (lemma.endsWith("ū")) {
        return "4th, noun, -ū nominative";
    }
    if (lemma.endsWith("ēs")) {
        return "5th, noun";
    }
    return "3rd, noun, consonant stem";
}

const getLemmataFromInput = () => {
    const lemmataArray = textareaInput.value.split(/[\s,;\.]+/);
    console.log(lemmataArray);
    return lemmataArray;
}

const generateSelectDeclensionsTable = () => {
    const lemmataArray = getLemmataFromInput();
    const descriptions = getDescriptionsFromSchemata();
    console.log(descriptions);

    const generateRadio = (lemma, declensionDescription, checked) => {
        return `<label><input type="radio" name="${lemma}" value="${declensionDescription}" ${checked ? "checked " : ""}>${declensionDescription}</label>`;
    }

    let innerHtml = "";
    lemmataArray.map(lemma => {
        const checkedDescription = getSchemaDescriptionForLemma(lemma);

        innerHtml = `${innerHtml}
        <tr>
        <td>
        ${lemma}
        </td>
        <td>`

        descriptions.map(description => {
            const checked = description === checkedDescription;
            innerHtml = `${innerHtml}${generateRadio(lemma, description, checked)}`;
        });

        innerHtml = `${innerHtml}
        </td>
        </tr>`;});

    tbody.innerHTML = innerHtml;
}

buttonGenerateSelectDeclensionsTable.addEventListener("click", generateSelectDeclensionsTable);
