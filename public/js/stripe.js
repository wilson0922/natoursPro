import axios from 'axios'
import { showAlert } from './alerts'
const Stripe = require('stripe')
const stripe = Stripe(
  'pk_test_51N60JzCKQnZMBL36F2mHQmTiuK1jDJTFklP6REPVNSD4e5q5mAAXqHsDPwGnZQr0IJd4d82q7s5X7iokObb1Hmcs00p9tdsbOj'
)

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session
    const session = await axios(`/bookings/checkout-session/${tourId}`)
    // 2) Create checkout form + charge credit card
    window.location.assign(session.data.session.url)
  } catch (err) {
    console.log(err)
    showAlert('err', err)
  }
}
