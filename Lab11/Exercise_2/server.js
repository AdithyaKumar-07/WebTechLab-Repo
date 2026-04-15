const fs = require('fs');
const filePath = 'example.txt';
fs.writeFile(filePath, 'Hello, this is the initial content.\n', (err) => {
    if (err) return console.error('Error creating file:', err);
    console.log('File created successfully.');
    fs.appendFile(filePath, 'Adding this new line of text.\n', (err) => {
        if (err) return console.error('Error appending file:', err);
        console.log('Data appended successfully.');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return console.error('Error reading file:', err);
            console.log('File contents read:\n' + data);
            fs.unlink(filePath, (err) => {
                if (err) return console.error('Error deleting file:', err);
                console.log('File deleted successfully.');
            });
        });
    });
});
