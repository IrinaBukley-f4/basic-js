const { NotImplementedError } = require('../lib');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    return this.process(message, key, 1);
  }

  decrypt(encryptedMessage, key) {
    return this.process(encryptedMessage, key, -1);
  }

  process(text, key, direction) {
    if (!text || !key) {
      throw new Error('Incorrect arguments!');
    }

    const textUpper = text.toUpperCase();
    const keyUpper = key.toUpperCase();
    
    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < textUpper.length; i++) {
      const charCode = textUpper.charCodeAt(i);

      if (charCode >= 65 && charCode <= 90) {
        const keyCharCode = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65;
        
        let shift = (charCode - 65 + direction * keyCharCode) % 26;
        if (shift < 0) shift += 26;
        
        result += String.fromCharCode(shift + 65);
        keyIndex++;
      } else {
        result += textUpper[i];
      }
    }

    // Если машина обратная, переворачиваем строку
    return this.isDirect ? result : result.split('').reverse().join('');
  }
}

module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};
