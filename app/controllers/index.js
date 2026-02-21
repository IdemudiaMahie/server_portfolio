module.exports.home = (req, res, next) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Welcome to my Portfolio Backend!');
}