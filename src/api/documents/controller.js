const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

exports.upload = async (req, res) => {
  try {
    const file = req.files[0];
    const filebreak = file.filename.split('.');
    let filename = file.filename;
    const uniqueIdentifier = uuidv4();
    const sourceLoc = path.resolve(__dirname, `../../../uploads`);
    const destinationLoc = path.resolve(__dirname, `../../../uploadsnew`);
    const source = fs.createReadStream(file.path);
    let dest;
    fs.readdir(sourceLoc, function (err, dir_files) {
      for (let i = 0; i < dir_files.length; i++) {
        if (dir_files[i] == filename) {
          filename = uniqueIdentifier + '.' + filebreak[1]; // rename the file
          fs.unlink(
            path.resolve(__dirname, `../../../uploads/${file.filename}`),
            () => {
              console.log('Unlinking');
            }
          );
          break;
        }
      }
      dest = fs.createWriteStream(destinationLoc + '/' + filename);
      source.pipe(dest);
    });
    source.on('end', function () {
      res.status(200).send({
        status: true,
        success: {
          message: 'File uploaded successfully',
          data: [uniqueIdentifier]
        },
        error: null
      });
    });
    source.on('error', function (err) {
      res.json('There was an error when attempting to upload this file.');
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      success: null,
      error: {
        message: 'Something went wrong!'
      }
    });
  }
};

exports.download = async (req, res) => {
  try {
    const file = path.resolve(
      __dirname,
      `../../../uploadsnew/${req.params.filename}`
    );
    const fileDetail = req.params.filename.split('.');
    const dest = path.resolve(__dirname, `../../../uploadsnew/`);
    await sharp(file).toFile(`${dest}/${fileDetail[0]}.${req.params.filetype}`);
    res.sendFile(`${dest}/${fileDetail[0]}.${req.params.filetype}`);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      success: null,
      error: {
        message: 'Something went wrong!'
      }
    });
  }
};
