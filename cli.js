const { Command } = require('commander'); 
const api = require('./index.js')
const program = new Command();
program.version('0.0.1');

// 通过绑定处理函数实现命令（这里的指令描述为放在`.command`中）
// 返回新生成的命令（即该子命令）以供继续配置
program
  .command('add <x> [y]')
  .description('add')
  .action((...args) => {
      let newargs = args.slice(0,-1).join(' ')
      api.add(newargs)
  });

  program
  .command('clear')
  .description('clear')
  .action(() => {
      api.clear()
  });

  program
  .command('done')
  .description('已经完成')
  .action(() => {
      api.done()
  });

  program
  .command('showAll')
  .description('全部展示')
  .action(() => {
      api.showAll()
  });

  program.parse(process.argv);