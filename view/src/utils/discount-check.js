export const checkDiscountCodeConstraints = (discountObj, cartTotal, cartTotalItems, cartItems) => {
    if(!discountObj.isEnabled) {
        return false;
    }

    const currentDate = new Date();
    const discountStartDate = new Date(discountObj.validFrom);
    const discountEndDate = new Date(discountObj.validUntil);
    discountStartDate.setHours(0);
    discountStartDate.setMinutes(0);
    discountStartDate.setSeconds(0);
    discountEndDate.setHours(23);
    discountEndDate.setMinutes(59);
    discountEndDate.setSeconds(59);

    if(currentDate.getTime() < discountStartDate.getTime() || currentDate.getTime() > discountEndDate.getTime()) {
        return false;
    }

    if(discountObj.cartMinValue !== 'NA' && cartTotal < +discountObj.cartMinValue) {
        return false;
    }

    if(discountObj.cartMaxValue !== 'NA' && cartTotal > +discountObj.cartMaxValue) {
        return false;
    }

    if(discountObj.cartMinItems !== 'NA' && cartTotalItems < +discountObj.cartMinItems) {
        return false;
    }

    if(discountObj.cartMaxItems !== 'NA' && cartTotalItems > +discountObj.cartMaxItems) {
        return false;
    }

    if(discountObj.specificProductCode) {
        let isProductMatch = false;
        for (let index = 0; index < cartItems.length; index++) {
            const element = cartItems[index];
            if(element.productDetails.productCode === discountObj.specificProductCode) {
                isProductMatch = true;
            }   
        }

        if(!isProductMatch) {
            return false;
        }
    }

    return true;
};
