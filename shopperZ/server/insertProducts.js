const mongoose = require('mongoose');
const Product = require('./models/Product'); // 假設 Product 模型定義在 Product.js 文件中

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://mongodb:27017/kitchen-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const products = [
  {
    name: "不鏽鋼炒鍋",
    category: "炊具",
    price: 50,
    description: "高品質不鏽鋼炒鍋，適合各種烹飪需求。",
    images: ["/image/stainless_steel_wok_1.jpg", "/image/stainless_steel_wok_2.jpg", "/image/stainless_steel_wok_3.jpg", "/image/stainless_steel_wok_4.jpg"],
    variants: [
      {
        size: "28cm",
        stock: 20
      },
      {
        size: "32cm",
        stock: 15
      },
      {
        size: "36cm",
        stock: 24
      }
    ],
    ratings: []
  },
  {
    name: "陶瓷湯鍋",
    category: "炊具",
    price: 40,
    description: "耐高溫陶瓷湯鍋，適合煲湯和燉煮。",
    images: ["/image/ceramic_soup_pot_1.jpg", "/image/ceramic_soup_pot_2.jpg", "/image/ceramic_soup_pot_3.jpg", "/image/ceramic_soup_pot_4.jpg"],
    variants: [
      {
        size: "3L",
        stock: 10
      },
      {
        size: "5L",
        stock: 8
      },
      {
        size: "8L",
        stock: 12
      }
    ],
    ratings: []
  },
  {
    name: "鑄鐵煎鍋",
    category: "炊具",
    price: 60,
    description: "重型鑄鐵煎鍋，適合煎炸和烘烤。",
    images: ["/image/cast_iron_skillet_1.jpg", "/image/cast_iron_skillet_2.jpg", "/image/cast_iron_skillet_3.jpg", "/image/cast_iron_skillet_4.jpg"],
    variants: [
      {
        size: "24cm",
        stock: 12
      },
      {
        size: "28cm",
        stock: 10
      },
      {
        size: "32cm",
        stock: 15
      }
    ],
    ratings: []
  },
  {
    name: "FÄRGKLAR",
    category: "餐具",
    description: "碗, 光面 米黃色, 12 厘米",
    price: 49.9,
    images: ["/image/1009572_PE827668_S4.jpg"],
    variants: [
      {
        size: "12cm",
        stock: 15
      }
    ]
  },
  {
    name: "FÄRGKLAR",
    category: "餐具",
    description: "碗, 光面 米黃色, 16 厘米",
    price: 69.9,
    images: ["/image/1009572_PE827668_S4.jpg"],
    variants: [
      {
        size: "16cm",
        stock: 10
      }
    ]
  },
  {
    name: "0713134_PE729282_S4",
    category: "小电器",
    description: "刨磨器, 不銹鋼 長度:12 厘米,闊度:10 厘米,高度:20 厘米",
    price: 29.9,
    images: ["/image/0713134_PE729282_S4.jpg"],
    variants: [
      {
        size: "12cm",
        stock: 20
      }
    ]
  },
  {
    name: "IKEA 365+",
    category: "小电器",
    description: "刨磨器, 黑色 長度:26 厘米",
    price: 49.9,
    images: ["/image/0739774_PE741877_S4.jpg"],
    variants: [
      {
        size: "26cm",
        stock: 25
      }
    ]
  },
  {
    name: "UPPFYLLD",
    category: "小电器",
    description: "刨磨器連手柄, 鮮綠色, 30 厘米",
    price: 24.9,
    images: ["/image/1124823_PE875271_S4.jpg"],
    variants: [
      {
        size: "30cm",
        stock: 18
      }
    ]
  },
  {
    name: "DIREKT",
    category: "炊具",
    description: "廚具，3件套裝 , 黑色/不銹鋼 附意粉杓(33cm)、鑊鏟(33cm)及煮食夾(36cm)",
    price: 69.9,
    images: ["/image/0711739_PE728428_S4.jpg"],
    variants: [
      {
        size: "3件套裝",
        stock: 12
      }
    ]
  },
  {
    name: "GNARP",
    category: "炊具",
    description: "廚具，3件套裝 , 黑色 附鉗29cm、勺28cm及鏟31cm",
    price: 19.9,
    images: ["/image/0711742_PE728431_S4.jpg"],
    variants: [
      {
        size: "3件套裝",
        stock: 30
      }
    ]
  },
  {
    name: "FULLÄNDAD",
    category: "炊具",
    description: "廚具，5件套裝, 灰色 包括：鏟(32cm)、匙(33cm)、湯杓(29cm)、意粉杓(31cm)及攪拌器(28cm)",
    price: 39.9,
    images: ["/image/0711751_PE728440_S4.jpg"],
    variants: [
      {
        size: "5件套裝",
        stock: 8
      }
    ]
  },
  {
    name: "FULLÄNDAD",
    category: "炊具",
    description: "意粉杓, 灰色, 31 厘米",
    price: 9.9,
    images: ["/image/0712964_PE729191_S4.jpg"],
    variants: [
      {
        size: "31cm",
        stock: 50
      }
    ]
  },
  {
    name: "FULLÄNDAD",
    category: "炊具",
    description: "鏟, 灰色, 32 厘米",
    price: 9.9,
    images: ["/image/0712968_PE729195_S4.jpg"],
    variants: [
      {
        size: "32cm",
        stock: 45
      }
    ]
  },
  {
    name: "FULLÄNDAD",
    category: "炊具",
    description: "鉗子, 灰色 長度:28 厘米",
    price: 9.9,
    images: ["/image/0712962_PE729239_S4.jpg"],
    variants: [
      {
        size: "28cm",
        stock: 35
      }
    ]
  },
  {
    name: "FULLÄNDAD",
    category: "炊具",
    description: "湯杓, 灰色, 31 厘米",
    price: 9.9,
    images: ["/image/0712969_PE729196_S4.jpg"],
    variants: [
      {
        size: "31cm",
        stock: 40
      }
    ]
  },
  {
    name: "FINMAT",
    category: "炊具",
    description: "鑊鏟, 不銹鋼, 33 厘米",
    price: 69.9,
    images: ["/image/1172647_PE893414_S4.jpg"],
    variants: [
      {
        size: "33cm",
        stock: 22
      }
    ]
  },
  {
    name: "FINMAT",
    category: "炊具",
    description: "湯杓, 不銹鋼, 31 厘米",
    price: 69.9,
    images: ["/image/1172636_PE893411_S4.jpg"],
    variants: [
      {
        size: "31cm",
        stock: 18
      }
    ]
  },
  {
    name: "FINMAT",
    category: "炊具",
    description: "鉗子, 不銹鋼, 32 厘米",
    price: 69.9,
    images: ["/image/1172617_PE893403_S4.jpg"],
    variants: [
      {
        size: "32cm",
        stock: 20
      }
    ]
  },
  {
    name: "UPPFYLLD",
    category: "小电器",
    description: "刨磨器, 灰白色 長度:23厘米 闊度:4厘米 高度:1厘米",
    price: 19.9,
    images: ["/image/1109906_PE870280_S4.jpg"],
    variants: [
      {
        size: "23cm",
        stock: 25
      }
    ]
  },
  {
    name: "UPPFYLLD",
    category: "小电器",
    description: "削皮刀, 綠色 長度:17.5 厘米",
    price: 9.9,
    images: ["/image/1109927_PE870292_S4.jpg"],
    variants: [
      {
        size: "17.5cm",
        stock: 30
      }
    ]
  },
  {
    name: "IKEA 365+ HJÄLTE",
    category: "炊具",
    description: "炸杓, 不銹鋼/黑色 長度:34 厘米",
    price: 42.9,
    images: ["/image/0032266_PE257741_S4.jpg"],
    variants: [
      {
        size: "34cm",
        stock: 15
      }
    ]
  },
  {
    name: "UPPFYLLD",
    category: "小电器",
    description: "薄餅刀, 灰白色 長度:18 厘米",
    price: 9.9,
    images: ["/image/1109922_PE870283_S4.jpg"],
    variants: [
      {
        size: "18cm",
        stock: 40
      }
    ]
  },
  {
    name: "SLITSTARK",
    category: "炊具",
    description: "鑊鏟, 不銹鋼/胡桃木",
    price: 39.9,
    images: ["/image/0930659_PE790855_S4.jpg"],
    variants: [
      {
        size: "33cm",
        stock: 12
      }
    ]
  },
  {
    name: "ÄNDLIG",
    category: "刀具",
    description: "刀，3件套裝, 淺灰色/白色 附麵包刀23cm(總長35cm)、廚師刀15cm(總長28cm)及削皮刀10cm(總長20cm)",
    price: 79.9,
    images: ["/image/0210168_PE363627_S4.jpg"],
    variants: [
      {
        size: "3件套裝",
        stock: 10
      }
    ]
  },
  {
    name: "ÄNDLIG",
    category: "刀具",
    description: "菜刀, 淺灰色/白色, 18 厘米",
    price: 69.9,
    images: ["/image/0217043_PE373188_S4.jpg"],
    variants: [
      {
        size: "18cm",
        stock: 15
      }
    ]
  },
  {
    name: "ASPEKT",
    category: "刀具",
    description: "刀磨, 黑色",
    price: 59.9,
    images: ["/image/0711089_PE727974_S4.jpg"],
    variants: [
      {
        size: "20cm",
        stock: 20
      }
    ]
  },
  {
    name: "FÖRDUBBLA",
    category: "刀具",
    description: "刀，2件套裝, 灰色 附廚師刀(14cm，總長27cm)及削皮刀(7cm，總長17cm)",
    price: 29.9,
    images: ["/image/0710422_PE727545_S4.jpg"],
    variants: [
      {
        size: "2件套裝",
        stock: 25
      }
    ]
  },
  {
    name: "HAVSMAL",
    category: "收纳",
    description: "刀座, 褐紅色 高度:28 厘米 長度:22 厘米 闊度:16 厘米",
    price: 179.9,
    images: ["/image/1299990_PE936921_S4.jpg"],
    variants: [
      {
        size: "28cm",
        stock: 5
      }
    ]
  },
  {
    name: "HYVLA",
    category: "收纳",
    description: "刀座, 竹 可放5把刀",
    price: 89.9,
    images: ["/image/0343157_PE530287_S4.jpg"],
    variants: [
      {
        size: "5把刀",
        stock: 8
      }
    ]
  },
  {
    name: "IKEA 365+",
    category: "刀具",
    description: "廚師刀, 不銹鋼, 16 厘米",
    price: 179.9,
    images: ["/image/0710388_PE727516_S4.jpg"],
    variants: [
      {
        size: "16cm",
        stock: 10
      }
    ]
  },
  {
    name: "APTITLIG",
    category: "收纳",
    description: "切肉砧板, 竹, 45x36 厘米",
    price: 149.9,
    images: ["/image/0711717_PE728444_S4.jpg"],
    variants: [
      {
        size: "45x36cm",
        stock: 7
      }
    ]
  },
  {
    name: "IKEA 365+",
    category: "炊具",
    description: "平底鑊, 不銹鋼/易潔塗層, 28 厘米",
    price: 149.9,
    images: ["/image/1006161_PE825746_S4.jpg"],
    variants: [
      {
        size: "28cm",
        stock: 12
      }
    ]
  },
  {
    name: "VARDAGEN",
    category: "炊具",
    description: "烤鑊, 生鐵, 28x28 厘米",
    price: 299.9,
    images: ["/image/0770395_PE755505_S4.jpg"],
    variants: [
      {
        size: "28x28cm",
        stock: 6
      }
    ]
  }
];

Product.insertMany(products)
  .then(() => {
    console.log('Products inserted successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error inserting products:', err);
    mongoose.connection.close();
  });