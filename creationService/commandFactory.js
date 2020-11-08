const fs = require('fs');
const path = require('path');

const prompt = require('prompt');
const {flagSkeleton} = require("./flagSkeleton");
const {cmdSkeleton} = require("./cmdSkeleton");
const {testSkeleton} = require("./testSkeleton");

const properties = [
    {
        name: 'Command_Name',
        validator: /^[a-zA-Z0-9\-_]+$/,
        warning: 'Command must be only letters, numbers, underscores or dashes'
    },
    {
        name: 'Description'
    }
];

prompt.start();

prompt.get(properties, function (err, result) {
    if (err) {
        return onErr(err);
    }
    console.log('Command-line input received:');
    console.log('  Command Name: ' + result.Command_Name);
    console.log('  Description: ' + result.Description);

    createDocuments(result);
});

function onErr(err) {
    console.log(err);
    return 1;
}

const createDocuments = (result) => {

    const commandName = result.Command_Name;
    const description = result.Description;

    const dirPathRoot = path.resolve(`./src/bot/commands/${commandName}/`);
    const dirPathFlags = path.join(dirPathRoot, `${commandName}_flags`);
    const dirPathTests = path.join(dirPathRoot, `${commandName}_tests`);

    const mainFilePath = `${commandName}.js`;
    const flagFilePath = `flag_example.js`;
    const testFilePath = `${commandName}_test.js`;

    console.log('Trying to create documents at...\n', dirPathRoot);
    console.log();

    if (!fs.existsSync(dirPathRoot)) {
        fs.mkdir(dirPathFlags, {recursive: true}, (err) => {
            fs.mkdir(dirPathTests, {recursive: true}, (err2) => {
                if (err || err2) throw err || err2;

                writeFile(dirPathRoot, mainFilePath, cmdSkeleton(commandName, description));
                writeFile(dirPathFlags, flagFilePath, flagSkeleton(commandName));
                writeFile(dirPathTests, testFilePath, testSkeleton(commandName));
            });
        });
    } else {
        console.log("Directory already exists.");
    }

    const writeFile = (dir, fileName, fileContent) => {
        fs.writeFile(path.join(dir, fileName), fileContent, (err) => {
            if (err) throw err;

            console.log("File successfully created at:\n", path.join(dir, fileName));
        });
    };
};
