import figlet from 'figlet';
import kleur from 'kleur';

export default class TerminalSetup {
  static clearAndPrint() {
    require('clear')();

    console.log(
      kleur.bgBlack().magenta(
        figlet.textSync('Tweet Songs', {
          font: 'Electronic',
        }),
      ),
    );
  }
}
