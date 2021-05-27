fs = require('fs-extra');
const path = require("path");
const baseUrl = "http://localhost:5000/files/";

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload file. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath =  "./uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

// const download = (req, res) => {
//   const fileName = req.params.name;
//   const directoryPath =  "./uploads/";

//   res.download(directoryPath + fileName, fileName, (err) => {
//     if (err) {
//       res.status(500).send({
//         message: "Could not download the file. " + err,
//       });
//     }
//   });
// };

const view = (req, res) => {
  const fileName = req.params.name;
  const directoryPath =  "./uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err ) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    const fileInfo = files.find(file => {
      return file === fileName;
    })

    res.sendFile(path.join(__basedir + "/uploads/" + fileInfo));
  });
};

module.exports = {
  upload,
  getListFiles,
  view,
};