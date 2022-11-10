// TODO: create a component that displays a single bakery item
import "../App.css";

//  props name, description, price, image, updateCart
export default function BakeryItem(props) {
  return (
    <div className="BakeryItem">
      <img src={props.image} alt={props.description} />
      <div className="BakeryDescription">
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <p>{props.price}</p>
        <button onClick={() => props.updateCart(props.name, props.price)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
