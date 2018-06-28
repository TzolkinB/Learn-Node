const mongoose = require('mongoose');
const Store = mongoose.model('Store'); // store schema 

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

exports.getStores = async (req, res) => {
	// Query the db for list of all stores
	const stores = await Store.find();
	res.render('stores', {title: 'Stores', stores });
}

exports.createStore = async (req, res) => {
	console.log(req.body);
	const store = await (new Store(req.body)).save();
	//.save(); //fires off connection to mongoDB database and either returns store info or error message
	req.flash('success', `Successfully created ${store.name}. Want to leave a review?`);
	res.redirect(`/store/${store.slug}`);
};
		/* using a promise from mongoose.Promise
		store
		.save() //fires off connection to mongoDB database and either returns store info or error message
		.then(store => {
			res.json(store);
		})
		.catch(err => {
			throw Error(err);
		})
		*/

		/* using a callback (before async/await/promise were available)
		store.save(function(err, store) {
			if(!err){
				console.log('it worked!');
				res.redirect('/');
			}
		});
		*/