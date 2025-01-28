import { client } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import  ImageUrlBuilder from "@sanity/image-url";

const builder = ImageUrlBuilder(client);
 
export function imageUrl(source : SanityImageSource ){
return builder.image(source)
}