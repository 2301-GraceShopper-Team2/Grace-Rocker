"use strict";

const {
  db,
  models: { User, Product, Order, Order_Products },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      email: "cody@gmail.com",
      isAdmin: false,
    }),
    User.create({
      username: "murphy",
      password: "123",
      email: "murphy@gmail.com",
      isAdmin: false,
    }),
    User.create({
      username: "Kuame Mullen",
      email: "nunc@aol.couk",
      password: "KPF22DIG3IJ",
      isAdmin: false,
    }),
    User.create({
      username: "Noah Hill",
      email: "consectetuer@aol.net",
      password: "CDY85SWF2JX",
      isAdmin: true,
    }),
    User.create({
      username: "Josephine Rodgers",
      email: "posuere.vulputate.lacus@outlook.com",
      password: "BQQ77QPN8DQ",
      isAdmin: false,
    }),
    User.create({
      username: "Hedy Norris",
      email: "congue.a@google.couk",
      password: "IAE81SPK4OY",
      isAdmin: false,
    }),
    User.create({
      username: "admin",
      email: "bigboss@money.com",
      password: "admin",
      isAdmin: true,
    }),
    User.create({
      username: "user",
      email: "underling@pennies.org",
      password: "user",
      isAdmin: false,
    }),
    User.create({
      username: "Steel Lopez",
      email: "orci.ut@google.couk",
      password: "JEH02GZV6UH",
      isAdmin: false,
    }),
    User.create({
      username: "Jimmy Page",
      email: "jpage@zeppelin.com",
      password: "stairwaytoheaven",
      isAdmin: false,
    }),
    User.create({
      username: "Robert Plant",
      email: "rplant@zeppelin.com",
      password: "sinceibeenlovingyou",
      isAdmin: false,
    }),
    User.create({
      username: "John Paul Jones",
      email: "jpjones@zeppelin.com",
      password: "noquarter",
      isAdmin: false,
    }),
    User.create({
      username: "John Bonham",
      email: "jbonham@zeppelin.com",
      password: "whentheleveebreaks",
      isAdmin: false,
    }),
    User.create({
      username: "Wayne Coyne",
      email: "wcoyne@flaminglips.com",
      password: "yoshimibattles",
      isAdmin: false,
    }),
    //6 more till 20
  ]);
  const products = await Promise.all([
    Product.create({
      name: "SE Silver Sky",
      description:
        "The PRS SE Silver Sky is a familiar iteration of the original Silver Sky model that was first introduced with John Mayer in 2018. This workhorse guitar provides ample tone and playability in four distinct colors, delivering looks, feel, and sound.",
      SKU: "FKI16UHI",
      price: 719,
      imageURL:
        "https://images.reverb.com/image/upload/s--hklEfxGR--/f_auto,t_large/v1680543173/qms5abrrecuvwpe90jtl.jpg",
    }),
    Product.create({
      name: "Fender American Professional II Stratocaster Maple - Miami Blue Demo",
      description:
        "Fender's reimagined American Pro II series brings over features from the popular American Ultra line, including a truly ergonomic neck heel. The American Pro II Strat features V-Mod II single coils, a 2-point tremolo, and a push-push tone pot that can add the neck pickup at the press of a button. For the Sienna Sunburst or Roasted Pine finishes, the body is a new tonewood from Fender, roasted pine, instead of alder.",
      SKU: "AEN6M34I",
      price: 1529.99,
      imageURL:
        "https://images.reverb.com/image/upload/s--AvLx0dLO--/a_0/f_auto,t_supersize/v1679610894/dchjdnm6fkfxlhvnc36o.jpg",
    }),
    Product.create({
      name: "Fender Squier Series Standard Stratocaster - Black",
      description:
        "1993 Model - Very Good Condition - Made In Mexico - Rosewood Fingerboard - Includes Gig Bag.",
      SKU: "FKI16UHI",
      price: 359.99,
      imageURL:
        "https://images.reverb.com/image/upload/s--_Td7qebJ--/f_auto,t_supersize/v1681774956/l4yevhz731500skqxegs.jpg",
    }),
    Product.create({
      name: "Knaggs Severn XF T2 w/ OHSC 2019 - Hot Pink, Gotoh Floyd Rose, Bare Knuckle Pickups",
      description:
        "This is a used guitar. It has been tested and gone over by the experts at our shop. When a guitar is purchased from us it undergoes a final setup before shipping to ensure it's playing optimally. It is then packed with care and shipped to your door! If you have any questions about this or any other piece of gear we have, please let us know and we'll be happy to help!",
      SKU: "WNPF3Y76",
      price: 3499,
      imageURL:
        "https://images.reverb.com/image/upload/s--KN4QraB3--/a_0/f_auto,t_supersize/v1681856287/tmkfdhul8ixdnqyrzrkd.jpg",
    }),
    Product.create({
      name: "Martin D-28 Acoustic Guitar",
      description:
        "Perhaps the most iconic of all dreadnought guitars, the Martin D-28 has seen some changes over its long line of production, but by and large remains very true to the original design that drew in players like Paul McCartney, Neil Young, and Elvis Presley to name a few. Its large, but controlled low-end response fills any room while the balanced and detailed highs provide a shimmer that lands the D-28 squarely in benchmark territory. Here, you'll find our mammoth collection of new and used D-28s from 1990 to the present day, with dead-mint examples and even a few serious deals on some with minor play wear.",
      SKU: "LSNW15ET",
      price: 2629,
      imageURL:
        "https://images.reverb.com/image/upload/s--ppXW1QJx--/f_auto,t_supersize/v1490388226/vukhkp1bcgszqzyhibll.jpg",
    }),
    Product.create({
      name: "Gibson Hummingbird Mahogany AG Chery Sunburst 2018",
      description:
        "An interesting take on the Gibson Hummingbird, this Avant Garde model features a cutaway body with mahogany for the back & sides. The top is finished in a brilliant Cherry Sunburst & fitted with an active pickup so it's stage-ready. Pro set up included.",
      SKU: "FNCW390D",
      price: 1999,
      imageURL:
        "https://images.reverb.com/image/upload/s--d-0Z2fBB--/a_0/f_auto,t_supersize/v1681240460/gstyzsrkqhzkk9ydiith.jpg",
    }),
    Product.create({
      name: "Ibanez TOD10N Tim Henson Signature Acoustic-Electric Classical Guitar",
      description:
        "As an artist, Tim Henson is always trying to update, invigorate and reinvent his band's image. He has taken that same approach with the TOD10N, his signature nylon string electric guitar. The TOD's most striking aesthetic feature may be the fingerboard inlay design, which Tim has dubbed as the ‘Tree of Death’. The name and the design are both nods to the iconic Ibanez ‘Tree of Life’ inlay design, but with a twist.",
      SKU: "JKA35SQ",
      price: 699.99,
      imageURL:
        "https://images.reverb.com/image/upload/s--z1JMQymC--/a_0/f_auto,t_supersize/v1665773786/k8zomj8tqxrtihbvugud.jpg",
    }),
    Product.create({
      name: "Peavy Predator Plus",
      description:
        "PEAVEY produced the PREDATOR PLUS between 1999 and 2002. The design is a combination of Stratocaster and Wolfgang.  The Peavey Predator Plus has a short 3-on-a-side headstock with ergonomic tuner placement and straight string pull. To balance up the reduced neck weight, the solid poplar body is styled for better ergonomics and balance by reducing the length of the lower body horn.",
      SKU: "FHR33016",
      price: 299.99,
    }),
    Product.create({
      name: "Alvarez AF66CESHB Folk Acoustic-Electric Guitar Shadow Burst",
      description:
        "Features a solid A+ western red cedar top mahogany back and sides with a high gloss finish. Pickups are rocking Sys250 3-band EQ with a tuner. Features state-of-the-art FST2M forward shifted scalloped bracing.",
      SKU: "HH7J39F",
      price: 549.99,
    }),
    Product.create({
      name: "Jerry Cantrell Les Paul Custom Prophecy",
      description:
        "Made to the Alice in Chains guitarist's specifications. It represents the perfect blend of modern and traditional features. It is equipped with a double-bound mahogany body with a maple cap and Ultra Modern weight relief for tone and comfort.",
      SKU: "7AI9RO3C",
      price: 1149.0,
    }),
    //10 more till 20
  ]);
  const orders = await Promise.all([
    Order.create({
      isFulfilled: true,
      userId: 1,
    }),
    Order.create({
      isFulfilled: false,
      userId: 1,
    }),
    Order.create({
      isFulfilled: false,
      userId: 3,
    }),
    Order.create({
      isFulfilled: false,
      userId: 4,
    }),
    Order.create({
      isFulfilled: false,
      userId: 5,
    }),
    Order.create({
      isFulfilled: false,
      userId: 6,
    }),
    Order.create({
      isFulfilled: false,
      userId: 7,
    }),
    Order.create({
      isFulfilled: true,
      userId: 7,
    }),
    Order.create({
      isFulfilled: false,
      userId: 8,
    }),
    Order.create({
      isFulfilled: true,
      userId: 8,
    }),
    Order.create({
      isFulfilled: false,
      userId: 9,
    }),
    Order.create({
      isFulfilled: false,
      userId: 10,
    }),
    Order.create({
      isFulfilled: false,
      userId: 11,
    }),
    Order.create({
      isFulfilled: false,
      userId: 12,
    }),
    Order.create({
      isFulfilled: false,
      userId: 13,
    }),
    Order.create({
      isFulfilled: false,
      userId: 14,
    }),
    Order.create({
      isFulfilled: false,
      userId: 2,
    }),
    Order.create({
      isFulfilled: true,
      userId: 2,
    }),
  ]);
  const orderProducts = await Promise.all([
    Order_Products.create({
      quantity: 1,
      orderId: 1,
      productId: 1,
    }),
    Order_Products.create({
      quantity: 2,
      orderId: 2,
      productId: 2,
    }),
    Order_Products.create({
      quantity: 3,
      orderId: 3,
      productId: 3,
    }),
    Order_Products.create({
      quantity: 1,
      orderId: 4,
      productId: 4,
    }),
    Order_Products.create({
      quantity: 2,
      orderId: 1,
      productId: 5,
    }),
    Order_Products.create({
      quantity: 1,
      orderId: 2,
      productId: 7,
    }),
    Order_Products.create({
      quantity: 1,
      orderId: 5,
      productId: 5,
    }),
    Order_Products.create({
      quantity: 1,
      orderId: 6,
      productId: 6,
    }),
    Order_Products.create({
      quantity: 1,
      orderId: 7,
      productId: 7,
    }),
    Order_Products.create({
      quantity: 1,
      orderId: 8,
      productId: 8,
    }),
    Order_Products.create({
      quantity: 1,
      orderId: 9,
      productId: 9,
    }),
    Order_Products.create({
      quantity: 1,
      orderId: 10,
      productId: 10,
    }),
    Order_Products.create({
      quantity: 2,
      orderId: 11,
      productId: 2,
    }),
    Order_Products.create({
      quantity: 2,
      orderId: 12,
      productId: 2,
    }),
    Order_Products.create({
      quantity: 2,
      orderId: 13,
      productId: 2,
    }),
    Order_Products.create({
      quantity: 2,
      orderId: 14,
      productId: 2,
    }),
    Order_Products.create({
      quantity: 2,
      orderId: 15,
      productId: 2,
    }),
    Order_Products.create({
      quantity: 2,
      orderId: 16,
      productId: 2,
    }),
    Order_Products.create({
      quantity: 1,
      orderId: 3,
      productId: 9,
    }),
    Order_Products.create({
      quantity: 1,
      orderId: 4,
      productId: 8,
    }),
    Order_Products.create({
      quantity: 1,
      orderId: 5,
      productId: 7,
    }),
    Order_Products.create({
      quantity: 1,
      orderId: 6,
      productId: 5,
    }),
    Order_Products.create({
      quantity: 1,
      orderId: 17,
      productId: 5,
    }),
    Order_Products.create({
      quantity: 1,
      orderId: 18,
      productId: 5,
    }),
  ]);
  console.log(
    `seeded ${users.length} users, ${products.length} products, ${orders.length} orders, and ${orderProducts} orders of products`,
  );
  console.log(`seeded successfully`);
  return {
    users,
    products,
    orders,
    orderProducts,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
