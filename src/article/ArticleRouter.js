const router = require('express').Router();
const Article = require('./Article');
const pagination = require('../shared/pagination');


router.get('/articles', pagination, async (req, res) => {
  const { page, size } = req.pagination;

  const articleWithCount = await Article.findAndCountAll({
    limit: size,
    offset: page * size
  });
  res.send({
    content: articleWithCount.rows,
    totalPages: Math.ceil(articleWithCount.count / Number.parseInt(size))
  });
})

module.exports = router;