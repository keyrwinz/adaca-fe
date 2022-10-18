import React, { useMemo, useReducer } from "react";
import "./CreateOrder.css";
import RadioInput from "../../components/RadioInput";
import { CreateOrderProps } from "./CreateOrder.props";

const isEmpty = (obj: object) => {
  return Object.values(obj).every(val => val === '')
}

const CreateOrderView = (props: CreateOrderProps) => {
  const { items, rules } = props;

  type SelectedItems = Record<number, string>;
  const [selectedItems, updateSelectedItems] = useReducer(
    (state: SelectedItems, newState: SelectedItems) => {
      // TODO: Merge selectedItems state with newState
      return { ...state, ...newState }
    },
    {
      0: "",
      1: "",
      2: "",
    } as SelectedItems
  );

  const isSelected = (id: string, groupIndex: number) => {
    return id === selectedItems[groupIndex];
  };

  const blacklist: number[] = useMemo(() => {
    // TODO: Create a blacklist based on rules and currently selected items
    const keys = Object.keys(selectedItems)
    return [...keys.map(((idx) => rules[selectedItems[+idx] as any]))]
      .flat()
      .filter(el => el !== undefined);
  }, [rules, selectedItems]);

  const isDisabled = (id: string) => {
    return blacklist.includes(+id);
  };

  const handleSelection = (value: string, groupIndex: number) => {
    updateSelectedItems({
      [groupIndex]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(selectedItems);
  };

  // TODO: If no items are available, show a "Loading..." text
  if (!items.length) {
    return <h3>Loading...</h3>
  }

  return (
    <div className="createOrder">
      <form onSubmit={handleSubmit}>
        {items.map((group, groupIndex) => {
          return (
            <div key={groupIndex}>
              {group.map((item) => {
                // TODO: Should render RadioInput component
                return (
                  <RadioInput
                    key={item.id}
                    label={item.value}
                    value={item.id}
                    onSelect={(value) => handleSelection(value, groupIndex)}
                    checked={isSelected(item.id, groupIndex)}
                    disabled={isDisabled(item.id)}
                  />
                )
              })}
              <br />
            </div>
          );
        })}
        <input type="submit" disabled={isEmpty(selectedItems)} />
      </form>
    </div>
  );
};

export default CreateOrderView;
