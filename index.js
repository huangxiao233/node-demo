const fs = require("fs");
const os = require("os");
const inquirer = require("inquirer");
const path = require("path");
const { isContext } = require("vm");
const home = os.homedir();
//用这种方式以免不同平台斜线不一样
const fullFolderName = path.join(home, "todo");

module.exports.add = (content) => {
  // a+如果不存在就创建
  fs.readFile(fullFolderName, { flag: "a+" }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let list;
      try {
        list = JSON.parse(data.toString());
        console.log(list, "list");
      } catch (err) {
        list = [];
      }
      const task = {
        title: content,
        done: false,
      };
      list.push(task);
      fs.writeFile(
        fullFolderName,
        JSON.stringify(list),
        { flag: "w+" },
        (err, fd) => {
          if (err) console.log(err);
        }
      );
      inquirer
        .prompt([
          {
            type: "list",
            name: "index",
            message: "choose task",
            choices: [
              ...[{ name: "quit", value: -1 }],
              ...list.map((item, index) => {
                return {
                  name: `${index} ${item.done ? "[done]" : "[x]"}_${
                    item.title
                  }`,
                  value: index,
                };
              }),
              ...[{ name: "创建", value: -2 }],
            ],
          },
        ])
        .then((selectedItem) => {
          console.log(JSON.stringify(selectedItem));
          if (selectedItem.index == -2) {
            inquirer
              .prompt([
                {
                  type: "input",
                  name: "taskName",
                  message: "create a new todo",
                },
              ])
              .then((value) => {
                const task = {
                  title: value.taskName,
                  done: false,
                };
                list.push(task);
                fs.writeFile(
                  fullFolderName,
                  JSON.stringify(list),
                  { flag: "w+" },
                  (err, fd) => {
                    if (err) console.log(err);
                  }
                );
              });
            return;
          }
          if (selectedItem.index == -1) {
            return;
          }
          inquirer
            .prompt([
              {
                type: "list",
                name: "action",
                message: "have you done?",
                choices: [
                  { name: "退出", value: "quit" },
                  { name: "完成", value: true },
                ],
              },
            ])
            .then((answer) => {
              console.log(JSON.stringify(answer));
              list[selectedItem.index].done = answer.action;
              fs.writeFile(
                fullFolderName,
                JSON.stringify(list),
                { flag: "w+" },
                (err, fd) => {
                  if (err) console.log(err);
                }
              );
            });
        });
    }
  });
};

module.exports.clear = () => {
  fs.writeFile(fullFolderName, [], { flag: "w+" }, (err, fd) => {
    if (err) console.log(err);
  });
};

module.exports.done = () => {
  fs.readFile(fullFolderName, { flag: "a+" }, (err, data) => {
    if (err) {
      console.log(err, "errdone");
    }
    console.log(data.toString(), "data");
  });
};
module.exports.showAll = () => {
  fs.readFile(fullFolderName, { flag: "a+" }, (err, data) => {
    if (err) {
      console.log(err, "errdone");
    }
    const list = JSON.parse(data.toString())
    console.log( list instanceof Array,'list')
    inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "it is all todo",
        choices:list.map((item,index)=>{
            return  {
              name: `${index} ${item.done ? "[done]" : "[x]"}_${
                item.title
              }`,
              value: index,
            };
        }),
      },
    ]).then((item)=>{
        console.log(item)
    });
  });
};
