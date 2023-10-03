let shopItemsData = [
  {
    id: "jfhgbvnscs",
    name: "Casual Shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-1.jpg",
  },
  {
    id: "ioytrhndcv",
    name: "Office Shirt",
    price: 100,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-2.jpg",
  },
  {
    id: "wuefbncxbsn",
    name: "T Shirt",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-3.jpg",
  },
  {
    id: "thyfhcbcv",
    name: "Mens Suit",
    price: 300,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-4.jpg",
  },
];
let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateItem = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      let search = basket.find((x) => x.id === item.id) || [];
      return `<div id="product-id-${item.id}" class="item">
        <img width="250" class="img" src=${item.img} alt="img1">
        <div class="details">
            <h3>${item.name}</h3>
            <p>This is a perfect product for you! Please add the item in your cart if you wish to..</p>
            <div class="price-quant">
                <h2>${item.price}$</h2>
                <div class="buttons">
                    <i onclick="decrement(${item.id})" class="bi bi-dash"></i>  
                    <div id=${item.id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
                    <i onclick="increment(${item.id})" class="bi bi-plus"></i>
                </div>
            </div>
        </div>
    </div>`;
    })
    .join(""));
};
generateItem();

let increment = (i) => {
  let search = basket.find((x) => x.id === i.id);
  if (search === undefined) {
    basket.push({
      id: i.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  update(i.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (i) => {
  let search = basket.find((x) => x.id === i.id);
  if (search === undefined) {
    return;
  } else if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }
  update(i.id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (count) => {
  let search = basket.find((x) => x.id === count);
  document.getElementById(count).innerHTML = search.item;
  calculate();
};

let calculate = () => {
  let cartIcon = document.getElementById("cart-amount");
  let baskets = basket.map((num) => num.item);
  let total = baskets.reduce((acc, cv) => acc + cv, 0);
  cartIcon.innerHTML = total;
};
calculate();
