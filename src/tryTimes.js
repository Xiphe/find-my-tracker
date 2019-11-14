function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}
module.exports = async function tryTimes(retries, delayMs, cb, _current = 0) {
  try {
    return await cb();
  } catch (err) {
    if (_current >= retries) {
      throw err;
    }
    console.log(err.message, `...retrying(${_current + 1}/${retries})`);
    await wait(delayMs);
    return tryTimes(retries, delayMs, cb, _current + 1);
  }
};
