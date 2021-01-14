const fs = require("fs");
const os = require("os");
const prompts = require('prompts');
const path = require("path");
const home = os.homedir();
//用这种方式以免不同平台斜线不一样
const fullFolderName = path.join(home, 'todo');
prompts.override(require('yargs').argv);

module.exports.add = (content) => {
  // a+如果不存在就创建
  fs.readFile(fullFolderName, { flag: "a+" }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let list;
      try {
       list = JSON.parse(data.toString())  
       console.log(list,'list')
      } catch (err) {
        list = [];
      }
      const task = {
        title: content,
        done: false,
      };
      list.push(task);
      fs.writeFile(fullFolderName, JSON.stringify(list), { flag: "w+" }, (err, fd) => {
        if (err) console.log(err);
      });
      (async () => {
        const response = await prompts([
          {
            type: 'select',
            name: 'title',
            message: 'Pick task',
            choices: list.map((item,index)=>{
               return {title:`${index}-${item.done?'done':'x'}_${item.title}`, value:index}
            })
          },
          {
            type: 'confirm',
            name: 'value',
            message: 'Have you done?',
            initial: true
          }
        ]);
        // 找出第几个   
        list[response.title].done = response.value
        fs.writeFile(fullFolderName, JSON.stringify(list),{ flag: "w+" },(err)=>{
            console.log(err)
        })
        console.log(list);
      })();
    }
  });
};


module.exports.clear =()=>{
    fs.writeFile(fullFolderName,[], { flag: "w+" },(err,fd)=>{
        if (err) console.log(err);
    })
}

module.exports.done=()=>{
    fs.readFile(fullFolderName,{ flag: "a+" },(err, data) =>{
        if(err){
            console.log(err,'errdone')
        }
        console.log(data.toString(),'data')
    })
}
module.exports.showAll=()=>{
    fs.readFile(fullFolderName,{ flag: "a+" },(err, data) =>{
        if(err){
            console.log(err,'errdone')
        }
        console.log(data.toString())
    })
}
