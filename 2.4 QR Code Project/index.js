/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';


inquirer
  .prompt([
    {
     "message":"Website: ",
     "name": "URL"
    }
  ])
  .then((answers) => {
    let input = answers.URL;
 
    var qr_png = qr.image('input', { type: 'png' });
    qr_png.pipe(fs.createWriteStream('qr-image.png'));

    fs.writeFile("qr-codes.txt", input, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(fs.readFileSync("books.txt", "utf8"));
        }
      });
    
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Could not load") 
      
    } else {
        console.log("Something else is wrong") 
    }
  });

