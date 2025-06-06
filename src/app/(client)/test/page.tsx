import React from "react";

const page = () => {
  const customer = [
    [1, 2, 3],
    [3, 2, 1],
  ];

  function richCustomer(customer: number[][]) {
    let maxWealth = 0;
    for (let i = 0; i < customer.length; i++) {
      const sum = customer[i].reduce((Item, total) => Item + total, 0);
      maxWealth = Math.max(maxWealth, sum);
    }
    return maxWealth;
  }
  console.log(richCustomer(customer));

  return <div>page</div>;
};

export default page;
