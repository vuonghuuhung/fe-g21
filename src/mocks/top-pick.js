const topPicks = [
  {
    _id: 1,
    imgSrc:
      "https://cdn.shopify.com/s/files/1/0001/5211/products/Spectrum-Monthly-Wall-Planner_5bd91bd5-9239-4905-8342-74b90c09ae46.gif?v=1673626261&width=720",
    title: "Spectrum Wall Planner",
    avgRate: 4.7,
    totalRates: 37,
    price: 48,
    categoryId: 1,
    options: {
      colors: [
        {
          colorName: "Vibrant",
          backgroundSrc:
            "https://cdn.shopify.com/s/files/1/0001/5211/files/Vibrant.png?v=1679422696",
        },
        {
          colorName: "Earthy",
          backgroundSrc:
            "https://cdn.shopify.com/s/files/1/0001/5211/files/Earthy.png?v=1679422738",
        },
        {
          colorName: "Grey",
          backgroundSrc:
            "https://cdn.shopify.com/s/files/1/0001/5211/files/Grey.png?v=1679422774",
        },
      ],
    },
  },
  {
    _id:2 ,
    imgSrc:
      "https://cdn.shopify.com/s/files/1/0001/5211/products/2022-gif_e2a31b68-29d9-42c5-954f-b8ea0a60c294.gif?v=1627498807&width=720",
    onHoverImg:
      "https://cdn.shopify.com/s/files/1/0001/5211/products/New-Stationery-lifestyle_5c00770b-2428-4f2a-8392-95fade20f28b.jpg?v=1627498808&width=720",
    title: "Spectrum Mini Planner",
    categoryId: 1,
    avgRate: 4.0,
    totalRates: 2,
    price: 24,
  },
  {
    _id:3,
    imgSrc:
      "https://cdn.shopify.com/s/files/1/0001/5211/products/PK-D-PDP-Wallet-Dome-ATF-04-2x.jpg?v=1666990517&width=720",
    onHoverImg:
      "https://cdn.shopify.com/s/files/1/0001/5211/products/PK-D-PDP-Wallet-Dome-ATF-05-2x.jpg?v=1666990517&width=720",
    title: "Dome Wallets",
    categoryId: 3,
    avgRate: 3.0,
    totalRates: 2,
    price: 38,
    options: {
      colors: [
        {
          colorName: "Emerald",
          backgroundCode: "0% 0% / contain rgb(15, 91, 32)",
        },
        {
          colorName: "Mint",
          backgroundCode: "0% 0% / contain rgb(169, 214, 158)",
        },
        {
          colorName: "Pink",
          backgroundCode: "0% 0% / contain rgb(242, 168, 196)",
        },
        {
          colorName: "Yellow",
          backgroundCode: "0% 0% / contain rgb(234, 202, 10)",
        },
        {
          colorName: "Tan",
          backgroundCode: "0% 0% / contain rgb(228, 129, 63)",
        },
        {
          colorName: "Black",
          backgroundCode: "0% 0% / contain rgb(16, 16, 16)",
        },
        {
          colorName: "Blue",
          backgroundCode: "0% 0% / contain blue",
          outOfStock: true,
        },
        {
          colorName: "Red",
          backgroundCode: "0% 0% / contain rgb(221, 19, 19)",
          outOfStock: true,
        },
      ],
    },
  },
  {
    _id:4,
    imgSrc:
      "https://cdn.shopify.com/s/files/1/0001/5211/products/PK-ConceptPlanner-LightBlue-001.jpg?v=1672867255&width=720",
    onHoverImg:
      "https://cdn.shopify.com/s/files/1/0001/5211/products/Concept-Planner-In-Use-03_c646cc66-95dc-4000-ae6f-5a82ff13d23e.jpg?v=1672867255&width=720",
    title: "Concept PLanner",
    categoryId: 1,
    avgRate: 5.0,
    totalRates: 13,
    price: 36,
    options: {
      colors: [
        {
          colorName: "Light Blue",
          backgroundCode: "0% 0% / contain rgb(157, 201, 223)",
        },
        {
          colorName: "Dark Green",
          backgroundCode: "0% 0% / contain rgb(22, 68, 32)",
        },
        {
          colorName: "Clay",
          backgroundCode: "0% 0% / contain rgb(174, 114, 81)",
        },
        {
          colorName: "Lavender",
          backgroundCode: "0% 0% / contain rgb(163, 138, 193)",
        },
        {
          colorName: "Midnight",
          backgroundSrc:
            "https://cdn.shopify.com/s/files/1/0001/5211/files/Midnight.png?v=1679423522",
        },
        {
          colorName: "Rose",
          backgroundCode: "0% 0% / contain rgb(238, 197, 213)",
        },
        {
          colorName: "Sand",
          backgroundCode: "0% 0% / contain rgb(200, 176, 163)",
        },
        {
          colorName: "Teal",
          backgroundCode: "0% 0% / contain teal",
        },
      ],
    },
  },
  {
    _id:5,
    imgSrc:
      "https://cdn.shopify.com/s/files/1/0001/5211/products/Poketo-Colorblock-Cap-Pens-01.jpg?v=1648843737&width=720",
    onHoverImg:
      "https://cdn.shopify.com/s/files/1/0001/5211/products/Poketo-Colorblock-Cap-Pens-003.jpg?v=1648844023&width=720",
    title: "Colorblock Cap Pen",
    categoryId: 2,
    avgRate: 5.0,
    totalRates: 3,
    price: "Starting at $10",
    options: {
      types: [
        "Coral Lavender",
        "Emerald Lemon",
        "Pink Mint",
        "Blue Peach",
      ],
    },
  },
  {
    _id:6,
    imgSrc:
      "https://cdn.shopify.com/s/files/1/0001/5211/products/Sticky-Roll-Checklist-01.jpg?v=1636585952&width=720",
    onHoverImg:
      "https://cdn.shopify.com/s/files/1/0001/5211/products/Sticky-Rolls-Checklist-02.jpg?v=1636585952&width=720",
    title: "Checklist Sticky Role",
    categoryId: 2,
    avgRate: 5.0,
    totalRates: 3,
    price: "Starting at $10",
    outOfStock: true,
  },
  {
    _id:7 ,
    imgSrc:
      "https://cdn.shopify.com/s/files/1/0001/5211/products/Groovy-Cups-S4.jpg?v=1623267800&width=720",
    onHoverImg:
      "https://cdn.shopify.com/s/files/1/0001/5211/products/double-wall-cups-002.jpg?v=1623267800&width=720",
    title: "Double Wall Groovy Cup",
    categoryId: 3,
    avgRate: 4.8,
    totalRates: 6,
    price: 28,
    options: {
      colors: [
        {
          colorName: "Blue",
          backgroundCode: "0% 0% / contain blue",
        },
        {
          colorName: "Amber",
          backgroundCode: "0% 0% / contain rgb(241, 149, 40)",
          outOfStock: true,
        },
        {
          colorName: "Green",
          backgroundCode: "0% 0% / contain rgb(75, 153, 92)",
          outOfStock: true,
        },
        {
          colorName: "Pink",
          backgroundCode: "0% 0% / contain rgb(242, 168, 196)",
          outOfStock: true,
        },
      ],
    },
  },
  {
    _id:8,
    imgSrc:
      "https://cdn.shopify.com/s/files/1/0001/5211/products/Poketo-Bamboo-Serving-Spoons-01.jpg?v=1648662914&width=720",
    onHoverImg:
      "https://cdn.shopify.com/s/files/1/0001/5211/products/Poketo-bamboo-serveware-plates.jpg?v=1649804214&width=720",
    title: "Bamboo Servers Set",
    categoryId: 3,
    avgRate: 0,
    totalRates: 0,
    price: 24,
  },
];

export default topPicks;
