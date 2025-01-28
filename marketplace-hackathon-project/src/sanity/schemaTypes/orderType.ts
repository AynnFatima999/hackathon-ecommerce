import { defineArrayMember, defineField, defineType } from 'sanity';
import { BasketIcon } from '@sanity/icons';


export const orderType = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'stripeCheckoutSessionId',
      title: 'Stripe Checkout Session ID',
      type: 'string',
    }),

    defineField({
      name: 'stripeCustomerId',
      title: 'Stripe Customer ID',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'clerkUserId',
      title: 'Store User ID',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'email',
      title: 'Customer Email',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'stripePaymentIntentId',
      title: 'Stripe Payment Intent ID',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'product',
              title: 'Product Bought',
              type: 'reference',
              to: [{ type: 'product' }], // Reference updated to product'
            }),
            defineField({
              name: 'quantity',
              title: 'Quantity Purchased',
              type: 'number',
              validation: Rule => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              title: 'product.name',
              quantity: 'quantity',
              image: 'product.image',
              price: 'product.price',
              currency: 'product.currency',
            },
            prepare(select) {
                return {
                  title: `${select.title} x ${select.quantity}`,   
                  subtitle: `${select.price * select.quantity}`, 
                  media: select.image,
                };
              }
          },
        }),
      ],
    }),

    defineField({
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),

    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'amountDiscount',
      title: 'Amount Discount',
      type: 'number',
      validation: Rule => Rule.min(0),
    }),

    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Paid', value: 'paid' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      description: 'The current status of the order',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'date',
      title: 'Order Date',
      type: 'datetime',
      description: 'Date and time the order was placed',
      validation: Rule => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'orderNumber',
      subtitle: 'customerName',
      date: 'date',
      status: 'status',
    },
    prepare({ title, subtitle, date, status }) {
      return {
        title: `Order #${title}`,
        subtitle: `${subtitle} - ${new Date(date).toLocaleDateString()} (${status})`,
      };
    },
  },
});
