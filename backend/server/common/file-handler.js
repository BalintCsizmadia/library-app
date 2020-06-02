import fs from "fs";

const FILE_DIR = "./data/";

const fileHandler = {
  saveOrUpdate(path, file) {
    fs.readFile(FILE_DIR + path, "utf8", (err, res) => {
      if (err) {
        // no such file or directory
        if (err.errno == -2) {
          // create new file
          let data = {};
          data.table = [];
          data.table.push(file);
          fs.writeFile(FILE_DIR + path, JSON.stringify(data), (err, data) => {
            if (err) return console.log(err);
            return { message: "File created" };
          });
        } else {
          console.log(err);
          return { error: err };
        }
      } else {
        let obj = JSON.parse(res);
        const isAlreadyExists = obj.table.filter((f) => f.id === file.id);
        if (!isAlreadyExists.length) {
          obj.table.push(file);
          const json = JSON.stringify(obj);
          fs.writeFile(FILE_DIR + path, json, "utf8", (err, data) => {
            if (err) return { error: err };
            return { message: "File updated" };
          }); // write it back
        }
      }
    });
  },

  readJSON(path) {
    try {
      const data = () => fs.readFileSync(FILE_DIR + path, { endoding: "utf8" });
      return JSON.parse(data());
    } catch (err) {
      return err;
    }
  },

  deleteFromFile(path, id) {
    fs.readFile(FILE_DIR + path, "utf8", function readFileCallback(err, res) {
      let obj = JSON.parse(res); //now it an object
      const updatedList = obj.table.filter((f) => f.id != id);
      let data = {
        table: updatedList,
      };
      const json = JSON.stringify(data);
      fs.writeFile(FILE_DIR + path, json, "utf8", (err, data) => {
        if (err) return { error: err };
        return data;
      }); // write it back
    });
  },
};

export default fileHandler;
