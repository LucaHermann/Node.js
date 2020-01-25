exports.get404 = (req, res) => {
  res.status(404);
  res.render('404', {
    pageTitle: '404',
    path: '/404'
  });
};