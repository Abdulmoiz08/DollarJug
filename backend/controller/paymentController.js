
const Stripe = require('stripe');
const Product = require('../model/Product');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe Checkout Session
const createdOrder = async (req, res) => {
  try {
    const { items, address } = req.body;

    // Validate cart
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: 'Cart items are required',
      });
    }

    // Fetch actual products from MongoDB
    const lineItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);

        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        const qty = Number(item.qty);

        if (!Number.isInteger(qty) || qty <= 0) {
          throw new Error('Invalid product quantity');
        }

        if (qty > product.stock) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }

        return {
          price_data: {
            currency: 'pkr',
            product_data: {
              name: product.name,
            },
            unit_amount: Math.round(Number(product.price) * 100),
          },
          quantity: qty,
        };
      })
    );

    // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
  mode: 'payment',

  line_items: lineItems,

  success_url: `${process.env.FRONTEND_URL}/ordersuccess?session_id={CHECKOUT_SESSION_ID}`,

  cancel_url: `${process.env.FRONTEND_URL}/checkout`,
});

    res.status(200).json({
      success: true,
      id: session.id,
      url: session.url,
    });

  } catch (error) {
    console.error('Stripe Checkout Error:', error);

    res.status(500).json({
      message: error.message || 'Unable to create checkout session',
    });
  }
};


// Verify Stripe Payment
const verifyPayment = async (req, res) => {
  try {
    const { session_id } = req.body;

    if (!session_id) {
      return res.status(400).json({
        message: 'Session ID is required',
      });
    }

    const session =
      await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Payment not completed',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: session.payment_intent,
    });

  } catch (error) {
    console.error('Stripe Verification Error:', error);

    res.status(500).json({
      message: 'Payment verification failed',
    });
  }
};

module.exports = {
  createdOrder,
  verifyPayment,
};
