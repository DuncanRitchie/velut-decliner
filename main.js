const charsElement = document.getElementById("characters-phonetic");

const phoneticData = `
Replace this text with the text you want to get the distinct characters from.
`;

const removeDuplicateChars = (string) => {
    let charsObject = {};
    let charsString = "";
    for (let i = 0; i < string.length; i++) {
        const currentChar = string[i];
        if (!charsObject[currentChar]) {
            charsString += currentChar;
            charsObject[currentChar] = true;
        }
    }
    return charsString;
};

const sortString = (string) => {
    let charsArray = [];
    for (let i = 0; i < string.length; i++) {
        charsArray.push(string[i]);
    }
    charsArray.sort();
    return charsArray.join("");
};

const updateDomElement = () => {
    charsElement.textContent = sortString(removeDuplicateChars(phoneticData));
}

updateDomElement();
