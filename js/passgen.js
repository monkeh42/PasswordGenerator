var wordList = [
    // Borrowed from xkcd password generator which borrowed it from wherever
    "pikachu","charmander","bulbasaur","squirtle","jigglypuff","meowth","eevee","snorlax","mewtwo","mew","psyduck","blastoise","venusaur","gyarados","magikarp","dragonite","lapras","vaporeon","flareon","jolteon","zapdos","articuno","moltres","ditto","gengar","haunter","gastly","onix","geodude","clefairy","clefable","pidgey","pidgeot","rattata","raticate","spearow","fearow","ekans","arbok","sandshrew","sandslash","nidoran","nidorina","nidoqueen","nidorino","nidoking","vulpix","ninetales","zubat","golbat","oddish","gloom","vileplume","paras","parasect","venonat","venomoth","diglett","dugtrio","persian","golduck","primeape","growlithe","arcanine","poliwag","poliwhirl","poliwrath","abra","kadabra","alakazam","machop","machoke","machamp","bellsprout","weepinbell","victreebel","tentacool","tentacruel","graveler","golem","ponyta","rapidash","slowpoke","slowbro","magnemite","magneton","doduo","dodrio","seel","dewgong","grimer","muk","shellder","cloyster","drowzee","hypno","krabby","kingler","voltorb","electrode","exeggcute","exeggutor","cubone","marowak","hitmonlee","hitmonchan","lickitung","koffing","weezing","rhyhorn","rhydon","chansey","tangela","kangaskhan","horsea","seadra","goldeen","seaking","staryu","starmie","scyther","jynx","electabuzz","magmar","pinsir","tauros","gyarados","lapras","omanyte","omastar","kabuto","kabutops","aerodactyl","dratini","dragonair","mewtwo","chikorita","bayleef","meganium","cyndaquil","quilava","typhlosion","totodile","croconaw","feraligatr","sentret","furret","hoothoot","noctowl","ledyba","ledian","spinarak","ariados","crobat","chinchou","lanturn","pichu","cleffa","igglybuff","togepi","togetic","natu","xatu","mareep","flaaffy","ampharos","bellossom","marill","azumarill","sudowoodo","politoed","hoppip","skiploom","jumpluff","aipom","sunkern","sunflora","yanma","wooper","quagsire","espeon","umbreon","murkrow","slowking","misdreavus","unown","wobbuffet","girafarig","pineco","forretress","dunsparce","gligar","steelix","snubbull","granbull","qwilfish","scizor","shuckle","heracross","sneasel","teddiursa","ursaring","slugma","magcargo","swinub","piloswine","corsola","remoraid","octillery","delibird","mantine","skarmory","houndour","houndoom","kingdra","phanpy","donphan","stantler","smeargle","tyrogue","hitmontop","smoochum","elekid","magby","miltank","blissey","raikou","entei","suicune","larvitar","pupitar","tyranitar","lugia","celebi","treecko","grovyle","sceptile","torchic","combusken","blaziken","mudkip","marshtomp","swampert","poochyena","mightyena","zigzagoon","linoone","wurmple","silcoon","beautifly","cascoon","dustox","lotad","lombre","ludicolo","seedot","nuzleaf","shiftry","taillow","swellow","wingull","pelipper","ralts","kirlia","gardevoir","surskit","masquerain","shroomish","breloom","slakoth","vigoroth","slaking","nincada","ninjask","shedinja","whismur","loudred","exploud","makuhita","hariyama","azurill","nosepass","skitty","delcatty","sableye","mawile","aron","lairon","aggron","meditite","medicham","electrike","manectric","plusle","minun","volbeat"
  ];
  


function generateRandomWord() {
    return wordList[randInt(wordList.length)];
}

function randInt(lessThan) {
    return Math.floor(Math.random() * lessThan);
}

function genChars(format){
    var symbols = "~!@$%^&*+-_?";
    var nums = "01234567890"
    var rString = '';
    var rnum;

    if (format == 2) {
        for (i=0; i<2; i++) {
            rnum = Math.floor(Math.random() * nums.length);
            rString += nums.substring(rnum,rnum+1);
        }
        rnum = Math.floor(Math.random() * symbols.length);
        rString += symbols.substring(rnum,rnum+1) + symbols.substring(rnum,rnum+1);
    } else {
        rnum = Math.floor(Math.random() * symbols.length);
        rString += symbols.substring(rnum,rnum+1);
        for (i=0; i<2; i++) {
            rnum = Math.floor(Math.random() * nums.length);
            rString += nums.substring(rnum,rnum+1);
        }
    }
    return rString;
}

function genStrong(numPass, numChars, sym, num, low, upp, sim) {
    const symC = "~`!@$%^&*()_-+={[}]|:;'<>.?/";
    const numC = "1234567890";
    const lowC = "qwertyuiopasdfghjklzxcvbnm";
    const uppC = "QWERTYUIOPASDFGHJKLZXCVBNM";
    var chars = '';
    var password = '';
    var rnum;
    var passwords = [];

    if (sym) {
        chars += symC;
    }
    if (num) {
        chars += numC;
    }
    if (low) {
        chars += lowC;
    }
    if (upp) {
        chars += uppC;
    }

    if (sim) {
        chars = chars.replace(/1|i|I|\/|l|\||o|O|0/g, '');
    }

    for (n=0; n<numPass; n++) {
        for (l=0; l<numChars; l++) {
            rnum = Math.floor(Math.random() * chars.length);
            password += chars.substring(rnum,rnum+1);
        }
        passwords.push(password);
        password = '';
    }

    return passwords;
}

function genWords(numwords) {
    var words = [];
    for (i=0; i<numwords; i++){
        words.push(generateRandomWord());
    }
    return words;
}

function assemble(format, numWords) {
    var password = '';
    var words = genWords(numWords);

    if (format == 2) {
        for (i=0; i<words.length; i++) {
            if (i % 2) { password += words[i].toUpperCase(); } else { password += words[i]; }
        }
    } else {
        for (i=0; i<words.length; i++) {
            password += words[i];
        }
        password = password.charAt(0).toUpperCase() + password.slice(1);
    }
    return password + genChars(format);
}

function handleClick() {
    var numWords = parseInt(document.getElementsByName("numWords")[0].value);
    var formatObj = document.getElementsByName("format");
    var numPass = parseInt(document.getElementsByName("numPass")[0].value);
    var password = ''; 
    var passwords = '';
    var format;
    document.getElementsByName("outputText")[0].value = '';

    for (k=0; k<formatObj.length; k++) {
        if (formatObj[k].checked) {
            format = parseInt(formatObj[k].value);
        }
    }

    if (numPass>1) {
        for (j=0; j<numPass; j++) {
            password = assemble(format, numWords);
            passwords += password + "\r\n";
        }
        document.getElementsByName("outputText")[0].value = passwords;
    } else {
        document.getElementsByName("outputText")[0].value = assemble(format, numWords);
    }
}

function handleStrong() {
    var numChars = parseInt(document.getElementsByName("numChars")[0].value);
    var numPass = parseInt(document.getElementsByName("numStrong")[0].value);
    var sym = document.getElementsByName("incSymbols")[0].value;
    var num = document.getElementsByName("incNumbers")[0].value;
    var low = document.getElementsByName("incLower")[0].value;
    var upp = document.getElementsByName("incUpper")[0].value;
    var sim = document.getElementsByName("excSimilar")[0].value;
    var passwords = [];
    document.getElementsByName("outputText")[0].value = '';

    passwords = genStrong(numPass, numChars, sym, num, low, upp, sim);

    for (m=0; m<passwords.length; m++) {
        document.getElementsByName("outputText")[0].value += passwords[m] + "\r\n";
    }
}

function clearOutput() {
    document.getElementsByName("outputText")[0].value = '';
}

function exportCSV() {
    var csvContent = "data:text/csv;charset=utf-8," + document.getElementsByName("outputText")[0].value;
    var encodedUri = encodeURI(csvContent);
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); 

    link.click();
}
