import { useEffect, useState } from "react";
import { getMenuItems, GetMenuItemsResponse } from "../../services/menu";
import {
  CreateOrderPrivateProps,
  CreateOrderPublicProps,
} from "./CreateOrder.props";
import CreateOrderView from "./CreateOrder.view";

const CreateOrder = (props: CreateOrderPublicProps) => {
  const [menuItems, setMenuItems] = useState<GetMenuItemsResponse["items"]>([])
  const [menuRules, setMenuRules] = useState<GetMenuItemsResponse["rules"]>([])

  useEffect(() => {
    // TODO: Fetch menu data
    const fetchData = async () => {
      const { items, rules } = await getMenuItems()
      setMenuItems(items)
      setMenuRules(rules)
    };

    fetchData();
  }, []);

  const generatedProps: CreateOrderPrivateProps = {
    items: menuItems,
    rules: menuRules,
  };

  return <CreateOrderView {...generatedProps} />;
};

export default CreateOrder;
