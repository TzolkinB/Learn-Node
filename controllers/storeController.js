exports.myMiddleware = (req, res, next) => {
	req.name = 'Kim';
	next();
}

exports.homePage = (req, res) => {
	console.log(req.name); //logs 'Kim' in the terminal
	res.render('index');
};