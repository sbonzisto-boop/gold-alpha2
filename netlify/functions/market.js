exports.handler = async function () {
  try {
    const goldRes = await fetch(
      "https://api.twelvedata.com/price?symbol=XAU/USD&apikey=76d2c1e65a7a460e9c8bf9edb5c3ddd0"
    );
    const goldData = await goldRes.json();

    const dxyRes = await fetch(
      "https://api.twelvedata.com/quote?symbol=DXY&apikey=76d2c1e65a7a460e9c8bf9edb5c3ddd0"
    );
    const dxyData = await dxyRes.json();

    const yieldRes = await fetch(
      "https://api.stlouisfed.org/fred/series/observations?series_id=DGS10&api_key=ffb299f96e275642d1519cbad0b08ff7&file_type=json&sort_order=desc&limit=1"
    );
    const yieldData = await yieldRes.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        gold: parseFloat(goldData.price),
        dxy: parseFloat(dxyData.percent_change),
        yield10: parseFloat(yieldData.observations[0].value),
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server fetch failed" }),
    };
  }
};
