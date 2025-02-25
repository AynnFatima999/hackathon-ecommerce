import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";


export const getAllCategories = async () => {
    const ALL_CATEGORIES_QUERY = defineQuery(
         `*[_type=="category"]
            | order(name asc)`
    );
try{
    // SANITY DATA FECTHING using sanityfetch
    const categories = await sanityFetch({
        query: ALL_CATEGORIES_QUERY,
    });

    // Return the products
    return categories.data || [];  
} catch (error){
    console.error("Error fetching all products", error);
    return [];
}

};
