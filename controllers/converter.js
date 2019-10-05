//
exports.getConvertedString = (req, res, next) => {
    if (req.query.toConvert) {
        const converted = csvConvert(req.query.toConvert);
        res.status(200).send(converted);
    }
    else {
        const example = 'Try a different url ex: http://localhost:8080/?toConvert=“Patient Name”,”SSN”,”Age”,”Phone Number”,”Status”\n“Prescott, Zeke”,”542-51-6641”,21,”801-555-2134”,”Opratory=2,PCP=1”\r\n“Goldstein, Bucky”,”635-45-1254”,42,”435-555-1541”,”Opratory=1,PCP=1”\n“Vox, Bono”,”414-45-1475”,51,”801-555-2100”,”Opratory=3,PCP=2”';
        res.status(400).send(example);
    }    
};

//function to take the csv and convert to the expected output
const csvConvert = data => {
    let leftQuote = false;
    const converted = [];
    for (let i = 0; i < data.length; i++) {
        if ((data[i] === '\"' || data[i] === '“' || data[i] === '”') && leftQuote === false ) {
            leftQuote = true;
            converted.push('[')
        }
        else if ((data[i] === '\"' || data[i] === '“' || data[i] === '”') && leftQuote === true ) {
            leftQuote = false;
            converted.push(']');
        }
        else if (data[i] === ',' && leftQuote === false) {
            if (data[i-1] != '\"' && data[i-1] != '“' && data[i-1] != '”')
                converted.push('] ');
            else if ((data[i+1] === '\"' || data[i+1] === '“' || data[i+1] === '”'))
                converted.push(' ');
            else    
                converted.push(' [');
        }
        else {
            converted.push(data[i]);
        }
    }
    const final = converted.join('');
    return final;
}