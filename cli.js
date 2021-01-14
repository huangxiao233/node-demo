const { Command } = require('commander'); 
const api = require('./index.js')
const program = new Command();
program.version('0.0.1');

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