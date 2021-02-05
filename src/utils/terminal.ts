import figlet from 'figlet';

export default class TerminalSetup {
  static clearAndPrint() {
    require('clear')();

    console.log(
      figlet.textSync('Tweet Songs', {
        font: 'Electronic',
      }),
    );
  }
}
