var fs   = require('fs');
var util = require('util');

function parseSectionName(rp) {

}

function parseIngredient(rp) {
    var ing = {};
    ing.qty = rp.lines[rp.pos].substring(0, 7).trim();    
    ing.unit = rp.lines[rp.pos].substring(8,10).trim();
    ing.name = rp.lines[rp.pos].substring(11).trim();
    rp.pos++;
    return ing;
}

function parseIngredients(rp) {
    while(!(rp.lines[rp.pos] === '' && rp.lines[rp.pos+1].substring(0, 5) !== 'MMMMM')) {
        if (rp.lines[rp.pos] === '') {
            rp.pos++;
        } else if (rp.lines[rp.pos].substring(0,5) === 'MMMMM') {
            // Start a new section with the name in the section header
            var name = rp.lines[rp.pos].replace(/MMMMM/, '').replace(/-*/g, '');
            if (!rp.r.ingredients)
                rp.r.ingredients = [{name: name, list: []}];
            else
                rp.r.ingredients.push({name: name, list: []});
            rp.pos++
        } else {
            // Create an ingredients section if none exist
            if (!rp.r.ingredients) {
                rp.r.ingredients = [{list: []}];
            }
            var ing = parseIngredient(rp);
            // Add the ingredient to the last ingredient section
            rp.r.ingredients[rp.r.ingredients.length-1].list.push(ing);
        }
    }
    rp.pos++;
} 

function parseInstructions(rp) {
    // Add the initial section.
    // I think that the instructions block cannot start
    // with a MMMMM header, so we can add the default section.
    rp.r.instructions = [{content: ''}];
    while(rp.pos < rp.lines.length-2) {
        if (rp.lines[rp.pos].substring(0,5) === 'MMMMM') {
            var name = rp.lines[rp.pos].replace(/MMMMM/, '').replace(/-*/g, '');
            rp.r.instructions.push({name: name, content:''});
        } else {
            rp.r.instructions[rp.r.instructions.length-1].content += rp.lines[rp.pos].trim();
            if (rp.pos < rp.lines.length-3)
                rp.r.instructions[rp.r.instructions.length-1].content += '\n';

        }
        rp.pos++;
    }
}

function parseTitle(rp) {
    var titleString = rp.lines[rp.pos].trim();
    var titleAndAuthor = titleString.replace('Title: ', '');
    var titlePieces = titleAndAuthor.split(' - ', 2);
    rp.r.name = titlePieces[0];
    rp.r.author = 'Unknown';
    if (titlePieces.length > 1)
        rp.r.author = titlePieces[1];

    rp.pos++;
}

function parseCategory(rp) {
    var categoryString = rp.lines[rp.pos].trim().replace('Categories: ', '');
    var categories = categoryString.split(',').map(function(a) {return a.trim()});
    rp.r.category = categories[0];
    rp.r.tags = categories.splice(1);
    rp.pos++;
}

function parseYield(rp) {
    var yieldString = rp.lines[rp.pos].trim().replace('Yield: ', '');
    rp.r.yield = parseInt(yieldString.split(' ')[0]);
    rp.pos++;
}

function parseRecipe(s) {
    var lines = s.split('\n').map(function(l) { return l.replace(/^\s$/g, '') });
    var rp = {pos: 0, lines: lines, r: {}};

    while (rp.lines[rp.pos] === '')
        rp.pos++;

    if ((/MMMMM-* Recipe via Meal-Master \(tm\) v8\.00 -*/).test(rp.lines[rp.pos])) {
        console.log('Invalid recipe header');
        return null;
    }
    rp.pos++;

    if (rp.lines[rp.pos] != '') {
        console.log('Missing newline after header');
        return null;
    }
    rp.pos++;

    parseTitle(rp);
    parseCategory(rp);
    parseYield(rp);

    if (rp.lines[rp.pos] != '') {
        console.log('Missing newline after yield');
        return null;
    }
    rp.pos++;

    parseIngredients(rp);

    parseInstructions(rp);

    return rp.r;
}


// Read the export file into a string
var file = fs.readFileSync('./EXPORT.TXT', 'utf8');
file = file.replace(/\r/g, '');

// Split each recipe into its own string
var recipes = file.split(/^MMMMM$/mg);
recipes.splice(recipes.length-1, 1);
console.log('Parsing '+ recipes.length + ' recipes.');

//var r = parseRecipe(recipes[recipes.length-2]);
//console.log(util.inspect(r, false, null));
var rs = [];
for (var i = 0; i < recipes.length; i++) {
    rs.push(parseRecipe(recipes[i]));
}

fs.writeFile('recipes.json', JSON.stringify(rs, null, 4));
