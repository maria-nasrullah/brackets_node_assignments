//adding dependencies
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { SUBSRIPTION_AMOUNT } = require("../../config/constants");

const stripeCustomer = async (user) => {
  //getting customer Id from stripe
  const customer = await stripe.customers.create({
    description:
      "My First Test Customer (created for API docs at https://www.stripe.com/docs/api)",
  });
  user.stripeCustomerId = customer.id;

  //getting token from stripe
  const token = await stripe.tokens.create({
    card: {
      number: "4242424242424242",
      exp_month: 12,
      exp_year: 2023,
      cvc: "314",
    },
  });
  user.stripeTokenId = token.id;

  //getting card id from stripe
  const card = await stripe.customers.createSource(customer.id, {
    source: token.id,
  });
  user.stripeCardId = card.id;

  return user;
};

const stripeSubscription = async (user) => {
  //getting product id from stripe
  const product = await stripe.products.create({
    name: "management system",
  });
  user.stripeProductId = product.id;

  //getting price id from stripe
  const price = await stripe.prices.create({
    unit_amount: SUBSRIPTION_AMOUNT[0],
    currency: "usd",
    recurring: { interval: "month" },
    product: user.stripeProductId,
  });
  user.stripePriceId = price.id;
  const stripePrice = price.unit_amount;

  //getting subscription id from stripe
  const subscription = await stripe.subscriptions.create({
    customer: user.stripeCustomerId,
    items: [{ price: user.stripePriceId }],
  });
  user.stripeSubscriptionId = subscription.id;

  return { user, stripePrice };
};

module.exports = { stripeCustomer, stripeSubscription };
