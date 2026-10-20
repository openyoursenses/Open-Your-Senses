
export async function onRequestGet({ env }) {
  const secret = env.SNIPCART_SECRET_API_KEY;

  if (!secret) {
    return Response.json(
      { error: "Stock checker is not configured." },
      { status: 500 }
    );
  }

  try {
    const credentials = btoa(`${secret}:`);

    const response = await fetch(
      "https://app.snipcart.com/api/products",
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Basic ${credentials}`
        }
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: "Snipcart stock could not be retrieved." },
        { status: 502 }
      );
    }

    const result = await response.json();
    const products = Array.isArray(result)
      ? result
      : result.items || result.products || [];

    return Response.json(
      {
        products: products.map(product => ({
          id: product.id,
            userDefinedId: product.userDefinedId,
  name: product.name,
          stock: product.stock,
          inventoryManagementMethod: product.inventoryManagementMethod,
          allowOutOfStockPurchases: product.allowOutOfStockPurchases
        }))
      },
      {
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  } catch {
    return Response.json(
      { error: "Unable to connect to Snipcart." },
      { status: 502 }
    );
  }
}
