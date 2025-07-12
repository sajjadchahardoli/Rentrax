const items = [
  {
    id: 1,
    image: '/images/bicycle-card.png',
    title: "Men's Diverge Comp",
    amount: '$15',
    includeFor: 'Order',
    type: { value: 'Rent', sevirty: 'info' },
  },
  {
    id: 2,
    image: '/images/basket.png',
    title: 'Folding Rear Bike Basket',
    amount: '$15',
    includeFor: 'Order',
    type: { value: 'Borrow', sevirty: 'success' },
  },
  {
    id: 3,
    image: '/images/small-bicycle.png',
    title: "Child's Diverge Comp",
    amount: '$14',
    includeFor: 'child',
    type: { value: 'Sell', sevirty: 'danger' },
  },
  {
    id: 4,
    image: '/images/basket.png',
    title: 'Folding Rear Bike Basket',
    amount: '$15',
    includeFor: 'Child',
    type: { value: 'Borrow', sevirty: 'success' },
  },
]

export default items
