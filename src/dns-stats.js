const { NotImplementedError } = require('../lib');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const obj = {};
  domains.map(domain => {
    const part = domain.split('.').reverse();
    let curKey = '';
    part.map(elem => {
      curKey += `.${elem}`;
      obj[curKey] = (obj[curKey] || 0) + 1;
    });
  });
  return obj;
}

module.exports = {
  getDNSStats
};
