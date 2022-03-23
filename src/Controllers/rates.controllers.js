const bcrypt = require("bcrypt");
require("../node_modules/dotenv").config();
const jwt = require("jsonwebtoken");
const RatesModel = require("../Models/rates");
const axios = require("axios");

const getRates = axios({
	url: process.env.RATES_API_BASEURL,
	path: "/simple/price",
	method: "GET",
	params:{
		ids:"bitcoin,ethereum,litecoin,xrp",
		vs_currencies:"usd,eur,gbp"
	},
	headers:{
		"Content-Type":"application/json"
	}
}).then(res=>{
	console.log(res);
});
 



const adminLogin = (req, res, next) => {
	Admin.find({ email: req.body.email })
		.exec()
		.then((admin) => {
      console.log(admin)
			if (admin.length < 1) {
				return res.status(401).json({
					message: "Auth failed: Email not found probably",
				});
			}
			bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
				if (err) {
          console.log(err)
					return res.status(401).json({
						message: "Auth failed",
					});
				}
				if (result) {
					const token = jwt.sign(
						{
              adminId: admin[0]._id,
							email: admin[0].email,
							name: admin[0].name,
							phone_number: admin[0].phone_number,
						},
						process.env.jwtSecret,
						{
							expiresIn: "1d",
						}
          );
          console.log(admin[0])
					return res.status(200).json({
						message: "Auth successful",
						adminDetails: {
							adminId: admin[0]._id,
							name: admin[0].name,
							email: admin[0].email,
							phone_number: admin[0].phone_number,
						},
						token: token,
					});
				}
				res.status(401).json({
					message: "Auth failed1",
				});
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
}

const getMe = async (req, res) => {
	const adminId = req.admin.adminId;
	const admin = await Admin.findById(adminId);
	if (admin) {
		res.status(200).json({
			message: "Found",
			admin,
		});
	} else {
		res.status(400).json({
			message: "Bad request",
		});
	}
};

module.exports = {
  adminLogin,
  adminRegister,
	getMe,
	getRates
};
