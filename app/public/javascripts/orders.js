let orders = ((window) => {
    let order = {
        count: 0,
        orderList: new Array(),
    }

    function toggleOrder(id) {
        if(order.orderList.count == 0){
            order.orderList.push(id);
            order.count++;
        }
        else {
            let value = order.orderList.indexOf(id);
            if(value != -1) {
                order.orderList.splice(value,1);
                order.count--;
            }
            else {
                if(order.count == 3) {
                    return -1;
                }
                order.orderList.push(id);
                order.count++;
            }
        }
        return order.count;
    }



    return {
        toggleOrder,
    }
})(window);