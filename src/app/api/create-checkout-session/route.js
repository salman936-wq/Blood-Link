import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount, email } = await req.json();

    const sessionData = {
      mode: "payment",

      metadata: {
        email,
        amount: amount.toString(),
      },

      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: "Support BloodLink",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.PUBLIC_URL}/success`,
      cancel_url: `${process.env.PUBLIC_URL}/cancel`,
    };

    // Email থাকলে শুধু তখনই যোগ হবে
    if (email) {
      sessionData.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionData);

    return Response.json({
      url: session.url,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}