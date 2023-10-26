// controller for home route
const home = (req, res, next) => {
    return (req, res) => {
        res.send('home');
        // res.render("home");
    }
}

// controller for about route
const about = (req, res, next) => {
    return (req, res) => {
        res.send('about')
        // res.render("about");
    }
}

// controller for register route
const register = (req, res, next) => {
    return (req, res) => {
        res.send('register')
        // res.render("register");
    }
}

// controller for login route
const  login = (req, res, next) => {
    return (req, res) => {
        res.send('login');
        // res.render("login");
    }
}

exports.modules = {home, about, register, login};