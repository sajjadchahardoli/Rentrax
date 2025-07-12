import { http, HttpResponse } from 'msw'

let taxes = JSON.parse(localStorage.getItem('msw-taxes')) || [
  { id: 1, name: 'Tax Name 1', amount: 11 },
  { id: 2, name: 'Tax Name 2', amount: 12 },
  { id: 3, name: 'Tax Name 3', amount: 13 },
]

let priceNames = JSON.parse(localStorage.getItem('msw-price-names')) || [
  'Price Name 1',
  'Price Name 2',
  'Price Name 3',
]

const persistTaxes = () => localStorage.setItem('msw-taxes', JSON.stringify(taxes))
const persistPriceNames = () => localStorage.setItem('msw-price-names', JSON.stringify(priceNames))

if (!localStorage.getItem('msw-taxes')) persistTaxes()
if (!localStorage.getItem('msw-price-names')) persistPriceNames()

export const handlers = [
  http.get('/taxes', () => {
    return HttpResponse.json(taxes)
  }),

  http.post('/taxes', async ({ request }) => {
    const newTax = await request.json()
    newTax.id = Date.now()
    taxes.push(newTax)
    persistTaxes()
    return HttpResponse.json(newTax, { status: 201 })
  }),

  http.put('/taxes/:id', async ({ request, params }) => {
    const id = parseInt(params.id)
    const updated = await request.json()
    taxes = taxes.map((t) => (t.id === id ? { ...t, ...updated, id } : t))
    persistTaxes()
    const updatedTax = taxes.find((t) => t.id === id)
    return HttpResponse.json(updatedTax)
  }),

  http.delete('/taxes/:id', ({ params }) => {
    const id = parseInt(params.id)
    taxes = taxes.filter((t) => t.id !== id)
    persistTaxes()
    return new HttpResponse(null, { status: 204 })
  }),

  http.get('/price-names', () => {
    return HttpResponse.json(priceNames)
  }),

  http.post('/price-names', async ({ request }) => {
    const { name } = await request.json()
    priceNames.push(name)
    persistPriceNames()
    return HttpResponse.json(name, { status: 201 })
  }),

  http.put('/price-names/:oldName', async ({ request, params }) => {
    const { oldName } = params

    const { name: newName } = await request.json()

    const index = priceNames.findIndex((name) => name === oldName)

    if (index !== -1) {
      priceNames[index] = newName
      persistPriceNames()
      return HttpResponse.json({ name: newName })
    }

    return HttpResponse.json({ message: 'Name not found' }, { status: 404 })
  }),

  http.delete('/price-names/:name', ({ params }) => {
    const nameToDelete = params.name
    priceNames = priceNames.filter((name) => name !== nameToDelete)
    persistPriceNames()
    return new HttpResponse(null, { status: 204 })
  }),
]
