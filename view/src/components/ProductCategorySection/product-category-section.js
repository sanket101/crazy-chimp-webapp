import React, { useRef, useState } from "react";
import { PRODUCT_NAME } from "../../constants/product-constants";
import styles from './product-category-section.style';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Button, Select, MenuItem } from '@material-ui/core';
import HstInfluencerVideo from "../../assets/hst_influencer_video.mp4";
import HstInfluencer from "../../assets/hst_influencer.jpg";
import HoodiesInfluencerVideo from "../../assets/hod_influencer_video.mp4";
import HoodiesInfluencer from "../../assets/hod_influencer.png";
import SwtsInfluencerVideo from "../../assets/swts_influencer_video.mp4";
import SwtsInfluencer from "../../assets/swts_influencer.png";
import OstInfluencerVideo from "../../assets/ost_influencer_video.mp4";
import OstInfluencer from "../../assets/ost_influencer.jpg";
import { Rerousel } from "rerousel";

const productCategoryContent = {
    HST: {
        heading: "Half Sleeves T-shirt",
        description: "100% combed cotton with single jersey to make it wrinkle-free and smooth. Doesn’t let you feel hot! 180 gsm bio-washed material for a soft and silky fabric finish, along with superior colour brightness. Special Inks are used here to make sure your printed designs are stretch resistant. We use one of the finest DTF printing method to make designs durable.",
        buttonText: "Explore similar products",
        images: [
            {
                alt: "Half Sleeve T-shirt Influencer",
                img : HstInfluencerVideo,
                type: "video"
            },
            {
                alt: "Anime Half Sleeve T-shirt",
                img : HstInfluencer
            },
        ]
    },
    HOODIES: {
        heading: "Hoodies",
        description: "It has a crew neck, and it’s made from 100% combed cotton with single jersey to make it wrinkle-free and smooth. gives the sweatshirt a soft, comfortable feel. 320 GSM bio-washed fabric for a soft and silky fabric finish, along with superior colour brightness. Unisex Hoodie pattern with a regular fit. Special Inks are used here to make sure your printed designs are stretch resistant. We use one of the finest DTF printing method to make designs durable.",
        buttonText: "Explore similar products",
        images: [
            {
                alt: "Hoodies Influencer",
                img : HoodiesInfluencerVideo,
                type: "video"
            },
            {
                alt: "Anime Hoodies",
                img : HoodiesInfluencer
            },
        ]
    },
    SWTS: {
        heading: "Sweatshirts",
        description: "It has a crew neck, and it’s made from 100% combed cotton with single jersey to make it wrinkle-free and smooth. gives the sweatshirt a soft, comfortable feel. 320 GSM bio-washed fabric for a soft and silky fabric finish, along with superior colour brightness. Unisex sweatshirt pattern with a regular fit. Special Inks are used here to make sure your printed designs are stretch resistant. We use one of the finest DTF printing method to make designs durable.",
        buttonText: "Explore similar products",
        images: [
            {
                alt: "Sweatshirt Influencer",
                img : SwtsInfluencerVideo,
                type: "video"
            },
            {
                alt: "Anime Hoodies",
                img : SwtsInfluencer
            },
        ]
    },
    OST: {
        heading: "Oversized T-shirts",
        description: "100% combed cotton with single jersey to make it wrinkle-free and smooth. Doesn’t let you feel hot! 200 gsm bio-washed material for a soft and silky fabric finish, along with superior colour brightness. Special Inks are used here to make sure your printed designs are stretch resistant. We use one of the finest DTF printing method to make designs durable.",
        buttonText: "Explore similar products",
        images: [
            {
                alt: "OST Influencer",
                img : OstInfluencerVideo,
                type: "video"
            },
            {
                alt: "Anime Hoodies",
                img : OstInfluencer
            },
        ]
    }
};

const ProductCategorySection = (props) => {
    const productCategories = Object.keys(PRODUCT_NAME).filter(item => item !== "FST");
    const [activeProductKey, setActiveProductKey] = useState(productCategories[0]);
    const { classes } = props;
    const categoryRef = useRef(null);
    return (
        <>
            <div className={classes.hideForMobile}>
                <div className={classes.productCategorySectionWrapper}>
                    <div className={classes.buttonSectionWrapper}>
                        {productCategories.map(item => {
                            return <Button variant="contained" className={item === activeProductKey ? classes.productCategoriesButtonActive : classes.productCategoriesButton} onClick={() => setActiveProductKey(item)}>{PRODUCT_NAME[item]}</Button>;
                        })}
                    </div>
                    <div className={classes.textContentWrapper}>
                        <Typography variant="h6">{productCategoryContent[activeProductKey].heading}</Typography>
                        <Typography variant="caption">{productCategoryContent[activeProductKey].description}</Typography>
                        <br />
                        <Button variant="contained" className={classes.shopNowButton} onClick={() => props.onClickShopNow(activeProductKey)}>{productCategoryContent[activeProductKey].buttonText}</Button>
                    </div>
                    <div className={classes.imageSectionWrapper}>
                        <div style={{marginRight: "10px"}}>
                            {productCategoryContent[activeProductKey].images[0]?.type === "video" ? <video src={productCategoryContent[activeProductKey].images[0].img} width="300px" loop autoplay='' muted /> : <img src={productCategoryContent[activeProductKey].images[0].img} alt={productCategoryContent[activeProductKey].images[0].alt} width={"300px"}/> }
                        </div>
                        <div>
                            <img src={productCategoryContent[activeProductKey].images[1].img} alt={productCategoryContent[activeProductKey].images[1].alt} width="300px" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.hideForDesktop}>
                <div className={classes.productCategorySectionWrapperForMobile}>
                    <Typography variant="h4" className={classes.headerMargin}>Top Categories</Typography>
                    {/* <Button variant="contained" className={'HST' === activeProductKey ? classes.productCategoriesButtonActive : classes.productCategoriesButton} onClick={() => setActiveProductKey('HST')}>{PRODUCT_NAME['HST']}</Button>   */}
                    {/* <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={activeProductKey}
                        label="Product Type"
                        onChange={(event) => setActiveProductKey(event.target.value)}
                    >
                        {productCategories.map(item => {
                            return (
                                <MenuItem value={item}>{PRODUCT_NAME[item]}</MenuItem>
                            )
                        })}
                    </Select> */}
                     <Rerousel itemRef={categoryRef} interval={10000}>
                        {productCategories.map((productKey, index) => {
                                return <div key={index} ref={categoryRef} style={{width: "100%"}}>
                                    <Button variant="contained" className={classes.productCategoriesButtonActive}>{PRODUCT_NAME[productKey]}</Button>
                                    <div className={classes.influencerImgWrapper}>
                                        {productCategoryContent[productKey].images[0]?.type === "video" ? <video src={productCategoryContent[productKey].images[0].img} style={{height: '100vh'}} loop autoplay='' muted /> : <img src={productCategoryContent[productKey].images[0].img} width="100%" alt={productCategoryContent[productKey].images[0].alt} />}
                                    </div>
                                    <Button variant="contained" className={classes.productCategoriesButtonActive} onClick={() => props.onClickShopNow(productKey)}>Explore similar products</Button>
                                </div>;
                            })
                        }
                     </Rerousel>
                </div>
            </div>
        </>
    );
};

export default (withStyles(styles)(ProductCategorySection));