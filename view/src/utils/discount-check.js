export const checkDiscountCodeConstraints = (discountObj, cartTotal, cartItems) => {
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

    if(discountObj.cartMinItems !== 'NA' && cartItems < +discountObj.cartMinItems) {
        return false;
    }

    if(discountObj.cartMaxItems !== 'NA' && cartItems > +discountObj.cartMaxItems) {
        return false;
    }

    return true;
};