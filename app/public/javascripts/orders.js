let orders = ((window) => {
    let order = {
        count: localStorage.getItem('countBooks'),
        orderList: new Array(),
        borrowBooks: new Array(),
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
                if(order.orderList.length == 3) {
                    return -1;
                }
                else {
                    if(order.count == 5) {
                        return -2;
                    }
                }
                order.orderList.push(id);
                order.count++;
            }
        }
        localStorage.setItem('countBooks', order.count);
        return order.count;
    }
    function getOrderList() {
        return order.orderList;
    }
    function getCount() {
        return order.count;
    }

    function addBorrowBook(idBook){
            order.borrowBooks.push(idBook);
            return 1;
    }



    return {
        toggleOrder,
        getOrderList,
        addBorrowBook
    }
})(window);