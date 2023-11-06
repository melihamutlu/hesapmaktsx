import React, { useReducer } from "react";

type Props = {};

const HesapMakReducer = (props: Props) => {
  // const [state, dispatch] = useReducer(first, second, third)
  type DurumType = {
    prevValue: number;
    currentValue: number;
    operation: string;
    overwrite: boolean;
  };

  const [durum, dispatchHesapMak] = useReducer(
    (durum: DurumType, action: "topla" | "cikar"): DurumType => {
      let deger = 0;
      if (action === "cikar") {
        deger = durum.prevValue - durum.currentValue;
      }

      return {
        prevValue: 0,
        currentValue: deger,
        operation: "",
        overwrite: true,
      };
    },
    {
      prevValue: 0,
      currentValue: 0,
      operation: "",
      overwrite: true,
    }
  );

  return <div>HesapMakReducer</div>;
};

export default HesapMakReducer;
