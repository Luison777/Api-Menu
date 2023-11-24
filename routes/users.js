var express = require('express');
var router = express.Router();
const dishes=[{
  dish: "Chocolate Lava Cake",
  ingredients: "Chocolate, butter, sugar, eggs, flour",
  price: "$8.99",
  src: "dessert1.jpg"
},
{
  dish: "Classic New York Cheesecake",
  ingredients: "Cream cheese, graham cracker crust, vanilla",
  price: "$9.49",
  src: "dessert2.jpg"
},
{
  dish: "Mixed Berry Parfait",
  ingredients: "Berries, yogurt, granola, honey",
  price: "$7.99",
  src: "dessert3.webp"
}
 ]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(dishes);
});

router.post('/', function(req, res, next) {
  const newDish = req.body; // Assuming the new dish data is sent in the request body
  dishes.push(newDish);
  res.status(201).json({ message: 'Dish added successfully', newDish });
});

router.put('/:index', function(req, res, next) {
  const index = req.params.index;
  const updatedDish = req.body; // Assuming the updated dish data is sent in the request body
  if (index >= 0 && index < dishes.length) {
    dishes[index] = updatedDish;
    res.json({ message: 'Dish updated successfully', updatedDish });
  } else {
    res.status(404).json({ message: 'Dish not found' });
  }
});

router.delete('/:index', function(req, res, next) {
  const index = req.params.index;
  if (index >= 0 && index < dishes.length) {
    const deletedDish = dishes.splice(index, 1);
    res.json({ message: 'Dish deleted successfully', deletedDish });
  } else {
    res.status(404).json({ message: 'Dish not found' });
  }
});

module.exports = router;
