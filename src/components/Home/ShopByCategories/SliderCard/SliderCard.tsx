import Item from "./Types/Item";
import { Name } from "./Styles";
import { Card } from "../styles";
import { useRouter } from "next/router";

type Props = {
  item: Item;
};

const SliderCard = ({ item }: Props) => {
  const navigate = useRouter();

  const clickHandler = () => {
    const query = item.name.replaceAll(" ", "+").replaceAll("&", "%26");
    navigate.push({
      pathname: `/shop`,
      search: `?category=%2F${query}`,
    });
  };

  return (
    <Card onClick={clickHandler}>
      <img src={item.img} alt="category-img" />
      <Name>{item.name}</Name>
    </Card>
  );
};

export default SliderCard;
