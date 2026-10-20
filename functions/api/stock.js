
export async function onRequestGet({ env }) {
  const configured = Boolean(env.SNIPCART_SECRET_API_KEY);

  return new Response(
    JSON.stringify({
      configured,
      message: configured
        ? "Stock checker secret is configured."
        : "Stock checker secret is missing."
    }),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      }
    }
  );
}

