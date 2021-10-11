import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../sanity/client';
import { ItemProps } from '../../../sanity/queries';

type Data = {
  success: boolean,
  data: any,
}

const queryItemObj = `{
  description,
  images[]{
    "imageUrl": asset->url,
  },
  itemId,
  pricing[]{
    price,
    priceId,
    currency,
  },
  title,
}`

const queryItemsFromItemIds = `
*[_type == "item" && itemId in $itemIds] ${queryItemObj}
`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { itemIds } = JSON.parse(req.body)
      // console.log("itemIds", itemIds);
      const sanityRes: ItemProps[] = await client.fetch(queryItemsFromItemIds, { itemIds })
      // console.log("sanityRes", sanityRes);
      return res.status(200).json({ success: true, data: JSON.stringify({ itemProps: sanityRes }) })
    } catch (err: any) {
      console.log("err", err.message);

      return res.status(500).json({ success: false, data: null })
    }
  } else {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, data: null })
  }
}