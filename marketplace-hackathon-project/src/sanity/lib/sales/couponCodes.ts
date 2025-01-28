export const COUPON_CODES = {
Newyear:"Newyear",
EidVibes: "Eid2k25",
Ramzan: "Ramzan2025"
} as const;

export type CouponCode = keyof typeof COUPON_CODES;