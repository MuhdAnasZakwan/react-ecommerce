import { toast } from "sonner";

export function AddToCart(product) {
    const cartsLocalStorage = localStorage.getItem("carts");
    const carts = cartsLocalStorage ? JSON.parse(cartsLocalStorage) : [];

    let updatedCarts;

    const existingCart = carts.find((cart) => {
        if (product._id === cart.id) {
            return true;
        } else {
            return false;
        }
    })

    if (existingCart) {
        updatedCarts = carts.map((cart) => cart.id === product._id ? {...cart, quantity: cart.quantity + 1} : cart);
    } else {
        updatedCarts = [
            ...carts,
            {
                id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                quantity: 1,
            },
        ];
    }

    localStorage.setItem("carts", JSON.stringify(updatedCarts));
    toast("Product added to cart");
}

export function getCart() {}

export function updateCart(cart) {}

export function deleteItemFromCart(id) {
    const cartsLocalStorage = localStorage.getItem("carts");
    const carts = cartsLocalStorage ? JSON.parse(cartsLocalStorage) : [];

    const confirmDelete = confirm("Are you sure you want to delete this product from your cart");
    if (confirmDelete) {
        const updatedCarts = carts.filter((cart) => cart.id !== id)
        localStorage.setItem("carts", JSON.stringify(updatedCarts));
        toast("Product deleted from cart");
    }
}
