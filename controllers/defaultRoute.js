const defaultRoute = (req, res) => {
  res.status(200).send({message: 'You reached the server.'});
};

module.exports = defaultRoute;
