import "server-only";
import { defineLive } from "next-sanity";
import { client } from './client'


const token= "process.env.SANITY_API_READ_TOKEN";
if(!token) {
  throw new Error('The environment variable SANITY_API_READ_TOKEN is missing')
}
export const { sanityFetch, SanityLive } = defineLive({ 
  client, 
    serverToken: token,
    browserToken: token,
    fetchOptions: {
    revalidate: 0,
    },
});
