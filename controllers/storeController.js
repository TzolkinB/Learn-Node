exports.myMiddleware = (req, res, next) => {
	req.name = 'Kim';
	next();
}

exports.homePage = (req, res) => {
	console.log(req.name); //logs 'Kim' in the terminal
	res.render('index');
};

exports.addStore = (req, res) => {
	//res.send('it works'); //quickly check to see that route works
	res.render('editStore', {title: 'Add Store'});
};