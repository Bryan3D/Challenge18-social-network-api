const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // To find all the tags along with their associated products, we'll execute the following query:(HINT: You'll need to use the ProductTag model to include the associated product data)

  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
});
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
  //  if the tag is not found, return a 404 error
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbTagData);
    })

    // if there is an error, return a 500 error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.post('/', (req, res) => {
  // create a new tag
  // be sure to include its associated Product data (HINT: You'll need to use the ProductTag model to include the associated product data)
  Tag.create({
    tag_name: req.body.tag_name,
  })
  // if the tag is not found, return a 404 error
    .then((dbTagData) => res.json(dbTagData))

  // if there is an error, return a 500 error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    tag_name: req.body.tag_name,
    where: {
      id: req.params.id,
    },
  })
  // if the tag is not found, return a 404 error
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  // if the tag is not found, return a 404 error
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbTagData);
    }
    )
    // if there is an error, return a 500 error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
    
});

module.exports = router;
