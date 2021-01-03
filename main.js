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
        "Description":        "3rd, noun, non-i stem",
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