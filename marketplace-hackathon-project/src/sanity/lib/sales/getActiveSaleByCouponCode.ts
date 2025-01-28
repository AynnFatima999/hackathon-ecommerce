import { defineQuery } from "next-sanity";
import { CouponCode } from "./couponCodes";
import { sanityFetch } from "../live";

export const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {
  const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
     *[
       _type == "sale" 
       && isActive == true 
      && couponCode == $couponCode
    ] | order(validFrom desc)[0]
    `);
   

  try {
    // Fetch the data from Sanity
    const activeSale = await sanityFetch({
      query: ACTIVE_SALE_BY_COUPON_QUERY,
      params: {
        couponCode, // Pass couponCode as a query parameter
      },
    });

    
    return activeSale ? activeSale.data : null;
  } catch (error) {
    // Log error for debugging
    console.error("Error fetching active sale by coupon code:", error);
    return null;
  }
};
