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

exports.editStore = async (req, res) => {
	const store = await Store.findOne({ _id: req.params.id });
	//res.json(req.params.id) //to make sure json store data is correct
	res.render('editStore', {title: 'Edit Store', store });
};

exports.updateStore = async (req, res) => {
	// set location data to be a point
	req.body.location.type = 'Point';
	const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {new:true, runValidators: true}).exec();
	req.flash('success', `Successfully updated ${store.name} <a href="/stores/${store.slug}">View Store</a>`);
	res.redirect(`/store/${store.slug}`);
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